import fs from 'fs/promises';
import { FUNC_PATH } from '../consts';

/**
 * 该函数用于读取以 userId 分类的文件夹内的函数列表
 * @param  {string} userId 用户 userId
 */
const readFunc = async (userId: string): Promise<string[]> => {
  try {
    const result = await fs.readdir(`${FUNC_PATH}/${userId}`);
    return result;
  } catch (e) {
    return [''];
  }
};

export default readFunc;
