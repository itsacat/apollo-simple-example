import React from 'react';
import {Link} from 'react-router-dom';


class FilmsPageView extends React.Component {
    createFilm(film, index) {
        return (
            <div key={index}>
                <span><Link to={`/film/${film.id}`}>{film.name}</Link></span>
                <span> (likes: {film.usersCount})</span>
            </div>
        );
    }

    render() {
        console.log('Component FilmsPage: render');

        let films = this.props.data.films;

        if (films === undefined) {
            return (<div>Loading</div>)
        }

        return (
            <div>
                <h1>Films</h1>

                <div>
                    {films.map((film, index) => {
                        return this.createFilm(film, index);
                    })}
                </div>
            </div>
        );
    }
}


export {FilmsPageView};
