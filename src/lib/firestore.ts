
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';

initializeApp({
    credential: applicationDefault()
});

const firestore = getFirestore();

export async function db<T>(query: (prisma: any) => Promise<T>): Promise<T | undefined> {
    return Promise.resolve(undefined)
}

export default firestore