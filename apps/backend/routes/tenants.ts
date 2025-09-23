import { Router } from "express";
import { createTenant, deleteTenant, getTenantById, getTenants, updateTenant } from "../controllers/tenants.js";

const router = Router();

router.post('/', createTenant);
router.get('/', getTenants);
router.get('/:id', getTenantById);
router.put('/:id', updateTenant);
router.delete('/:id', deleteTenant);

export default router;