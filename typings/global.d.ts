interface Window {
  /**
   * 环境变量
   */
  env: {
    /**
     * 环境标识
     */
    NODE_ENV: 'development' | 'production';
    /**
     * 版本号
     */
    VITE_VERSION: string;
    /**
     * 接口地址
     */
    VITE_BASEURL: string;
  };
}
