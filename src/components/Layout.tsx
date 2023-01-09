import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="col-md-8 py-3 px-3 mx-auto">
            <header className="pb-3 mb-5 border-bottom">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            Advent of Code 2022
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarNav"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/"
                                    >
                                        [Home]
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="col-lg-8 px-0 mx-auto">
                <Outlet />
            </div>
            <footer className="mt-5">
                <hr />
                <p className="text-muted">2023</p>
            </footer>
        </div>
    );
}
