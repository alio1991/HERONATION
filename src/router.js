import { Router } from '@vaadin/router';

export const initRouter = node => {
  const router = new Router(node);
  router.setRoutes([

    {
      path: '/',
      component: 'default-view',
      action: () => {
        import('./views/default-view/default-view.js')
      }
    },
    {
      path: '/testing-page',
      component: 'testing-page',
      action: () => {
        import('./views/testing-page/testing-page.js')
      }
    }

  ])
}