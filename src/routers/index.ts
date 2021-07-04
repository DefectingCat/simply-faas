import Router from 'koa-router';
import { Context } from 'koa';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import readFunc from '../hook/readFunc';
import createFunc, { body } from '../hook/createFunc';
import deleteFunc from '../hook/deleteFunc';

const router = new Router();

router.get('/', async (ctx: Context) => {
  ctx.body = 'Hello!';
});

// 获取 UUID 请求
router.get('/api/user', async (ctx: Context) => {
  const uuid = uuidv4();
  const user = {
    userId: uuid,
  };
  ctx.body = user;
});

/**
 * 该函数用于接收用户创建的函数
 * @param  {} '/create' 接口地址
 * @param  {Context} ctx Koa 上下文
 * @return 成功时返回带有 userId 的状态
 */
router.post('/api/create', async (ctx: Context) => {
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

/**
 * 该函数用于获取已有函数列表
 * @param  {} '/list' 接口地址
 * @param  {Context} ctx Koa 上下文
 * @return 成功时返回带有 userId 的状态
 */
router.post('/api/list', async (ctx: Context) => {
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

/**
 * 该函数用于删除指定函数
 * @param  {} '/list' 接口地址
 * @param  {Context} ctx Koa 上下文
 * @return 成功时返回带有 userId 的状态
 */
router.delete('/api/list', async (ctx: Context) => {
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
