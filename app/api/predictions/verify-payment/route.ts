
import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('order_id');
    if (!orderId) {
      return NextResponse.redirect(new URL('/predictions?error=missing_order', request.url));
    }

    const databaseUrl = process.env.DATABASE_URL!;
    const sql = neon(databaseUrl);
    // Check payment status
    const orderRows = await sql`
      SELECT status, user_id FROM payment_orders WHERE order_id = ${orderId}
    `;
    if (!orderRows.length || orderRows[0].status !== 'paid') {
      return NextResponse.redirect(new URL('/predictions?error=payment_not_verified', request.url));
    }

    // Grant access (already handled by webhook, but double-check)
    await sql`
      UPDATE users SET is_prediction_paid = true WHERE id = ${orderRows[0].user_id}
    `;

    return NextResponse.redirect(new URL('/predictions?success=paid', request.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/predictions?error=verify_failed', request.url));
  }
}