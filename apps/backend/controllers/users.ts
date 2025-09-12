import { Request, Response } from "express";
import { dbAddUser, dbDeleteUser, dbFindAllUsers, dbFindUser, dbUpdateUser } from "../queries/users.js";
import { User } from "../dto/user.dto.js";

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
 *       400:
 *         description: Invalid input
 *       default:
 *         description: Unexpected error
 */
export async function createUser(request: Request<{}, {}, User>, response: Response) {
    
    const [newUser, errorCode, errorMessage] = await dbAddUser(
        Number(request.body.userId), 
        request.body.email, 
        request.body.passwordHash, 
        request.body.role, 
        request.body.name
    );
    
    if (errorCode === 'P2002') {
        response.status(400).send(errorMessage);
    } else if (errorCode !== 'P2002' && errorMessage !== null) {
        response.status(500).send(errorMessage);
    } else {
        response.status(200).send(newUser);
    };
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
    
    const [users, errorCode, errorMessage] = await dbFindAllUsers();

    if (errorCode !== null || errorMessage !== null) {
        response.status(500).send(errorMessage);
    } else {
        response.status(200).send(users);
    };
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
    
    const [user, errorCode, errorMessage] = await dbFindUser(Number(request.params.id));

    if (errorCode !== null || errorMessage !== null) {
        response.status(500).send(errorMessage);
    } else if (user === null) {
        response.status(404).send('User not found');
    } else {
        response.status(200).send(user);
    }
};

/**
 * @openapi
 * /api/users/{userId}:
 *   put:
 *     tags:
 *       - user
 *     summary: Update an existing user.
 *     description: Update an existing user by ID.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of user to update
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: Update an existent user
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       required: true
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 *       default:
 *         description: Unexpected error
 */
export async function updateUser(request: Request<{id: number}, {}, User>, response: Response) {
    
    const [updatedUser, errorCode, errorMessage] = await dbUpdateUser(
        Number(request.params.id), 
        request.body.email, 
        request.body.passwordHash, 
        request.body.role, 
        request.body.name
    );

    if (errorCode === 'P2025') {
        response.status(404).send(errorMessage);
    } else if (errorCode === 'P2002') {
        response.status(400).send(errorMessage);
    } else if (errorCode !== 'P2025' && errorCode !== 'P2002' && errorMessage !== null) {
        response.status(500).send(errorMessage);
    } else {
        response.status(200).send(updatedUser);
    };
};

/**
 * @openapi
 * /api/users/{userId}:
 *   delete:
 *     tags:
 *       - user
 *     summary: Deletes a user.
 *     description: Delete a user.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User ID to delete
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: User deleted
 *       400:
 *         description: Invalid user ID
 *       default:
 *         description: Unexpected error
 */
export async function deleteUser(request: Request<{id: number}>, response: Response){

    const [_, errorCode, errorMessage] = await dbDeleteUser(Number(request.params.id));

    if (errorCode === 'P2025') {
        response.status(400).send(errorMessage);
    } else if (errorCode !== 'P2025' && errorMessage !== null) {
        response.status(500).send(errorMessage);
    } else {
        response.status(200).send('User deleted');
    }
};