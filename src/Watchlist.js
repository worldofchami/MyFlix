import Header from "./Header";
import './assets/css/watchlist-sandbox.css';
import { Link } from "react-router-dom";
import { useState } from "react";

const List = ({ data }) => {
    const [list, setList] = useState(JSON.parse(localStorage.getItem("myList")).vals);

    const titleList = list.map((title, idx) => {
        return (
            <div
                className="watchlist__title"
                style={{ background: `url(${title.bgImg})`, backgroundSize: 'contain' }}
                id={`title-${idx}`}
                onMouseOver={({ currentTarget }) => {
                    document.querySelector(`#${currentTarget.id}>.watchlist__title--details`).style.display = "flex";
                }}
                onMouseLeave={({ currentTarget }) => {
                    document.querySelector(`#${currentTarget.id}>.watchlist__title--details`).style.display = "none";
                }}
            >
                <div className="watchlist__title--overlay">
                    <img src={title.logo} />
                </div>
                <div className="watchlist__title--details">
                    <div className="watchlist__info--container">
                        <h1>{title.name}</h1>
                        <span>{title.synopsis}</span>
                    </div>
                    <div className="watch__controls--container">
                        <Link
                            to={
                                title.type == "movie" ?
                                    `/movie/${title.id}` :
                                    `/series/${title.id}`
                            }
                            onClick={() => {
                                const details = {
                                    name: title.name,
                                    synopsis: title.synopsis,
                                    logo: title.logo,
                                    bgImg: title.bgImg,
                                    genre: title.genre,
                                    year: title.year,
                                    id: title.summary.id,
                                    type: title.type
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
                                const newList = list.filter((toRemove) => toRemove.id !== title.id);
                                setList(newList);
                                localStorage.setItem("myList", `{"vals" : ${JSON.stringify(newList)}}`);
                            }}
                        >
                            <div className="add--text">
                                <span className="watchlist--plus">-</span>
                                Watchlist
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <>
            <h1 className="section__title">Watchlist</h1>
            <div className="watchlist__title--container">
                {titleList}
            </div>
        </>
    );
};

const Watchlist = () => {

    const items = localStorage.getItem("myList");
    const data = (JSON.parse(items).vals);

    return (
        <>
            <Header />
            <section className="page__section" id="page">
                <List
                    data={data}
                />
            </section>
        </>
    );
};

export default Watchlist;