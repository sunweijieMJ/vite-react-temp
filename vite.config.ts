import path from 'path';
import react from '@vitejs/plugin-react-swc';
import dayjs from 'dayjs';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import type { PluginOption } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { devServer } from './config/devServer';

const datetime = dayjs().format('YYYY-MM-DD_HH-mm-ss');

function generatePlugins(): PluginOption[] {
  return [
    react(),
    // 拷贝文件到dist中
    viteStaticCopy({
      targets: [{ src: path.resolve(__dirname, './src/locale'), dest: '.' }],
    }),
    // 打包产物分析
    process.env.ANALYZER &&
      visualizer({
        title: 'Vite Bundle Visualizer',
        open: true,
        brotliSize: true,
        gzipSize: true,
        sourcemap: false,
        template: 'treemap',
        filename: 'dist/analyzer.html',
      }),
  ];
}

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: generatePlugins(),
    // 配置开发环境代理
    server: devServer(),
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 配置全局scss
          additionalData: '@use "@/assets/scss/base.scss" as *;',
        },
      },
    },
    build: {
      outDir: 'dist', // 打包目录名称
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          // 打包编译文件名称
          entryFileNames: `static/js/[name].${process.env.VITE_VERSION}.t${datetime}.js`,
          chunkFileNames: `static/js/[name].${process.env.VITE_VERSION}.t${datetime}.js`,
          assetFileNames: `static/assets/[name].${process.env.VITE_VERSION}.t${datetime}.[ext]`,
          // 代码分割
          manualChunks(id) {
            const chunkMap = new Map();
            chunkMap.set(/[\\/]src[\\/]components[\\/]/.test(id), 'components');
            chunkMap.set(/[\\/]node_modules[\\/]/.test(id), 'vendors');
            chunkMap.set(
              /[\\/]node_modules[\\/]echarts[\\/]/.test(id),
              'echarts',
            );
            chunkMap.set(/[\\/]node_modules[\\/]axios[\\/]/.test(id), 'axios');
            chunkMap.set(
              /[\\/]node_modules[\\/]react-dom[\\/]/.test(id),
              'axios',
            );
            chunkMap.set(
              /[\\/]node_modules[\\/]localforage[\\/]/.test(id),
              'reactDom',
            );
            chunkMap.set(
              /[\\/]node_modules[\\/]lodash[\\/]/.test(id),
              'lodash',
            );
            chunkMap.set(
              /[\\/]node_modules[\\/]@codemirror[\\/]/.test(id),
              'codemirror',
            );
            chunkMap.set(/[\\/]node_modules[\\/]antd[\\/]/.test(id), 'antd');
            chunkMap.set(
              /[\\/]node_modules[\\/]@ant-design[\\/]/.test(id),
              'antDesign',
            );
            chunkMap.set(
              /[\\/]node_modules[\\/]video.js[\\/]/.test(id),
              'videoJs',
            );
            chunkMap.set(
              /[\\/]node_modules[\\/]xlsx-js-style[\\/]/.test(id),
              'xlsxStyle',
            );
            chunkMap.set(
              /[\\/]node_modules[\\/]xlsx[\\/](?!(xlsx.js))/.test(id),
              'xlsx',
            );
            if (chunkMap.get(true)) return chunkMap.get(true);
            return null;
          },
        },
      },
    },
  });
};
