import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ELIcons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './assets/styles/global.scss'

// Create Vue application
const app = createApp(App)

// Register all Element Plus icons globally
for (const iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName])
}

// Configure router
router.afterEach(() => {
  window.scrollTo(0, 0)
})

// Error handling
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err)
  console.error('Info:', info)
}

// Mount application
app.use(store).use(router).mount('#app')
