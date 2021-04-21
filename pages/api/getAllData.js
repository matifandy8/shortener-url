const faunadb = require("faunadb"),
  querydb = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNA_KEY,
});

export default async (req, res) => {
  if (req.method == "GET") {
    let query = await client.query(
      querydb.Map(
        querydb.Paginate(querydb.Documents(querydb.Collection("urls"))),
        querydb.Lambda((show) => querydb.Get(show))
      )
    );
    res.status(200).json({ data: query.data });
  }
};
