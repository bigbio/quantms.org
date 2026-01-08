import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ELIcons from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/main.scss'  // This will import _variables.scss and set global styles

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
app.use(store).use(router).use(ElementPlus).mount('#app')
