import { hostname, isHttps, port } from './host';
import { proxy } from './proxy';

/**
 * 开发代理
 */
export const devServer = () => {
  return {
    https: isHttps,
    host: hostname,
    port,
    proxy,
  };
};
