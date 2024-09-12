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
        })
        .input(
            z.object({
                type: z.enum(['product', 'profile']),
            }),
        )
        .path(({ input }) => [{ type: input.type }]),

    publicFiles: es
        .fileBucket({
            maxSize: 1024 * 1024 * 10, // 10MB
            accept: ['image/jpeg', 'image/png'],
        })
        .path(({ ctx }) => [{ owner: ctx.userId }])
        .accessControl({
            OR: [
                {
                    userId: { path: 'owner' },
                },
                {
                    userRole: { eq: 'admin' },
                },
            ],
        })
        .beforeUpload(({ ctx, input, fileInfo }) => {
            console.log('beforeUpload', ctx, input, fileInfo);
            return true; // allow upload
        })
        .beforeDelete(({ ctx, fileInfo }) => {
            console.log('beforeDelete', ctx, fileInfo);
            return true; // allow delete
        }),
});
const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
    createContext,
});
export { handler as GET, handler as POST };
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
