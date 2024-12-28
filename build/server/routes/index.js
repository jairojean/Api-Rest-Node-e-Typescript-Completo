"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    return res.send('Ola DEV');
});
router.post('/create', (req, res) => {
    console.log(req.body);
    return res.status(400).json(req.body);
});
