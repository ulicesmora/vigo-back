import express from 'express';
const router = express.Router();
import { actualizarEspacio, crearEspacio, eliminarEspacio, listarEspacios, listarEspaciosPorId } from '../controllers/spacesController.js';

router.post("/crear-espacio", crearEspacio);
router.get("/listar-espacios", listarEspacios);
router.get("/listar-espacios/:id", listarEspaciosPorId);
router.patch("/actualizar-espacio/:id", actualizarEspacio);
router.delete("/eliminar-espacio/:spaceId", eliminarEspacio);

export default router;