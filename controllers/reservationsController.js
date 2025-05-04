import { db, admin } from "../firebase.js";

const checkReservation = async (spaceId, dateStart, dateEnd, excludeId = null) => {
    const snapshot = await db.collection("reservations")
        .where("spaceId", "==", spaceId)
        .where("dateEnd", ">=", new Date(dateStart))
        .where("dateStart", "<=", new Date(dateEnd))
        .get();

    const conflicts = snapshot.docs.filter(doc => doc.id !== excludeId);
    return conflicts.length > 0;
};

export const crearReservacion = async (req, res) => {
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

        if (await checkReservation(spaceId, dateStart, dateEnd)) {
            return res.status(400).send({ error: "Ya existe una reservación para este espacio en ese horario" });
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
};

export const listarReservaciones = async (req, res) => {
    try {
        const snapshot = await db.collection("reservations").get();
        const reservations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(reservations);
    } catch (error) {
        res.status(500).send({ error: error.message });       
    }
};

export const listarReservacionesPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const doc = await db.collection("reservations").doc(id).get();
        
        if(!doc.exists) {
            return res.status(404).send({ message: "Reservación no encontrada" });
        }

        res.status(200).send({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
};

export const filtrarReservacionesPorEspacio = async (req, res) => {
    const { userId, spaceId } = req.query;

    try {
        let query = db.collection("reservations");

        if(userId) {
            query = query.where("userId", "==", userId);
        }

        if(spaceId) {
            query = query.where("spaceId", "==", spaceId);
        }

        const snapshot = await query.get();

        if(snapshot.empty) {
            return res.status(404).send({ message: "No se encontraron reservaciones para este espacio" });
        }

        const reservations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(reservations);
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
};

export const actualizarReservacion = async (req, res) => {
    const { id } = req.params;
    const { spaceId, ownerId, dateStart, dateEnd } = req.body;

    try {
         //Verificar su ya existe una reservación en ese horario
         const reservasExistentes = await db.collection("reservations")
         .where("spaceId", "==", spaceId)
         .where("dateStart", "==", new Date(dateStart))
         .where("dateEnd", "==", new Date(dateEnd))
         .get();

        if (!reservasExistentes.empty) {
            return res.status(400).send({ error: "Ya existe una reservación en ese horario"});
        }

        // if (await checkReservation(spaceId, dateStart, dateEnd)) {
        //     return res.status(400).send({ error: "Ya existe una reservación para este espacio en ese horario" });
        // }

        await db.collection("reservations").doc(id).update({
            ...(spaceId && { spaceId }),
            ...(ownerId && { ownerId }),
            ...(dateStart && { dateStart: new Date(dateStart) }),
            ...(dateEnd && { dateEnd: new Date(dateEnd) }),
        });

        res.status(200).send({ message: "Reservación actualizada correctamente" });
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
};

export const eliminarReservacion = async (req, res) => {
    const { reservaId } = req.params;

    try {
        await db.collection("reservations").doc(reservaId).delete();
        res.status(200).send({ message: "Reservación eliminada correctamente"});
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
};