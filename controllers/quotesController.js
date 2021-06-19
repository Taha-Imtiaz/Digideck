const { v4: uuid } = require("uuid");
const { readFile, writeFile } = require("../utility/common");

exports.fetchQuotes = async (req, res) => {
  try {
    //   fetch quotes fro file
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");
    console.log(quotes);
    res.status(200).json({
      status: "success",
      data: {
        quotes,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addQuote = async (req, res) => {
  try {
    //   take out data from body of request
    var { title, quote, author } = req.body;

    //    fetch file
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");

    // push new quote
    var newQuote = {
      id: uuid(), //generate random id
      title,
      quote,
      author,
    };
    quotes.push(newQuote);

    // write file with updated data
    await writeFile(`${__dirname}/../data/quotes.json`, quotes);
    // send back response
    res.status(200).json({
      status :"success",
      data:{
          quote: newQuote
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.fetchQuote = async (req, res) => {
  try {
    // fetch id from params
    var {quoteId} = req.params
    // console.log(quoteId)

    // read quotes from file
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");

    // find quote with given id
    var quote = quotes.find(({id}) => id === quoteId)
    // console.log(quote)

    // return in response that specific quote
    res.status(200).json({
      status: "success",
      data:{
        quote
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateQuote = async (req, res) => {
  try {
    // fetch quoteId and quote data from params and body respectively
    var {quoteId} = req.params

    // read quotes
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");

    // update that specific quote whose id is provided with given data
    var updatedQuotes =  quotes.map((quote) => {
      if(quote.id === quoteId) {
        return {
          ...quote,
          // req.body contains updated data
          ...req.body
        }
      }
      // else return quote
      return quote
    })
// console.log(updatedQuotes)

// write updated quotes arr in file
await writeFile(`${__dirname}/../data/quotes.json`, updatedQuotes);


    // return that updated quotes arr
    res.status(200).json({
      status: "success",
      data:{
        quotes: updatedQuotes
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteQuote = async (req, res) => {
  try {
    // fetch quoteId from params
    var {quoteId} = req.params
    var deletedQuote = null
    // read quotes
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");
    
    // delete that specific quote from arr
    var updatedQuotes =  quotes.filter(({id}) => id !== quoteId)
    // console.log(updatedQuotes)

    // write file with updated quotes
await writeFile(`${__dirname}/../data/quotes.json`, updatedQuotes);

    // save deletedQuote
deletedQuote = quotes.find(({id}) => id === quoteId)
    // return deleted quote
    res.status(200).json({
      status: "success",
      data:{
        quote: deletedQuote
      }
    });
  } catch (error) {
    console.log(error);
  }
};
