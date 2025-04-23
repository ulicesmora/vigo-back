const express = require('express');
const router = express.Router();
const { db } = require("../firebase");

router.post("/crear-espacio", async (req, res) => {
    const { userId, spaceId, rating, comment } = req.body;

    try {
        await db.collection("reviews").add({
            userId,
            spaceId,
            rating,
            comment,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).send({ message: "Reseña creada" });
    } catch (error) {
        res.status(500).send({ error: error.message });
        
    }
});

module.exports = router;