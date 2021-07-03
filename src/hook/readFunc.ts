import fs from 'fs/promises';
import { FUNC_PATH } from '../consts';

const readFunc = async (userId: string): Promise<string[]> => {
  try {
    const result = await fs.readdir(`${FUNC_PATH}/${userId}`);
    return result;
  } catch (e) {
    return [''];
  }
};

export default readFunc;
