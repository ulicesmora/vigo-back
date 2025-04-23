// const express = require('express');
import express from 'express';
const router = express.Router();
// const { db } = require("../firebase");
import { db } from "../firebase.js";
import admin from "firebase-admin";

router.post("/crear-espacio", async (req, res) => {
    const { title, description, location, price, photos, ownerId, categories  } = req.body;

    try {
        const spaceRef = await db.collection("spaces").add({
            title,
            description,
            location,
            price,
            photos,
            ownerId,
            categories,
            ratingAvg: 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).send({ message: "Espacio creado", id: spaceRef.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;