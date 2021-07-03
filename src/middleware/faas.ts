import os from 'os';
import fs from 'fs/promises';
import { Safeify } from 'safeify';
import type { Context } from 'koa';
import { FUNC_PATH } from '../consts';

const num = os.cpus().length;
const CPUs = num > 1 ? Math.floor(num / 2) : num;

/**
 * 这个函数用于按路径读取指定的 FaaS 函数并运行
 * 在 POST 请求下会传递 body 给 FaaS 函数
 * Koa 的 ctx 请求上下文总是会传递给函数
 *
 * @param  {string} path 函数位置
 * @param  {string|Record<string} event POST 请求 body
 */

const run = async (
  path: string,
  ctx: Context,
  event: string | Record<string, unknown> = {}
) => {
  try {
    // Read the function from user
    const fn = await fs.readFile(`${FUNC_PATH}/${path}.js`, {
      encoding: 'utf-8',
    });
    // Use arrow function to handle semicolon
    const fnIIFE = `const func = ${fn}`;

    // 创建 safeify 实例
    const safeVm = new Safeify({
      timeout: 3000,
      asyncTimeout: 6000,
      quantity: CPUs,
      cpuQuota: 0.2,
    });

    const result = await safeVm.run(
      ` ${fnIIFE} return func(${JSON.stringify(event)},${JSON.stringify(ctx)})`
    );

    // 释放资源
    safeVm.destroy();
    return result;
  } catch (e) {
    console.log(e);
    return 'Not Found Function';
  }
};

type runFaaS = (ctx: Context) => Promise<void>;

const runFaaS: runFaaS = async (ctx) => {
  // 如果是 POST，则传递 body 给函数
  if (ctx.req.method === 'POST') {
    ctx.response.body = await run(ctx.request.path, ctx, ctx.request.body);
  } else {
    ctx.response.body = await run(ctx.request.path, ctx);
  }
};

export default runFaaS;
