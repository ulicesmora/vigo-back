// const express = require('express');
import express from 'express';
const router = express.Router();
// const { db } = require("../firebase");
import { db, admin } from "../firebase.js";
// import admin from "firebase-admin";

router.post("/crear-usuario", async (req, res) => {
    console.log("BODY:", req.body); // 👈 esto
    const  { name, email, password, role, photoURL } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name,
            photoURL: photoURL || "",
        });

        await db.collection("users").doc(userRecord.uid).set({
            name,
            email,
            role,
            photoURL: photoURL || "",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).send({ uid: userRecord.uid, message: "Usuario creado" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete("/eliminar-usuario/:uid", async (req, res) => {
    const { uid } = req.params;

    try {
        await db.collection("users").doc(uid).delete();
        res.status(200).send({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).send({ error: error.message});
    }
});

export default router;