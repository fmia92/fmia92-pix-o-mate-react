import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from '@vitejs/plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({ include: './src/**/*.+(js|jsx|ts|tsx)' })],
})
