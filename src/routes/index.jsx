import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { routes, lazyImport } from './routes';

const AppRouter = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Switch>
            {routes.map((route, i) => <Route key={i} path={`/${route.route}`} component={lazyImport(route.component)} /> )}
        </Switch>
    </Suspense>
)

export default AppRouter;