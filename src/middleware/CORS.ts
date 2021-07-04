import { Context } from 'koa';

const cors = async (
  ctx: Context,
  next: () => Promise<unknown>
): Promise<void> => {
  // 允许来自所有域名请求
  ctx.set('Access-Control-Allow-Origin', '*');
  // 这样就能只允许 http://localhost:8080 这个域名的请求了
  // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");
  // 设置所允许的HTTP请求方法
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set(
    'Access-Control-Allow-Headers',
    'x-requested-with, accept, origin, content-type'
  );
  // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
  // Content-Type表示具体请求中的媒体类型信息
  ctx.set('Content-Type', 'application/json;charset=utf-8');
  /*
  CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
      Cache-Control、
      Content-Language、
      Content-Type、
      Expires、
      Last-Modified、
      Pragma。
  */
  // 需要获取其他字段时，使用Access-Control-Expose-Headers，
  // getResponseHeader('myData')可以返回我们所需的值
  // ctx.set('Access-Control-Expose-Headers', 'myData');
  await next();
};

export default cors;
