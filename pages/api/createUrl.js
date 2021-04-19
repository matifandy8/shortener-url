const generateUniqueId = require("generate-unique-id");
const faunadb = require("faunadb"),
  querydb = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNA_KEY,
});

export default async (req, res) => {
  const { url } = req.body;

  const id = generateUniqueId({
    length: 4,
    useLetters: true,
  });

  try {
    const info = await client.query(
      querydb.Create(querydb.Collection("urls"), {
        data: {
          ourl: url,
          shorturl: id,
        },
      })
    );

    res.status(200).send(id);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
