// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import basicSsl from '@vitejs/plugin-basic-ssl'

// export default defineConfig({
//   plugins: [react(), basicSsl()],
//   server: {
//     http: true
//   }
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    https: false,  // Optional; HTTPS is off by default
    port: 5173     // Optional; default Vite port
  }
})
