import { Router } from "express";
import { createUser, getUsersByLastName } from "../controllers/userController";

const router = Router();

router.post('/users', createUser);
router.get('/users', getUsersByLastName);

export default router;
