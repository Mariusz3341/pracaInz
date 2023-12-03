import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sql from "msnodesqlv8";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
// const connectionString =
//   "Server=DESKTOP-FFFG2KQ\\SQLEXPRESS; Database=krzyzowkitest; Trusted_Connection=Yes;Driver=SQL Server;";

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const uri =
  "mongodb+srv://mariusz08bauer:6g6tvIpZblIfjEIy@cluster0.weh33rg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
let db, wordsColl, crosswordsColl;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db("crosswords");
    wordsColl = db.collection("words");
    crosswordsColl = db.collection("crosswords");
    console.log("[" + getDate() + "] [Connected to database]");
  } catch {
    console.log(console.error);
  }
}

async function saveCrossword(words) {
  console.log("[" + getDate() + "] [Save crossword]");
  let wordsToCross = [];
  let crossword = {};
  try {
    for (let word of words) {
      await saveWord(word);
      let wordId = await getWordIdByDefinition(word.definition);
      let wordsObj = {
        wordId: wordId,
        direction: word.direction,
        cordinates: word.cordinates,
      };
      wordsToCross.push(wordsObj);
    }
    crossword["words"] = wordsToCross;
    await crosswordsColl.insertOne(crossword);
    console.log("[" + getDate() + "] [Crossword added]");
  } catch {
    console.log(console.error);
  }
}

async function getWordIdByDefinition(wordDefinition) {
  console.log("[" + getDate() + "] [Get word by id definition]");
  try {
    let document = await wordsColl.findOne({ definition: wordDefinition });
    if (document) {
      const wordId = document._id;
      return wordId;
    }
    return null;
  } catch {
    console.log(console.error);
  }
}

async function saveWord(word) {
  console.log("[" + getDate() + "] [Save word]");
  try {
    let id = await getWordIdByDefinition(word.definition);
    if (!id) {
      await wordsColl.insertOne({
        definition: word.definition,
        word: word.word,
      });
      console.log("[" + getDate() + "] [Word added] - " + word.definition);
    } else {
      console.log("[Word " + word.definition + " already exists]");
    }
  } catch {
    console.log(console.error);
  }
}

async function updateCrossword(id, words) {
  console.log("[" + getDate() + "] [Update crossword]");
  let wordId;
  let wordsToCrossword = [];
  const objectId = new ObjectId(id);
  try {
    for (let word of words) {
      wordId = await getWordIdByDefinition(word.definition);
      if (!wordId) {
        await saveWord({ definition: word.definition, word: word.word });
        wordId = await getWordIdByDefinition(word.definition);
      }
      wordsToCrossword.push({
        wordId: wordId,
        direction: word.direction,
        cordinates: word.cordinates,
      });
    }
    await crosswordsColl.updateOne(
      { _id: objectId },
      { $set: { words: wordsToCrossword } }
    );
    console.log("[" + getDate() + "] [Crossword updated]");
  } catch {
    console.log(console.error);
  }
}

async function getCrosswords() {
  console.log("[" + getDate() + "] [Get crosswords]");
  try {
    const crosswords = await crosswordsColl.find().toArray();
    return crosswords;
  } catch {
    console.log(console.error);
  }
}

async function getCrosswordById(id) {
  console.log("[" + getDate() + "] [Get crossword by id]");
  try {
    const objectId = new ObjectId(id);
    const crossword = await crosswordsColl.findOne({ _id: objectId });
    return crossword;
  } catch {
    console.log(console.error);
  }
}

async function getWordById(id) {
  console.log("[" + getDate() + "] [Get word by id]");
  try {
    const objectId = new ObjectId(id);
    const word = await wordsColl.findOne({ _id: objectId });
    return word;
  } catch {
    console.log(console.error);
  }
}

async function getWordsByCrosswordId(id) {
  console.log("[" + getDate() + "] [Get words by crossword id]");
  try {
    const words = [];
    const objectId = new ObjectId(id);
    const crossword = await crosswordsColl.findOne({ _id: objectId });
    for (let wordObj of crossword.words) {
      let wordId = wordObj.wordId;
      let word = await getWordById(wordId);
      words.push(word);
    }
    return words;
  } catch {
    console.log(console.error);
  }
}

async function deleteCrosswordById(id) {
  console.log("[" + getDate() + "] [Delete crossword by id]");
  try {
    const objectId = new ObjectId(id);
    const crossword = await crosswordsColl.deleteOne({ _id: objectId });
    return crossword;
  } catch {
    console.log(console.error);
  }
}

async function getDefinitionByWord(wordx) {
  console.log("[" + getDate() + "] [Get definition by word]");
  let response = null;
  try {
    response = await wordsColl.findOne({ word: wordx });
    if (response !== null) {
      return response.definition;
    }
    return response;
  } catch {
    console.log(console.error);
  }
}

function getDate() {
  const currentDate = new Date();
  return currentDate.toLocaleString();
}

app.get("/", (req, res) => {
  res.send("Server with crosswords");
});

app.get("/words/id/:id", async (req, res) => {
  console.log(
    "[" + getDate() + `] [GET] http://localhost:7777/words/id/${req.params.id}`
  );
  const word = await getWordById(req.params.id);
  res.send(word);
});

app.get("/words/word/:word", async (req, res) => {
  console.log(
    "[" +
      getDate() +
      `] [GET] http://localhost:7777/words/word/${req.params.word}`
  );

  const word = await getDefinitionByWord(req.params.word);
  res.send(word);
});

app.get("/crosswords", async (req, res) => {
  console.log("[" + getDate() + "] [GET] http://localhost:7777/crosswords");
  const crosswords = await getCrosswords();
  res.send(crosswords);
});

app.get("/crosswords/id/:id", async (req, res) => {
  console.log(
    "[" +
      getDate() +
      `] [GET] http://localhost:7777/crosswords/id/${req.params.id}`
  );
  const crossword = await getCrosswordById(req.params.id);
  res.send(crossword);
});

app.get("/crosswords/:id/words", async (req, res) => {
  console.log(
    "[" +
      getDate() +
      `] [GET] http://localhost:7777/crosswords/${req.params.id}/words`
  );
  const crossword = await getWordsByCrosswordId(req.params.id);
  res.send(crossword);
});

app.post("/crosswords", async (req, res) => {
  console.log("[" + getDate() + "] [POST] http://localhost:7777/crosswords");
  await saveCrossword(req.body);
  res.send("asd");
});

app.delete("/crosswords/id/:id", async (req, res) => {
  console.log(
    "[" +
      getDate() +
      `] [DELETE] http://localhost:7777/crosswords/${req.params.id}`
  );
  const crossword = await deleteCrosswordById(req.params.id);
  res.send(crossword);
});

app.patch("/crosswords/id/:id", async (req, res) => {
  console.log(
    "[" +
      getDate() +
      `] [PATCH] http://localhost:7777/crosswords/id/${req.params.id}`
  );
  await updateCrossword(req.params.id, req.body);
  res.send("asd");
});

app.listen(7777, () =>
  console.log("[" + getDate() + "] Server address http://localhost:7777")
);
connectToDB();
