const express = require('express');
const router = express.Router();
const { db } = require("../firebase");

router.post("/crear-espacio", async (req, res) => {
    const { title, description, location, price, photos, ownerId, categories  } = req.body;
    
    try {
        const spaceRef = await db.colletion("spaces").add({
            title,
            description,
            location,
            price,
            photos,
            ownerId,
            categories,
            ratingAvg: 0,
            createdAt: admin.firestore.FiedValue.serverTimestamp(),
        });

        res.status(201).send({ message: "Espacio creado", id: spaceRef.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;