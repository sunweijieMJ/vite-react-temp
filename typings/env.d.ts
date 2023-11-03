/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 版本号
   */
  readonly VITE_VERSION: string;
  /**
   * 接口地址
   */
  readonly VITE_BASEURL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
