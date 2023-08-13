import { Firestore } from '@google-cloud/firestore'

const db = new Firestore({
    projectId: 'finance-391120',
    keyFilename: 'firestore-service-account.json',
});

export default db 