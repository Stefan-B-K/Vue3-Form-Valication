import { createApp } from 'vue'
import App from './App.vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const app = createApp(App)

const baseComponents = import.meta.glob('./components/Base*.vue', { eager: true })
Object.entries(baseComponents).forEach(([path, m]) => {
  const componentName = upperFirst(camelCase(path.split('/').pop().replace(/\.\w+$/, '')))
  app.component(componentName, m.default)
})

app.mount('#app')
