import { Request, Response } from "express";
import { Tenant } from "../generated/prisma/index.js";
import { dbAddTenant, dbDeleteTenant, dbFindManyTenants, dbFindOneTenant, dbUpdateTenant } from "../queries/tenants.js";

/**
 * @openapi
 * /api/tenants:
 *   post:
 *     tags:
 *       - tenant
 *     summary: Add a new tenant.
 *     description: Add a new tenant.
 *     requestBody:
 *       description: Create a new tenant
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tenant'
 *       required: true
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Invalid input
 *       default:
 *         description: Unexpected error
 */
export async function createTenant(request: Request<{}, {}, Tenant>, response: Response) {
    const [newTenant, errorCode, errorMessage] = await dbAddTenant(request.body);
    
    if (errorCode === 'P2002') {
        response.status(400).send(errorMessage);
    } else if (errorCode !== 'P2002' && errorMessage !== null) {
        response.status(500).send(errorMessage);
    } else {
        response.status(200).send(newTenant);
    }
}

/**
 * @openapi
 * /api/tenants:
 *   get:
 *     tags:
 *       - tenant
 *     summary: Finds all tenants.
 *     description: Returns all tenants.
 *     responses:
 *       200:
 *         description: Successful operation
 *       default:
 *         description: Unexpected error
 */
export async function getTenants(request: Request, response: Response) {
    const [tenants, errorCode, errorMessage] = await dbFindManyTenants();

    if (errorCode !== null || errorMessage !== null) {
        response.status(500).send(errorMessage);
    } else {
        response.status(200).send(tenants);
    }
}

/**
 * @openapi
 * /api/tenants/{tenantId}:
 *   get:
 *     tags:
 *       - tenant
 *     summary: Finds tenant by ID.
 *     description: Returns a single tenant.
 *     parameters:
 *       - name: tenantId
 *         in: path
 *         description: ID of tenant to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Tenant not found
 *       default:
 *         description: Unexpected error
 */
export async function getTenantById(request: Request<{id: number}>, response: Response) {
    const [tenant, errorCode, errorMessage] = await dbFindOneTenant(Number(request.params.id));

    if (errorCode !== null || errorMessage !== null) {
        response.status(500).send(errorMessage);
    } else if (tenant === null) {
        response.status(404).send('Tenant not found');
    } else {
        response.status(200).send(tenant);
    }
}

/**
 * @openapi
 * /api/tenants/{tenantId}:
 *   put:
 *     tags:
 *       - tenant
 *     summary: Update an existing tenant.
 *     description: Update an existing tenant by ID.
 *     parameters:
 *       - name: tenantId
 *         in: path
 *         description: ID of tenant to update
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: Update an existent tenant
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tenant'
 *       required: true
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Tenant not found
 *       default:
 *         description: Unexpected error
 */
export async function updateTenant(request: Request<{id: number}, {}, Tenant>, response: Response) {
    const [updateTenant, errorCode, errorMessage] = await dbUpdateTenant(request.params.id, request.body);

    if (errorCode === 'P2025') {
        response.status(404).send(errorMessage);
    } else if (errorCode === 'P2002') {
        response.status(400).send(errorMessage);
    } else if (errorCode !== 'P2025' && errorCode !== 'P2002' && errorMessage !== null) {
        response.status(500).send(errorMessage);
    } else {
        response.status(200).send(updateTenant);
    }    
}

/**
 * @openapi
 * /api/tenants/{tenantId}:
 *   delete:
 *     tags:
 *       - tenant
 *     summary: Deletes a tenant.
 *     description: Delete a tenant.
 *     parameters:
 *       - name: tenantId
 *         in: path
 *         description: Tenant ID to delete
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Tenant deleted
 *       400:
 *         description: Invalid tenant ID
 *       default:
 *         description: Unexpected error
 */
export async function deleteTenant(request: Request<{id: number}>, response: Response) {
    const [_, errorCode, errorMessage] = await dbDeleteTenant(Number(request.params.id));

    if (errorCode === 'P2025') {
        response.status(400).send(errorMessage);
    } else if (errorCode !== 'P2025' && errorMessage !== null) {
        response.status(500).send(errorMessage);
    } else {
        response.status(200).send('Tenant deleted');
    }
}