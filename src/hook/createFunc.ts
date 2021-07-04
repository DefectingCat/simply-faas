import fs from 'fs/promises';
import { FUNC_PATH } from '../consts';

export type body = {
  userId: string;
  funcName: string;
  funContext: string;
};

/**
 * 该函数用于创建用户函数
 * 并写入到以 userId 划分的文件夹内
 * @param  {body} body POST 请求中的 body
 */
const createFunc = async (body: body): Promise<string> => {
  try {
    // 判断对应用户目录是否存在
    const read = await fs
      .readdir(`${FUNC_PATH}/${body.userId}`)
      .catch(() => null);

    if (!read) await fs.mkdir(`${FUNC_PATH}/${body.userId}`);

    if (body.funcName == null) throw new Error('函数名不能为空');

    // 创建并写入函数
    await fs.writeFile(
      `${FUNC_PATH}/${body.userId}/${body.funcName}.js`,
      body.funContext
    );

    return 'ok';
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

export default createFunc;
