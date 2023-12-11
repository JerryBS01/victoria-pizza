import { stripe } from "../../library/stripe";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cartTotal, orderId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: 'Your Total',
            },
            unit_amount: cartTotal * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/cart`,
    });

    res.status(200).json({ id: session.id });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}