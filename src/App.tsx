import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ROUTER_HELPER } from "./routes/RouterHelper";
import RoutesWrapper from "./routes/Routes";

export default function App() {
    const routes = RoutesWrapper();

    return (
        <BrowserRouter basename={ROUTER_HELPER.BASE_URL}>
            <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
        </BrowserRouter>
    );
}
