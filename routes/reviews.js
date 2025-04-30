// const express = require('express');
import express from 'express';
const router = express.Router();
// const { db } = require("../firebase");
import { db, admin } from "../firebase.js";
// import admin from "firebase-admin";

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

router.patch("/actualizar-review/:id", async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    try {
        await db.collection("reviews").doc(id).update({
            ...(rating && { rating }),
            ...(comment && { comment }),
        });

        res.status(200).send({ message: "Reseña actualizada" });
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
});

router.delete("/eliminar-review/:reviewId", async (req, res) => {
    const { reviewId } = req.params;

    try {
        await db.collection("reviews").doc(reviewId).delete();
        res.status(200).send({ message: "Reseña eliminada correctamente"});
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
});

export default router;