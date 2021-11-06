import { Router } from 'express'

const router = Router();
const path = '/'

router.get('/', (req, res) => {
    res.json('OK')
})

export default { path, router }