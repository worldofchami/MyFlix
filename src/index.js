import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './assets/css/style.css';
import MoviePage from "./MoviePage";

import { Home, Series, Movie } from './Pages';
import SeriesPage from "./SeriesPage";
import Watchlist from "./Watchlist";

const Index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/series/:seriesId" element={<Series />} />
                <Route path="/movie/:movieId" element={<Movie />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/series" element={<SeriesPage />} />
                <Route path="/movies" element={<MoviePage />} />
            </Routes>
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);