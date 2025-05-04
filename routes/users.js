import express from 'express';
const router = express.Router();
import { actualizarUsuario, crearUsuario, eliminarUsuario, listarUsuarios, listarUsuariosPorId } from '../controllers/userController.js';

router.post("/crear-usuario", crearUsuario);
router.get("/listar-usuarios", listarUsuarios);
router.get("/listar-usuarios/:id", listarUsuariosPorId);
router.patch("/actualizar-usuario/:id", actualizarUsuario);
router.delete("/eliminar-usuario/:uid", eliminarUsuario);

export default router;