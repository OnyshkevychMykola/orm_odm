import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectPrisma = () => prisma.$use(async (params, next) => {
    if (params.model === 'Quest' && params.action === 'update') {
        const questBeforeUpdate = await prisma.quest.findUnique({
            where: params.args.where,
        });
        console.log(`Квест оновлено: ${questBeforeUpdate?.title}`);
    }
    return next(params);
});

