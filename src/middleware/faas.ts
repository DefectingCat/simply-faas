import os from 'os';
import fs from 'fs/promises';
import { Safeify } from 'safeify';
import type { Context } from 'koa';

const num = os.cpus().length;
const CPUs = num > 1 ? Math.floor(num / 2) : num;

const run = async (path: string) => {
  try {
    // Read the function from user
    const fn = await fs.readFile(`./src/func/${path}.js`, {
      encoding: 'utf-8',
    });
    // Use arrow function to handle semicolon
    const fnIIFE = `const func = ${fn}`;
    // return new VM().run(`${fnIIFE} func()`);

    // 创建 safeify 实例
    const safeVm = new Safeify({
      timeout: 3000,
      asyncTimeout: 6000,
      quantity: CPUs,
      cpuQuota: 0.2,
    });

    const result = await safeVm.run(` ${fnIIFE} return func()`);

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
  ctx.response.body = await run(ctx.request.path);
};

export default runFaaS;
