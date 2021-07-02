import Router from 'koa-router';
import { Context } from 'koa';
import { v4 as uuidv4 } from 'uuid';

const router = new Router();

router.get('/', async (ctx: Context) => {
  const uuid = uuidv4();
  ctx.body = `Hello! ${uuid}`;
});

export default router;
