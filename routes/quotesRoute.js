const express = require("express");
const {
  fetchQuotes,
  addQuote,
  fetchQuote,
  updateQuote,
  deleteQuote,
} = require("../controllers/quotesController");

const router = express.Router();

// router.get("/", (req, res) => {     //fetch quote(s)
//     res.status(200).json({
//         msg: "fetch quotes"
//     })
// })

// router.post("/", (req, res) => {        //add quote
//     res.status(200).json({
//         msg: "add quote"
//     })
// })

// RESTFUL API's
// router.route is used because api's have same url
// different methods chaining at the same same route
router.route("/").get(fetchQuotes).post(addQuote);

// api's with id as a parameter
router
  .route("/quote/:quoteId")
  .get(fetchQuote)
  .patch(updateQuote)
  .delete(deleteQuote);

module.exports = router;
