import Vue from 'vue'
import VueRouter, {Route} from 'vue-router'
import Home from '../views/Home.vue'

import Ava from '../views/wallet/Ava.vue';

import Transfer from '@/components/wallet/transfer/Transfer.vue';
// import Assets from '../views/wallet/Assets.vue';
import History from '../views/wallet/History.vue';
// import Transfer from '../views/wallet/Transfer.vue';
import Advanced from '@/components/wallet/advanced/Advanced.vue';
import ManageKeys from '@/components/wallet/keys/ManageKeys.vue';
import Menu from '../views/access/Menu.vue';
import AccessString from '../views/access/AccessString.vue';
import Keystore from '../views/access/Keystore.vue';
import Mnemonic from "@/views/access/Mnemonic.vue";
import Access from '../views/access/Access.vue';
import Create from "@/views/Create.vue";
import Wallet from "@/views/Wallet.vue";

Vue.use(VueRouter);


import store from '../store/index' // your vuex store
import WalletHome from "@/views/wallet/Home.vue";


const ifNotAuthenticated = (to: Route, from: Route, next: Function) => {
    if (!store.state.isAuth) {
        next();
        return
    }
    next('/wallet')
};

const ifAuthenticated = (to: Route, from: Route, next: Function) => {
    if (store.state.isAuth) {
        next();
        return
    }
    next('/')
};


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/access',
        children: [
            {
                path: '/',
                name: 'access',
                component: Menu,
            },
            {
                path: 'private_key',
                component: AccessString,
            },
            {
                path: 'keystore',
                component: Keystore,
            },
            {
                path: 'mnemonic',
                component: Mnemonic,
            }
        ],
        component: Access,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/create',
        name: 'create',
        component:  Create,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/wallet',
        children: [
            {
                path: '/',
                name: 'wallet',
                component: WalletHome
            },
            {
                path: 'transfer',
                component: Transfer
            },
            {
                path: 'keys',
                component: ManageKeys
            },
            {
                path: 'advanced',
                component: Advanced
            }
        ],
        component: Wallet,
        beforeEnter: ifAuthenticated
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
