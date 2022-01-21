import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { supabase } from './lib/supabase';
import { userSession } from './vuetils/useAuth';
import './index.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
/**
 * Keeps track of if the user is logged in or out and will update userSession state accordingly.
 */
supabase.auth.onAuthStateChange((event, session) => {
  userSession.value = session;
});
