import {Router} from 'express';
import {db} from "../prisma";


const router = Router();

router.get('/', async (req, res) => {
    const labels = await db(prisma => prisma.label.findMany())
    res.render('label_list', {labels: labels || []})
})

router.post('/', async (req, res) => {

})


export default router