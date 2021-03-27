export const publicRoutes = [
    {route: 'domu', component: 'home'},
    {route: 'kosik', component: 'cart'},
    {route: 'login', component: 'login', restricted: true},
    {route: 'registrace', component: 'registration', restricted: true},
    {route: 'o-projektu', component: 'about-project'},
    {route: '', component: 'home'},
]

export const privateRoutes = [
    {route: 'prehled', component: 'overview'}
]

