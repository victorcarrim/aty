import { defineConfig } from 'vite'
import path from 'path';
import { readFileSync } from "fs"
import react from '@vitejs/plugin-react'

const ssl = {
  key: readFileSync(path.join(__dirname, 'ssl', 'localhost-key.pem')),
  cert: readFileSync(path.join(__dirname, 'ssl', 'localhost.pem'))
}



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    https: ssl,
  }
})
