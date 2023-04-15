import { Link, useParams } from 'react-router-dom';
import './assets/css/series-sandbox.css';
import './assets/css/sandbox.css';
import { useState, useEffect } from 'react';
import Header from './Header';

const MoviePage = ({ latest }) => {
    return (
        <div className="page__main--container">
            <div className="page__bg--container">
                <img src={latest.bgImg} />
            </div>
            <div className="page__details--container">
                <div className="page__logo--container">
                    <img src={latest.logo} />
                </div>
                <h1>{latest.name}</h1>
                <p>{latest.synopsis}</p>
                <span>{latest.genre} &#x2022; {latest.year}</span>
                <Link
                    to="#!"
                    onClick={() => {
                        const values = JSON.parse((localStorage.getItem("myList"))).vals;
                        let exists = false;

                        const details = {
                            name: latest.name,
                            synopsis: latest.synopsis,
                            logo: latest.logo,
                            bgImg: latest.bgImg,
                            id: latest.id,
                            type: latest.type
                        };

                        for (const idx of values) {
                            if (idx.id === details.id) exists = true;
                        }

                        if (!exists) {
                            const myList = values;
                            myList.push(details);
                            localStorage.setItem("myList", `{"vals" : ${JSON.stringify(myList)}}`);
                        }
                    }}
                >
                    <div className="add--text">
                        <span className="watchlist--plus">+</span>
                        Watchlist
                    </div>
                </Link>
            </div>
        </div>
    );
};

const Movie = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/assets/json/get_seasons.json');
            const data = await response.json();

            setData(data[0]);
        };

        fetchData();
    }, []);

    const [latest, setLatest] = useState({});
    useEffect(() => {
        const latest = localStorage.getItem("latest");
        const latestAsJSON = JSON.parse(latest);

        setLatest(latestAsJSON);
    }, []);

    return (
        <>
            <Header />
            <section className="page__section" id="page">
                <MoviePage
                    data={data}
                    latest={latest}
                />
            </section>
        </>
    );
};

export default Movie;