import express from 'express';
import { actualizarReview, crearReview, eliminarReview, listarReviews, listarReviewsPorId } from '../controllers/reviewsController.js';
const router = express.Router();

router.post("/crear-review", crearReview);
router.get("/listar-reviews", listarReviews);
router.get("/listar-reviews/:id", listarReviewsPorId);
router.patch("/actualizar-review/:id", actualizarReview);
router.delete("/eliminar-review/:reviewId", eliminarReview);

export default router;