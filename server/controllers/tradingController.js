const { request, gql } = require("graphql-request");
require("dotenv").config();
const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");

const endpoint = `${process.env.BASE_URL}${process.env.GRAPHQL_API_KEY}/subgraphs/id/${process.env.SUBGRAPH_ID}`;

exports.getTradingPairs = asyncErrorHandler(async (req, res, next) => {
  try {
    const tokensCount = req.query.tokens || 100;
    const tokenPairsCount = req.query.tokenPairs || 5;
    const query = gql`
      {
        tokens(first: ${tokensCount}) {
          id
          name
          symbol
          decimals
        }
        tokenPairs(first: ${tokenPairsCount}) {
          id
          name
          base {
            id
          }
          underlying {
            id
          }
        }
      }
    `;

    const data = await request(endpoint, query);

    res.json({
      success: true,
      tokens: data.tokens,
      tokenPairs: data.tokenPairs,
    });
  } catch (error) {
    console.error("Error fetching trading pairs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trading pairs.",
    });
  }
});
