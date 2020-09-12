import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"
import Explore from '../views/Explore.vue'
import Create from '../views/Create.vue'
import Analytics from '../views/Analytics.vue'
import Notes from '../views/Notes.vue'
import EditEntry from '../views/EditEntry.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/");
  };
  
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
};

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Explore,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/explore',
        name: 'Explore',
        component: Explore,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/create',
        name: 'Create',
        component: Create,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/analytics',
        name: 'Analytics',
        component: Analytics,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/notes',
        name: 'Notes',
        component: Notes,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/edit-entry/:id',
        name: 'Edit Entry',
        component: EditEntry,
        props: true,
        beforeEnter: ifAuthenticated
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router