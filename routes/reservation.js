const express = require('express');
const router = express.Router();
const { db } = require("../firebase");

router.post("/crear-reservacion", async (req, res) => {
    const { userId, spaceId, ownerId, dateStart, dateEnd } = req.body;

    try {
        await db.collection("reservations").add({
            userId,
            spaceId,
            ownerId,
            dateStart: new Date(dateStart),
            dateEnd: new Date(dateEnd),
            status: "pending",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
        
    }
});

module.exports = router;