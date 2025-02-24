import { Router } from 'express';
const router = Router();


let users = [];

router.get('/', (req, res) => {
    res.json({users});
})

router.post('/', (req, res) => {
    const {username, email, password} = req.body;
    users.push({username, email, password});
    res.status(201).send('Usuario creado');
})




export default router;