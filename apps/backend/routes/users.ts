import { Router } from "express";
import { createUser, getUserById, getUsers } from "../controllers/users.js";

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);

export default router;