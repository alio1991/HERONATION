import { Router } from '@vaadin/router';

export const initRouter = node =>{
    const router = new Router(node);
    debugger;
    router.setRoutes([
        {
            path: '/',
            redirect: 'test-page',
        },
        {
            path:'/test-page',
            component: 'test-page',
            action: ()=>{
                import( './views/test-page/test-page.js')
            }
        },
        {
            path: '/testing-page',
            component: 'testing-page',
            action: ()=>{
                import( './views/testing-page/testing-page.js')
            }
        }
        
    ])
}