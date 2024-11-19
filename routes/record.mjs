import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Controller: 
// Get all records
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("records");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// get record by Id
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found!").status(404);
    else res.send(result).status(200);
  } catch (error) {
    res.send({ error: "Internal error" }).status(500);
  }
});

// create new records
router.post("/", async (req, res) => {
  try {
    // Creating new record by taking input from client
    let newRecord = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };

    // going to collection from database where to enter new record
    let collection = await db.collection("records");
    let result = await collection.insertOne(newRecord);
    res.send(result).status(201);
  } catch (error) {
    res.send({ error: "Internal error" }).status(500);
  }
});

// to delete

router.delete("/:id", async (req, res) => {
  try {
    const collection = await db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };

    let result = await collection.deleteOne(query);
    res.send(result).status(204);
  } catch (error) {
    res.send({ error: "Internal error" }).status(500);
  }
});

// Update
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  // $set is mongodb method to update the records
  const updates = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  let collection = db.collection("records");
  let results = await collection.updateOne(query, updates);
  res.send(results).status(200);
});
export default router;
