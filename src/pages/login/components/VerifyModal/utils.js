import CryptoJS from 'crypto-js';

const { enc, AES, mode, pad } = CryptoJS;

const KEYWORD = 'SwKsGlMEcdPMEhQ2B';
const UTF8 = enc.Utf8;

const AES_CONFIG = {
  mode: mode.ECB,
  padding: pad.Pkcs7,
};

/**
 * 使用 AES 算法对字符串进行加密
 *
 * @param {string} word - 需要加密的字符串
 * @param {string} [keyWord=KEYWORD] - 加密密钥，默认为 KEYWORD
 * @returns {string} 加密后的字符串
 */
export const aesEncrypt = (word, keyWord = KEYWORD) => {
  // 将密钥解析为 UTF-8 编码的字节序列
  const key = UTF8.parse(keyWord);
  // 将待加密的字符串解析为 UTF-8 编码的字节序列
  const srcs = UTF8.parse(word);
  // 使用 AES 算法在 ECB 模式和 Pkcs7 填充下进行加密
  return AES.encrypt(srcs, key, AES_CONFIG).toString();
};

/**
 * 生成一个全局唯一标识符（UUID）
 *
 * UUID 的格式为 xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx，其中：
 * - x 表示一个随机的十六进制数字
 * - y 表示一个随机的十六进制数字，但其二进制表示的高两位必须是 01（确保 UUID 的版本为 4）
 *
 * 此函数使用 Math.random 生成随机数，并将其转换为十六进制格式以替换 UUID 模板中的 x 和 y
 * 通过这种方式，可以生成一个随机的、符合 UUID 标准的唯一标识符
 *
 * @returns {string} 一个随机生成的 UUID 字符串
 */
export const uuid = () => {
  // UUID 模板
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  // 使用 replace 替换模板中的占位符，生成随机 UUID
  return template.replace(/[xy]/g, (c) => {
    // 生成 0-15 的随机整数
    const r = (Math.random() * 16) | 0;
    // 如果是 x，直接使用随机数；如果是 y，确保高两位为 01（UUID v4）
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    // 转换为十六进制字符
    return v.toString(16);
  });
};
