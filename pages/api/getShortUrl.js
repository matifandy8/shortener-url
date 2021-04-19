const faunadb = require("faunadb"),
  querydb = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNA_KEY,
});

export default async (req, res) => {
  try {
    const ourl = await client.query(
      querydb.Map(
        querydb.Paginate(
          querydb.Match(querydb.Index("get_short_url"), req.body.url)
        ),
        querydb.Lambda("X", querydb.Get(querydb.Var("X")))
      )
    );

    res.send(ourl.data[0].data.ourl);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
