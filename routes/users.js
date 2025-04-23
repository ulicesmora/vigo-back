const express = require('express');
const router = express.Router();
const { db } = require("../firebase");

router.post("/crear-usuario", async (req, res) => {
    const  { uid, name, email, role, photoURL } = req.body;

    try {
        await db.collection("users").doc(uid).set({
            name,
            email,
            role,
            photoURL: photoURL || "",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).send({ message: "Usuario creado" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;