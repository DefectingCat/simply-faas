import fs from 'fs/promises';
import { FUNC_PATH } from '../consts';

/**
 * 该函数用于删除用户函数
 * 当用户文件夹内没有函数时
 * 删除整个文件夹
 * @param  {string} userId 用户 userId
 * @param  {string} funcName 函数名称
 */
const deleteFunc = async (
  userId: string,
  funcName: string
): Promise<string> => {
  try {
    await fs.unlink(`${FUNC_PATH}/${userId}/${funcName}.js`).catch();
    // 判断当前用户文件夹是否为空，为空则删除文件夹
    const read = await fs.readdir(`${FUNC_PATH}/${userId}`);
    if (!read.length) await fs.rmdir(`${FUNC_PATH}/${userId}`);

    return 'ok';
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

export default deleteFunc;
