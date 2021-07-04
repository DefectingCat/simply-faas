import path from 'path';

// 尝试使用 UUID v5 的 name space
// const UID_NAMESPACE = 'a0123823-8c14-44a4-bb4a-87849f27042c';

// 以 userId 分类的函数存放路径，根目录的 func 文件夹，与 src 同级
const FUNC_PATH = path.resolve(__dirname, '../../func');

export { FUNC_PATH };
