export const publicRoutes = [
    {route: 'domu', component: 'home'},
    {route: 'objednavka/:id', component: 'purchase'},
    {route: 'login', component: 'login', restricted: true},
    {route: 'registrace', component: 'registration', restricted: true},
    {route: 'informace', component: 'information'},
    {route: 'o-projektu', component: 'about-project'},
    {route: '', component: 'home'}
]

export const privateRoutes = [
    {route: 'prehled', component: 'overview'},
    {route: 'profil', component: 'my-profile'}
]

