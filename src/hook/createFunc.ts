import fs from 'fs/promises';
import { FUNC_PATH } from '../consts';

export type body = {
  userId: string;
  funcName: string;
  funContext: string;
};
const createFunc = async (body: body): Promise<string> => {
  try {
    // 判断对应用户目录是否存在
    const read = await fs
      .readdir(`${FUNC_PATH}/${body.userId}`)
      .catch(() => null);

    if (!read) await fs.mkdir(`${FUNC_PATH}/${body.userId}`);

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
