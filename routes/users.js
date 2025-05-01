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

router.get("/listar-usuarios", async (req, res) => {
    try {
        const snapshot = await db.collection("users").get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
});

router.get("/listar-usuarios/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const doc = await db.collection("users").doc(id).get();
        if(!doc.exists) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        res.status(200).send({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
});

router.patch("/actualizar-usuario/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, photoURL } = req.body;

    try {
        await db.collection("users").doc(id).update({
            ...(name && { name }),
            ...(email && { email }),
            ...(password && { password }),
            ...(role && { role }),
            ...(photoURL && { photoURL }),
        });

        res.status(200).send({ message: "Usuario actualizado" });
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