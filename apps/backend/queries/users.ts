import { Prisma, PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function dbAddUser(userId: number, email: string, password: string, role: string, name: string) {
    try {
        const user = await prisma.users.create({
            data: {
                UserID: userId,
                Email: email,
                Password_Hash: password,
                Role: role,
                Name: name
            }
        });
        return [user, null, null];
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return [null, error.code, error.message];
        } else {
            return [null, null, error.message];
        };
    };
};


export async function dbFindAllUsers() {
    try {
        const users = await prisma.users.findMany();
        return [users, null, null];
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return [null, error.code, error.message];
        } else {
            return [null, null, error.message];
        };
    };
};

export async function dbFindUser(userId: number) {
    try {
        const user = await prisma.users.findFirst({
            where: {
                UserID: userId
            }
        });
        return [user, null, null];
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return [null, error.code, error.message];
        } else {
            return [null, null, error.message];
        };
    };
};

export async function dbUpdateUser(userId: number, email: string, password: string, role: string, name: string) {
    try {
        const user = await prisma.users.update({
            where: {
                UserID: userId
            },
            data: {
                Email: email,
                Password_Hash: password,
                Role: role,
                Name: name
            }
        });
        return [user, null, null];
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return [null, error.code, error.message];
        } else {
            return [null, null, error.message];
        };
    };
};

export async function dbDeleteUser(userId: number) {
    try {
        const user = await prisma.users.delete({
            where: {
                UserID: userId
            }
        });
        return [user, null, null];
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return [null, error.code, error.message];
        } else {
            return [null, null, error.message];
        };
    };
};
