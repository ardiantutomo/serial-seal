import { User } from "../dto/user.dto.js";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

/**
 * To Do:
 * - Update and delete queries
 */

export async function addUser(userId: number, email: string, password: string, role: string, name: string) {
    const user = await prisma.users.create({
        data: {
            UserID: Number(userId),
            Email: email,
            Password_Hash: password,
            Role: role,
            Name: name
        }
    });
    return user;
};

export async function findAllUsers() {
    const users = await prisma.users.findMany();
    return users;
};

export async function findUser(userId: number) {
    const user = await prisma.users.findFirst({
        where: {
            UserID: Number(userId)
        }
    });
    return user;
};

export async function updateUser(userId: number, email: string, password: string, role: string, name: string) {

};

export async function deleteUser(userId: number) {

};
