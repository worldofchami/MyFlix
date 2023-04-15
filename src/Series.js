import { Link, useParams } from 'react-router-dom';
import './assets/css/series-sandbox.css';
import './assets/css/sandbox.css';
import { useState, useEffect } from 'react';
import Header from './Header';

const SeriesPage = ({ data, episodes, latest }) => {
    const [currentSeason, setCurrentSeason] = useState(0);
    if (data.seasons !== undefined && episodes !== undefined) {
        const seasonVals = data.seasons.map((season, idx) => {
            return (
                <option value={idx}>
                    {season.name}
                </option>
            );
        });

        const episodeVals = episodes[currentSeason].episodes.map((episode, idx) => {
            return (
                <details
                    onClick={({ target }) => {
                        target.toggleAttribute("open");
                    }}
                >
                    <summary className="episode__summary">
                        <div className="episode__thumbnail">
                            <img src={episode.interestingMoment._342x192.webp.value.url} />
                        </div>
                        <div className="episode__name">
                            <span>{episode.title}</span>
                        </div>
                        <div className="episode__synopsis">
                            <span>{episode.contextualSynopsis.text}</span>
                        </div>
                        <div className="episode__info">
                            <span>{Math.ceil(episode.runtime / 60)} min &#x2022; {episode.availability.availabilityDate}</span>
                        </div>
                        <div className="info__circle">
                            <span>i</span>
                        </div>
                    </summary>
                </details>
            );
        });

        return (
            <>
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
                        <span>{latest.genre} &#x2022; {data.seasons.length} Seasons &#x2022; {latest.year}</span>
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
                {
                    episodes[currentSeason].episodes.length > 0 ?
                        <div className="page__episodes--container">
                            <select
                                onChange={({ currentTarget }) => {
                                    setCurrentSeason(currentTarget.value);
                                }}
                            >
                                {seasonVals}
                            </select>
                            <div className="episodes__container">
                                {episodeVals}
                            </div>
                        </div> :
                        <></>
                }
            </>
        );
    }
};

const Series = () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3f5161eb14mshb074e1c9f90f2e3p1ebd68jsn4e1fc9a2602b',
            'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
        }
    };

    const { seriesId } = useParams();

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


    const [episodes, setEpisodes] = useState();
    useEffect(() => {
        const fetchEpisodes = async () => {
            const seasonIdResponse = await fetch(`https://netflix54.p.rapidapi.com/title/seasons/?ids=${seriesId}&offset=0&limit=25&lang=en`, options);
            const seasonIdData = await seasonIdResponse.json();

            const seasons = [];
            for (const title of seasonIdData) {
                if (title.titleId === seriesId) {
                    for (const season of title.seasons) {
                        seasons.push(season.seasonId);
                    }
                }
            }

            const episodesResponse = await fetch(`https://netflix54.p.rapidapi.com/season/episodes/?ids=${seasons.join("%2C%20")}&offset=0&limit=25&lang=en`, options);
            const episodesData = await episodesResponse.json();

            setEpisodes(episodesData);
        };

        fetchEpisodes();
    }, []);

    return (
        <>
            <Header />
            <section className="page__section" id="page">
                <SeriesPage
                    data={data}
                    episodes={episodes}
                    latest={latest}
                />
            </section>
        </>
    );
};

export default Series;