import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Render React so public-data API clients remain the source of truth. The
// reference-HTML transform bypassed this application and froze API data.
export default defineConfig({
    plugins: [react()], // 本地运行配置
    server: {
        open: true, // 设置服务启动时是否自动打开浏览器
        cors: true, // 允许跨域
        host: '0.0.0.0',
        port: 5175,
        // 是否开启 https
        https: false,
    }
});
