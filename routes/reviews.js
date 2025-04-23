// const express = require('express');
import express from 'express';
const router = express.Router();
// const { db } = require("../firebase");
import { db } from "../firebase.js";
import admin from "firebase-admin";

router.post("/crear-review", async (req, res) => {
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

export default router;