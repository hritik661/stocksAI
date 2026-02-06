import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('order_id');
    const origin = process.env.NEXT_PUBLIC_APP_ORIGIN || 'https://hritik.vercel.app';
    
    if (!orderId) {
      console.log('✅ [VERIFY-PAYMENT] Missing order_id, redirecting to top-gainers');
      return NextResponse.redirect(`${origin}/top-gainers?error=missing_order&t=${Date.now()}`);
    }

    const databaseUrl = process.env.DATABASE_URL!;
    const sql = neon(databaseUrl);
    // Check payment status
    const orderRows = await sql`
      SELECT status, user_id FROM payment_orders WHERE order_id = ${orderId}
    `;
    
    if (!orderRows.length) {
      console.log('⚠️ [VERIFY-PAYMENT] Order not found:', orderId);
      return NextResponse.redirect(`${origin}/top-gainers?error=order_not_found&t=${Date.now()}`);
    }
    
    if (orderRows[0].status !== 'paid') {
      console.log('⚠️ [VERIFY-PAYMENT] Payment not verified for order:', orderId, 'Status:', orderRows[0].status);
      return NextResponse.redirect(`${origin}/top-gainers?error=payment_not_verified&t=${Date.now()}`);
    }

    // Grant access (already handled by webhook, but double-check)
    const userId = orderRows[0].user_id;
    await sql`
      UPDATE users SET is_top_gainer_paid = true WHERE id = ${userId}
    `;
    
    console.log('✅ [VERIFY-PAYMENT] Payment verified for user:', userId, 'Order:', orderId);
    return NextResponse.redirect(`${origin}/top-gainers?success=paid&t=${Date.now()}`);
  } catch (error) {
    console.error('❌ [VERIFY-PAYMENT] Error:', error);
    const origin = process.env.NEXT_PUBLIC_APP_ORIGIN || 'https://hritik.vercel.app';
    return NextResponse.redirect(`${origin}/top-gainers?error=verify_failed&t=${Date.now()}`);
  }
}
