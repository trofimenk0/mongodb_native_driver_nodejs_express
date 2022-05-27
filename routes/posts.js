const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const dbClient = require('../database');

router.get('/', async (req, res) => {
    try {
        await dbClient.connect();

        const collection = getCollection(dbClient);
        const cursor = await collection.find();

        res.json(await cursor.toArray());
    } catch (err) {
        res.status(500);
        throw new Error({ error: err });
    } finally {
        await dbClient.close();
    }
});

router.get('/:postId', async (req, res) => {
    try {
        await dbClient.connect();

        const collection = getCollection(dbClient);
        const result = await collection.findOne({ _id: ObjectId(req.params.postId) });

        res.json(result);
    } catch (err) {
        res.status(500);
        throw new Error({ error: err });
    } finally {
        await dbClient.close();
    }
});

router.post('/', async (req, res) => {
    try {
        await dbClient.connect();

        const collection = getCollection(dbClient);
        const doc = {
            title: req.body.title,
            description: req.body.description,
        };

        const result = await collection.insertOne(doc);

        res.json(result);
    } catch (err) {
        res.status(500);
        throw new Error({ error: err });
    } finally {
        await dbClient.close();
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        await dbClient.connect();

        const collection = getCollection(dbClient);
        const result = await collection.deleteOne({ _id: ObjectId(req.params.postId) });

        res.json(result);
    } catch (err) {
        res.status(500);
        throw new Error({ error: err });
    } finally {
        await dbClient.close();
    }
});

router.put('/:postId', async (req, res) => {
    try {
        await dbClient.connect();

        const collection = getCollection(dbClient);
        const filter = { _id: ObjectId(req.params.postId) };
        const options = { upsert: false };
        const updateDoc = {
            $set: {
                title: `Updated document title with the number: ${Math.random()}`,
            },
        };

        const result = await collection.updateOne(filter, updateDoc, options);

        res.json(result);
    } catch (err) {
        res.status(500);
        throw new Error({ error: err });
    } finally {
        await dbClient.close();
    }
});

function getCollection(dbClient) {
    const database = dbClient.db('rest_api_test');

    return database.collection('posts');
}

module.exports = router;