import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const CategoryBlock = ({ data, from, to }) => {
    if (data !== undefined) {
        const titlesArr = data.map((title, idx) => {
            return idx >= from && idx < to && (
                <div
                    className="title__block"
                    id={`block-${idx + 1}`}
                    onClick={({ currentTarget }) => {
                        document.querySelector(`#${currentTarget.id} details`).toggleAttribute("open");
                    }}
                >
                    <div className="title__background--container">
                        <img src={title.jawSummary.backgroundImage.url} />
                    </div>
                    <details
                        className="title__expand"
                        open
                        onClick={({ currentTarget }) => {
                            currentTarget.toggleAttribute("open")
                        }}
                    >
                        <summary>
                            <h1>{title.jawSummary.title}</h1>
                            <div className="info__circle">
                                <span>i</span>
                            </div>
                        </summary>
                        <div className="title__details--container">
                            <p>{title.jawSummary.synopsis}</p>
                            <div className="watch__controls--container">
                                <Link
                                    to={
                                        title.summary.type == "movie" ?
                                            `/movie/${title.summary.id}` :
                                            `/series/${title.summary.id}`
                                    }
                                    onClick={() => {
                                        const details = {
                                            name: title.jawSummary.title,
                                            synopsis: title.jawSummary.synopsis,
                                            logo: title.jawSummary.logoImage.url,
                                            bgImg: title.jawSummary.backgroundImage.url,
                                            genre: title.jawSummary.genres[0].name,
                                            year: title.jawSummary.releaseYear,
                                            id: title.summary.id,
                                            type: title.summary.type
                                        };

                                        localStorage.setItem("latest", JSON.stringify(details));

                                    }}
                                >
                                    <div className="watch--button">
                                        <img src="./assets/icons/play_button.png" className="play--button" />
                                        WATCH
                                    </div>
                                </Link>
                                <div className="watch--divider"></div>
                                <Link
                                    to="#!"
                                    onClick={() => {
                                        const values = JSON.parse((localStorage.getItem("myList"))).vals;
                                        let exists = false;

                                        const details = {
                                            name: title.jawSummary.title,
                                            synopsis: title.jawSummary.synopsis,
                                            logo: title.jawSummary.logoImage.url,
                                            bgImg: title.jawSummary.backgroundImage.url,
                                            id: title.jawSummary.id,
                                            type: title.summary.type
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
                    </details>
                </div>
            );
        });

        return (
            <div className="category__container">
                {titlesArr}
            </div>
        );

    }
};

const MoviePage = () => {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('./assets/json/initial_request.json');
            const data = await response.json();

            setData(data.titles.filter((title) => title.summary.type === 'movie'));
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <h1 className="section__title">Movies</h1>
            <CategoryBlock
                data={data}
                from={0}
                to={10}
            />
            <CategoryBlock
                data={data}
                from={10}
                to={20}
            />
        </>
    );
};

export default MoviePage;