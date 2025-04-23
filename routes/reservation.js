// const express = require('express');
import express from 'express';
const router = express.Router();
// const { db } = require("../firebase");
import { db } from "../firebase.js";
import admin from "firebase-admin";

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

        res.status(201).send({ message: "Reservación creada correctamente" });
    } catch (error) {
        res.status(500).send({ error: error.message });
        
    }
});

export default router;