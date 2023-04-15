import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="sandbox--page__header">
            <nav className="page__nav" id="left">
                <ul>
                    <li>
                        <NavLink to="/"
                            className={({ isActive }) =>
                                isActive ? "link-active" : undefined
                            }>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/watchlist"
                            className={({ isActive }) =>
                                isActive ? "link-active" : undefined
                            }>
                            Watchlist
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="header__logo--container">
                <img src="/assets/icons/myflix_logo.png" />
            </div>
            <nav className="page__nav" id="right">
                <ul>
                    <li>
                        <NavLink to="/series"
                            className={({ isActive }) =>
                                isActive ? "link-active" : undefined
                            }>
                            Series
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/movies"
                            className={({ isActive }) =>
                                isActive ? "link-active" : undefined
                            }>
                            Movies
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;