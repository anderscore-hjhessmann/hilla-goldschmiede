import './views/list/list-view';
import './views/login/login-view';

import {Commands, Context, Route, Router} from '@vaadin/router';
import {uiStore} from './stores/app-store';
import {autorun} from 'mobx';

export type ViewRoute = Route & {
    title?: string;
    icon?: string;
    children?: ViewRoute[];
};

const authGuard = async (context: Context, commands: Commands) => {
    if (!uiStore.loggedIn) {
        // Save requested path
        sessionStorage.setItem('login-redirect-path', context.pathname);
        return commands.redirect('/login');
    }
    return undefined;
};

export const views: ViewRoute[] = [
    // place routes below (more info https://hilla.dev/docs/routing)
    {
        path: 'login',
        component: 'login-view',
    },
    {
        path: 'logout',
        action: (_: Context, commands: Commands) => {
            uiStore.logout();
            return commands.redirect('/login');
        },
    }, {
        path: '',
        component: 'list-view',
        icon: 'la la-file',
        title: 'list',
        action: authGuard,
    },
];

autorun(() => {
    if (uiStore.loggedIn) {
        Router.go(sessionStorage.getItem('login-redirect-path') || '/');
    } else {
        if (location.pathname !== '/login') {
            sessionStorage.setItem('login-redirect-path', location.pathname);
            Router.go('/login');
        }
    }
});

export const routes: ViewRoute[] = [...views];
