import { lazy } from "react";

export const lazyImport = (component) => lazy(() => import(`pages/${component}`));

export const routes = [
    {route: 'domu', component: 'home'},
    {route: 'kontakt', component: 'contact'},
    {route: 'kosik', component: 'cart'},
    {route: 'prehled', component: 'user'},
    {route: 'login', component: 'login'},
    {route: '', component: 'home'},
]