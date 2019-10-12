const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const axios = require("axios");

// Transaction and User Model
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");

// @route   GET api/transactions
// @desc    Auth user's transactions
// @access  Private
router.get("/", (req, res) => {
  const userId = req.query.userId;
  Transaction.aggregate(
    [{ $match: { userId } }, { $sort: { transaction_date: -1 } }],
    function(err, result) {
      if (err)
        return res
          .status(500)
          .json({ msg: "Error: Failed to retrieve transaction." });

      res.json({ result });
    }
  );
});

// @route   GET api/transactions/portfolio
// @desc    Auth user's transactions
// @access  Private
router.get("/portfolio", (req, res) => {
  const userId = req.query.userId;
  User.findById(userId, async function(err, user) {
    if (err) return res.status(400).json({ msg: "Could not find user" });

    let results = await Promise.all(
      user.tickers.map(async ticker => {
        result = await axios(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${
            ticker.name
          }&interval=1min&apikey=${config.get("alphavantageApi")}`
        );
        const key = Object.keys(result.data["Time Series (1min)"])[0];
        const openPrice = result.data["Time Series (1min)"][key]["1. open"];
        const price = parseInt(
          result.data["Time Series (1min)"][key]["4. close"]
        ).toFixed(2);
        let colorStyle = "grey";
        if (price > openPrice) {
          colorStyle = "green";
        } else if (price < openPrice) {
          colorStyle = "red";
        }

        return { ticker: ticker.name, qty: ticker.qty, price, colorStyle };
      })
    );
    res.json({ results });
  });
});

// @route   POST api/transactions
// @desc    Auth user's transaction
// @access  Private
router.post("/purchase", (req, res) => {
  const { ticker, userId, qty } = req.body;

  axios(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=${config.get(
      "alphavantageApi"
    )}`
  ).then(result => {
    if ("Error Message" in result.data)
      return res.status(400).json({ msg: "Invalid Ticker" });

    User.findById(userId, function(err, user) {
      if (err) return res.status(400).json({ msg: "Could not find user" });

      const cash = user.cash;
      const key = Object.keys(result.data["Time Series (1min)"])[0];
      const price = result.data["Time Series (1min)"][key]["4. close"];

      if (price * qty > cash)
        return res.statu(400).json({ msg: "Insufficient Funds." });

      const newTransaction = new Transaction({
        ticker,
        userId,
        qty,
        price
      });

      newTransaction.save({}, (err, product) => {
        if (err) return res.status(400).json({ msg: "Transaction failed." });
        user.cash = (cash - price * qty).toFixed(2);
        let isTicker = user.tickers.find(
          ({ name }) => name === ticker.toUpperCase()
        );
        if (isTicker) {
          isTicker.qty += qty;
        } else {
          user.tickers.push({ name: ticker, qty: qty });
        }
        user.save();
        res.json({ msg: "Successfully made transaction" });
      });
    });
  });
});

module.exports = router;
