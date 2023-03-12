const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Simple Node Server running");
});
// middleware
app.use(cors());
app.use(express.json());
const users = [
  { id: 1, name: "Bob", email: "bob@example.com" },
  { id: 1, name: "Tob", email: "bob@example.com" },
  { id: 1, name: "Mob", email: "bob@example.com" },
];

//dbUserName:  abdulazizfrince5  dbPassword: cdvGJDcAefgaUhVo

const uri =
  "mongodb+srv://abdulazizfrince5:cdvGJDcAefgaUhVo@cluster0.u9s0t68.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("simpleNode").collection("users");
    // const user = { name: "Abdullah", email: "abdullah@gmail.com" };
    // const results = await userCollection.insertOne(user);
    // console.log(results);

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      // users.push(user);
      const result = await userCollection.insertOne(user);
      console.log(result);
      user._id = result.insertedId;
      res.send(user);
    });
  } finally {
  }
}

run().catch((err) => console.error(err));

// app.get("/users", (req, res) => {
//   if (req.query.name) {
//     const search = req.query.name;
//     const filteredUsers = users.filter(
//       (usr) => usr.name.toLowerCase().indexOf(search) >= 0
//     );
//     res.send(filteredUsers);
//   } else {
//     res.send(users);
//   }
// });

// app.post("/users", (req, res) => {
//   console.log("post api called");
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   console.log(user);
//   res.send(user);
// });
app.listen(port, () => {
  console.log(`simple node server listening on port ${port}`);
});
