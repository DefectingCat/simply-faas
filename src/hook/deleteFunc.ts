import fs from 'fs/promises';
import { FUNC_PATH } from '../consts';

const deleteFunc = async (
  userId: string,
  funcName: string
): Promise<string> => {
  try {
    await fs.unlink(`${FUNC_PATH}/${userId}/${funcName}.js`);
    return 'ok';
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

export default deleteFunc;
