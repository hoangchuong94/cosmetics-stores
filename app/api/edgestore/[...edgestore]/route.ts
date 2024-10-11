import { initEdgeStore } from '@edgestore/server';
import {
    createEdgeStoreNextHandler,
    CreateContextOptions,
} from '@edgestore/server/adapters/next/app';
import z from 'zod';
import { auth } from '@/auth';

type Context = {
    userId: string;
    userRole: 'ADMIN' | 'USER';
};

const getUser = async () => {
    const session = await auth();
    if (session?.user) {
        return session.user;
    }
    return null;
};

const createContext = async () => {
    const user = await getUser();
    return {
        userId: user?.id,
        userRole: user?.role,
    };
};

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
    publicImages: es
        .imageBucket({
            maxSize: 10 * 1024,
            accept: ['image/jpeg', 'image/png'],
        })
        .input(
            z.object({
                type: z.enum(['product', 'profile']),
            }),
        )
        .path(({ input }) => [{ type: input.type }])
        .beforeUpload(({ ctx, input, fileInfo }) => {
            if (ctx.userRole === 'ADMIN') {
                return true;
            }
            return false;
        })
        .beforeDelete(({ ctx, fileInfo }) => {
            return true;
        }),
    publicFiles: es
        .fileBucket({
            // maxSize: 1024 * 1024 * 10,
        })
        .path(({ ctx }) => [{ owner: ctx.userId }])
        .accessControl({
            OR: [
                {
                    userId: { path: 'owner' },
                },
                {
                    userRole: { eq: 'ADMIN' },
                },
            ],
        }),
});
const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
    createContext,
});
export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
