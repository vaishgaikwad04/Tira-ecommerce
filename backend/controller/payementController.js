import dotenv from 'dotenv';
dotenv.config(); 
import Stripe from "stripe";
const stripe = new Stripe(process.env.SECRET_KEY); // Securely access your Stripe secret key

export const payment = async (req, res) => {
  const cartItems = req.body; // Sent directly from frontend
  console.log("Cart Items:", cartItems);

  try {
    // Example: Create line items based on cartItems
    const line_items = cartItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "http://localhost:5173/success", // change in production
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ error: "Payment session failed" });
  }
};
