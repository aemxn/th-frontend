import Vue from 'vue'
import VueRouter from 'vue-router'
import Explore from '../views/Explore.vue'
import Create from '../views/Create.vue'
import Analytics from '../views/Analytics.vue'
import EditEntry from '../views/EditEntry.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Explore
    },
    {
        path: '/explore',
        name: 'Explore',
        component: Explore
    },
    {
        path: '/create',
        name: 'Create',
        component: Create
    },
    {
        path: '/analytics',
        name: 'Analytics',
        component: Analytics
    },
    {
        path: '/edit-entry/:id',
        name: 'Edit Entry',
        component: EditEntry,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router