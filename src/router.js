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
      path: '/centers',
      component: 'centers-location',
      action: () => {
        import('./views/centers-location/centers-location.js')
      }
    },
    {
      path: '/access',
      component: 'access-view',
      action: () => {
        import('./views/access-view/access-view.js')
      }
    }

  ])
}