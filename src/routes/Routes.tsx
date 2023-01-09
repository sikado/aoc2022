import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import NoMatch from "../components/NoMatch";
import { ROUTER_HELPER } from "./RouterHelper";

const Home = lazy(async () => await import("../pages/Home"));
const Day12 = lazy(async () => await import("../pages/Day12"));

export default function RoutesWrapper() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={ROUTER_HELPER.DAY_12} element={<Day12 />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
}
