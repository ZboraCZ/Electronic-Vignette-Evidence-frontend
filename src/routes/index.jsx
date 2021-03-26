import { Suspense } from "react";
import { Switch } from "react-router-dom";
import { lazyImport, PublicRoute, PrivateRoute } from 'utils/routing';
import { privateRoutes, publicRoutes } from './route-list';


const AppRouter = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Switch>
            {publicRoutes.map(({ route, component, restricted }, i) => (
                <PublicRoute restricted={!!restricted} component={lazyImport(component)} path={`/${route}`} exact key={i} /> 
            ))}

            {privateRoutes.map(({ route, component }, i) => (
                <PrivateRoute component={lazyImport(component)} path={`/${route}`} exact key={i} /> 
            ))}
        </Switch>
    </Suspense>
)

export default AppRouter;