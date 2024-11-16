import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import the global styles from assets (its the same as in the old project)
import '@/assets/styles/styles.css';

createApp(App).use(store).use(router).mount('#app');
