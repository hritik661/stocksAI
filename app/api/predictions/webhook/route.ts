
import { NextResponse } from "next/server"
import nodemailer from 'nodemailer'
import { neon } from "@neondatabase/serverless"

export async function POST(request: Request) {
  try {
    // Instamojo webhook sends form data
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // Instamojo webhook payload
    const { payment_id, status, payment_request_id, buyer_email, amount } = data;

    console.log('[WEBHOOK] Instamojo webhook received:', { payment_id, status, payment_request_id, buyer_email, amount });

    if (status !== 'Credit') {
      return NextResponse.json({ status: 'ignored', message: 'Payment not completed.' });
    }

    // Update payment status in database
    const databaseUrl = process.env.DATABASE_URL!;
    const sql = neon(databaseUrl);
    // Find user by payment_request_id (which is our order_id)
    const orderRows = await sql`
      SELECT user_id FROM payment_orders WHERE order_id = ${payment_request_id}
    `;
    if (!orderRows.length) {
      return NextResponse.json({ status: 'error', message: 'Order not found.' });
    }
    const userId = orderRows[0].user_id;
    // Update user access
    await sql`
      UPDATE users SET is_prediction_paid = true WHERE id = ${userId}
    `;
    await sql`
      UPDATE payment_orders SET status = 'paid', payment_id = ${payment_id} WHERE order_id = ${payment_request_id}
    `;

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: `${process.env.GMAIL_FROM_NAME} <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: 'Prediction Payment Received',
      text: `Payment received for predictions.\nPayment Request ID: ${payment_request_id}\nPayment ID: ${payment_id}\nUser ID: ${userId}\nAmount: ${amount}`,
    });

    return NextResponse.json({ status: 'success', message: 'Payment processed and access granted.' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error && typeof error === 'object' && 'message' in error ? error.message : 'Webhook error.' });
  }
}