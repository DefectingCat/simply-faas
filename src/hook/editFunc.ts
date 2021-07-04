import fs from 'fs/promises';
import { FUNC_PATH } from '../consts';

const editFunc = async (userId: string, funcName: string): Promise<string> => {
  try {
    const context = await fs
      .readFile(`${FUNC_PATH}/${userId}/${funcName}.js`)
      .catch((e) => {
        console.log(e);
      });
    return context ? context.toString() : 'error';
  } catch (e) {
    return 'error';
  }
};

export default editFunc;
