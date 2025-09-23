import { Prisma, PrismaClient, Tenant } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function dbAddTenant(tenant: Tenant) {
    try {
        const tenantToBeAdded = await prisma.tenant.create({
            data: {
                name: tenant.name,
                plan: tenant.plan,
                created_at: tenant.created_at
            }
        });
        return [tenantToBeAdded, null, null];
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return [null, error.code, error.message];
        } else {
            return [null, null, error.message];
        };
    };
}

export async function dbFindManyTenants() {
    try {
        const tenants = await prisma.tenant.findMany();
        return [tenants, null, null];
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return [null, error.code, error.message];
        } else {
            return [null, null, error.message];
        };
    };
}

export async function dbFindOneTenant(tenantId: number) {
    try {
        const tenant = await prisma.tenant.findFirst({
            where: {
                id: tenantId
            }
        });
        return [tenant, null, null];
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return [null, error.code, error.message];
        } else {
            return [null, null, error.message];
        };
    };
}

export async function dbUpdateTenant(tenantId: number, tenant: Tenant) {
    try {
        const tenantToBeUpdated = await prisma.tenant.update({
            where: {
                id: tenantId
            },
            data: {
                name: tenant.name,
                plan: tenant.plan,
                created_at: tenant.created_at
            }
        });
        return [tenantToBeUpdated, null, null];
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return [null, error.code, error.message];
        } else {
            return [null, null, error.message];
        };
    };
}

export async function dbDeleteTenant(tenantId: number) {
    try {
        const tenant = await prisma.tenant.delete({
            where: {
                id: tenantId
            }
        });
        return [tenant, null, null];
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return [null, error.code, error.message];
        } else {
            return [null, null, error.message];
        };
    };
}