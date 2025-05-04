import express from 'express';
const router = express.Router();
import { actualizarReservacion, crearReservacion, eliminarReservacion, filtrarReservacionesPorEspacio, listarReservaciones, listarReservacionesPorId } from '../controllers/reservationsController.js';

router.post("/crear-reservacion", crearReservacion);
router.get("/listar-reservaciones", listarReservaciones);
router.get("/listar-reservaciones/:id", listarReservacionesPorId);
router.get("/filtrar-espacio", filtrarReservacionesPorEspacio);
router.patch("/actualizar-reservacion/:id", actualizarReservacion);
router.delete("/eliminar-reservacion/:reservaId", eliminarReservacion);

export default router;