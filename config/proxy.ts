import { hostDict, protocol } from './host';

/**
 * 开发环境代理
 */
export const proxy = {
  '/mockService/': {
    target: `${protocol}//${hostDict.MOCK}`,
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/mockService/, ''),
    ws: false,
  },
};
