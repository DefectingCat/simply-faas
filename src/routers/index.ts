import Router from 'koa-router';
import { Context } from 'koa';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import readFunc from '../hook/readFunc';
import createFunc, { body } from '../hook/createFunc';
import deleteFunc from '../hook/deleteFunc';

const router = new Router();

router.prefix('/api');

router.get('/', async (ctx: Context) => {
  ctx.body = `Hello!`;
});

// 获取 UUID 请求
router.get('/user', async (ctx: Context) => {
  const uuid = uuidv4();
  const user = {
    userId: uuid,
  };
  ctx.body = user;
});

// 创建函数请求
router.post('/create', async (ctx: Context) => {
  const body = ctx.request.body;
  if (typeof body === 'object' && typeof body.userId === 'string') {
    if (uuidValidate(body.userId)) {
      const state = await createFunc(body as body);
      const funcList = {
        userId: body.userId,
        state,
      };
      ctx.body = funcList;
    } else {
      ctx.body = 'ID 错误';
    }
  }
});

// 获取已有函数列表
router.post('/list', async (ctx: Context) => {
  const body = ctx.request.body;
  if (typeof body === 'object' && typeof body.userId === 'string') {
    if (uuidValidate(body.userId)) {
      const list = await readFunc(body.userId);
      const funcList = {
        userId: body.userId,
        list,
      };
      ctx.body = funcList;
    } else {
      ctx.body = 'ID 错误';
    }
  }
});

// 删除指定函数
router.delete('/list', async (ctx: Context) => {
  const body = ctx.request.body;
  if (
    typeof body === 'object' &&
    typeof body.userId === 'string' &&
    typeof body.funcName === 'string'
  ) {
    if (uuidValidate(body.userId)) {
      const state = await deleteFunc(body.userId, body.funcName);
      const funcList = {
        userId: body.userId,
        state,
      };
      ctx.body = funcList;
    } else {
      ctx.body = 'ID 错误';
    }
  }
});

export default router;
