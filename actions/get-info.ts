'use server';

import * as z from 'zod';
import { InfoGirl } from '@/schema/index';
import prisma from '@/lib/prisma';

export async function GetInfo(values: z.infer<typeof InfoGirl>) {
    try {
        const validatedFields = InfoGirl.safeParse(values);
        if (!validatedFields.success) {
            return { error: 'Invalid fields!' };
        }
        const { fullName, phone } = validatedFields.data;
        await prisma.cte.create({
            data: { name: fullName, phone },
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: 'Internal server error' };
    }
}
