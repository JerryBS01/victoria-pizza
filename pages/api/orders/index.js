import dbConnect from '../../../library/mongo';
import Order from "../../../models/Order";
import Stripe from 'stripe';

export default async function handler(req, res) {
    const { method } = req;

    dbConnect();

    if (method === "GET") {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if (method === "POST") {
        try {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
                apiVersion: '2023-10-16',
            });

            const order = await Order.create(req.body);

            const { paymentMethodId, ...otherOrderDetails } = req.body;

            const paymentIntent = await stripe.paymentIntents.create({
                amount: order.total * 100,
                currency: 'aud',
                payment_method: paymentMethodId
            });

            order.paymentIntentId = paymentIntent.id;
            await order.save();

            res.status(201).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}