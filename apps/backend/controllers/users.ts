import { Request, Response } from "express";
import { addUser, findAllUsers, findUser } from "../queries/users.js";
import { User } from "../dto/user.dto.js";

/**
 * To Do:
 * - Update and delete user
 * - Error handling
 */

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - user
 *     summary: Add a new user.
 *     description: Add a new user.
 *     requestBody:
 *       description: Create a new user
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       required: true
 *     responses:
 *       200:
 *         description: Successful operation
 *       default:
 *         description: Unexpected error
 */
export async function createUser(request: Request<{}, {}, User>, response: Response) {
    const user = await addUser(Number(request.body.userId), request.body.email, request.body.passwordHash, request.body.role, request.body.name);
    response.send(user);
};

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - user
 *     summary: Finds all users.
 *     description: Returns all users.
 *     responses:
 *       200:
 *         description: Successful operation
 *       default:
 *         description: Unexpected error
 */
export async function getUsers(request: Request, response: Response) {
    const users = await findAllUsers();
    response.send(users);
};

/**
 * @openapi
 * /api/users/{userId}:
 *   get:
 *     tags:
 *       - user
 *     summary: Finds user by ID.
 *     description: Returns a single user.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of user to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 *       default:
 *         description: Unexpected error
 */
export async function getUserById(request: Request<{id: number}>, response: Response) {
    const user = await findUser(request.params.id);
    response.send(user);
};