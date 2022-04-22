import { Route } from '@vaadin/router';
import './views/helloworld/hello-world-view';
import './views/todo/todo-view';
import './views/todo/todo-grid-view';
import './views/main-layout';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '',
    component: 'todo-grid-view',
    icon: '',
    title: '',
  },
  {
    path: 'hello',
    component: 'hello-world-view',
    icon: 'la la-globe',
    title: 'Hello World',
  },
  {
    path: 'todo',
    component: 'todo-view',
    icon: 'la la-tasks',
    title: 'Todo',
  },
  {
    path: 'todo-grid',
    component: 'todo-grid-view',
    icon: 'la la-tasks',
    title: 'Todo-Grid',
  },
  {
    path: 'about',
    component: 'about-view',
    icon: 'la la-file',
    title: 'About',
    action: async (_context, _command) => {
      await import('./views/about/about-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
