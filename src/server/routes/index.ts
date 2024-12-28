import { Router } from "express";

const router = Router();

router.get('/', (req,res) => {
    return res.send('Ola DEV');
});

router.post('/create',(req, res) => {
    console.log(req.body);

    return res.status(400).json(req.body);
});

export {router};