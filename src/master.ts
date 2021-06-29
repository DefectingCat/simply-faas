import cluster from 'cluster';
import os from 'os';
import fs from 'fs/promises';
import Koa from 'koa';
import { VM } from 'vm2';

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
    return new VM().run(`${fnIIFE} func()`);
  } catch (e) {
    console.log(e);
    return 'Not Found Function';
  }
};

if (cluster.isMaster) {
  for (let i = 0; i < CPUs; i++) {
    cluster.fork();
  }
} else {
  const app = new Koa();

  app.use(async (ctx) => {
    ctx.response.body = await run(ctx.request.path);
  });

  app.listen(3000);
}
