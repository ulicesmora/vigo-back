import { db, admin } from "../firebase.js";

export const crearReview = async (req, res) => {
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
};

export const listarReviews = async (req, res) => {
    try {
        const snapshot = await db.collection("reviews").get();
        const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
};

export const listarReviewsPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const doc = await db.collection("reviews").doc(id).get();
        if(!doc.exists) {
            return res.status(404).send({ message: "Reseña no encontrada" });
        }

        res.status(200).send({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
};

export const actualizarReview = async (req, res) => {
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
};

export const eliminarReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        await db.collection("reviews").doc(reviewId).delete();
        res.status(200).send({ message: "Reseña eliminada correctamente"});
    } catch (error) {
        res.status(500).send({ error: error.message });        
    }
};