import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import NoMatch from "./components/NoMatch";
import Day12 from "./pages/Day12";
import Home from "./pages/Home";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/day_12" element={<Day12 />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
}
