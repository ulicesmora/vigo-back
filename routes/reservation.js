// const express = require('express');
import express from 'express';
const router = express.Router();
// const { db } = require("../firebase");
import { db, admin } from "../firebase.js";

router.post("/crear-reservacion", async (req, res) => {
    const { userId, spaceId, ownerId, dateStart, dateEnd } = req.body;

    if(!spaceId || !dateStart || !dateEnd ) return res.status(400).send({ error: "Todos los campos son obligatorios" });

    try {
        //Verificar su ya existe una reservación en ese horario
        const reservasExistentes = await db.collection("reservations")
            .where("spaceId", "==", spaceId)
            .where("dateStart", "==", new Date(dateStart))
            .where("dateEnd", "==", new Date(dateEnd))
            .get();
        // console.log("Reservas existentes:", reservasExistentes);

        if (!reservasExistentes.empty) {
            return res.status(400).send({ error: "Ya existe una reservación en ese horario"});
        }

        //Crear la reservación
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

router.delete("/eliminar-reservacion/:reservaId", async (req, res) => {
    const { reservaId } = req.params;

    try {
        await db.collection("reservations").doc(reservaId).delete();
        res.status(200).send({ message: "Reservación eliminada correctamente"});
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
});

export default router;