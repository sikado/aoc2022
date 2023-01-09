import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import NoMatch from "./components/NoMatch";

const Home = lazy(async () => await import("./pages/Home"));
const Day12 = lazy(async () => await import("./pages/Day12"));

export default function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/day_12" element={<Day12 />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
