import {Router} from 'express';
import {getLabels} from "../service/label-service";
import {db} from "../prisma";

const router = Router();

router.get('/', async (req, res) => {
    const labels = await getLabels()
    console.log({labels})
    res.render('label_list', {ctx: res.locals.ctx, labels: labels || []})
})

router.post('/', async (req, res) => {
    const {name, color, description} = req.body
    console.log(
        name, color, description
    )
    await db(prisma => prisma.label.create({data: {name, color, description}}))
    res.send(201)
})

router.patch('/', async (req, res) => {
    const {id, name, color, description} = req.body
    const data: Record<string, string> = {}
    if (name) {
        data.name = name
    }
    if (color) {
        data.color = color
    }
    if (description) {
        data.description = description
    }
    await db(prisma => prisma.label.update({where: {id}, data}))
    res.send(201)
})

router.delete('/', async (req, res) => {
    const {id} = req.body
    await db(prisma => prisma.label.delete({where: {id}}))
    res.send(201)
})

export default router