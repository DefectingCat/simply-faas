import Koa from 'koa';
import runFaaS from './middleware/faas';
import logger from 'koa-logger';
import OPTION from './option';
import router from './routers';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

app.use(logger());
app.use(bodyParser());
// 先注册路由
app.use(router.routes());
app.use(router.allowedMethods());
// 路由未匹配到的则运行函数
app.use(runFaaS);

console.log(`⚡[Server]: running at http://${OPTION.host}:${OPTION.port} !`);

export default app.listen(OPTION.port);
