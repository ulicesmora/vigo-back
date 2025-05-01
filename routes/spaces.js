// const express = require('express');
import express from 'express';
const router = express.Router();
// const { db } = require("../firebase");
import { db,admin } from "../firebase.js";
// import admin from "firebase-admin";

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

router.get("/listar-espacios", async (req, res) => {
    try {
        const snapshot = await db.collection("spaces").get();
        const spaces = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(spaces);
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
});

router.get("/listar-espacios/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const doc = await db.collection("spaces").doc(id).get();
        if(!doc.exists) {
            return res.status(401).send({ message: "Espacio no encontrado" });
        }
        
        res.status(200).send({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
});

router.patch("/actualizar-espacio/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, location, price, photos, categories } = req.body;

    try {
        await db.collection("spaces").doc(id).update({
            ...(title && { title }),
            ...(description && { description }),
            ...(location && { location }),
            ...(price && { price }),
            ...(photos && { photos }),
            ...(categories && { categories }),
        });

        res.status(200).send({ message: "Espacio actualizado" });
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
});

router.delete("/eliminar-espacio/:spaceId", async (req, res) => {
    const { spaceId } = req.params;

    try {
        await db.collection("spaces").doc(spaceId).delete();
        res.status(200).send({ message: "Espacio eliminado correctamente"});
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
});

export default router;