const express = require("express");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

const router = express.Router();

router.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

router.post("/api/stripe", requireLogin, async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 Survey Campaign Credits",
      source: req.body.id,
    });
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  } catch (error) {
    console.log("Error " + error);
  }
});

module.exports = router;
