require("dotenv").config();

const express = require("express");
const app = express();
const { resolve } = require("path");

// Load Stripe Secret Key from .env
const STRIPE_SECRET_KEY = process.env.STRIP_SECRET;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
    console.log(items[0].amount);
    return items[0].amount;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

app.get('/greet', (req, res) => {
    res.send("It is working fine");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
