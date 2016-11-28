const path = require('path');
const router = require('koa-router')();
//const DBSequelize = require('../db/mysql').Main;
//const db = require('../models/mysql')(DBSequelize,'Codemao');

import db from '../models/mysql';
import resConfig from '../utils/ResponseFormatter';

router.get('/info/:id', (ctx, next) => {
    ctx.body = {a: 1};
});
router.get('/list', (ctx, next) => {
});
router.get('/')
export default router;