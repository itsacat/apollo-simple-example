import Sequelize from 'sequelize';
import casual from 'casual';
import lodash from 'lodash';


casual.seed(123);


const sequelize = new Sequelize('userfilms', null, null, {
    dialect: 'sqlite',
    storage: './userfilms.sqlite'
});

const UserModel = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
    }
});

const FilmModel = sequelize.define('film', {
    name: {
        type: Sequelize.STRING,
    }
});

// Relations
UserModel.belongsToMany(FilmModel, {through: 'userToFilm'});
FilmModel.belongsToMany(UserModel, {through: 'userToFilm'});


let COUNT_OF_USERS = 3;
let COUNT_OF_FILMS = 10;
let MIN_COUNT_OF_FILMS_IN_USER = 2;
let MAX_COUNT_OF_FILMS_IN_USER = 10;

// let COUNT_OF_USERS = 1;
// let COUNT_OF_FILMS = 1;
// let MIN_COUNT_OF_FILMS_IN_USER = 1;
// let MAX_COUNT_OF_FILMS_IN_USER = 1;


const addDataToDB = async () => {
    await sequelize.sync({force: true});

    await createFilms();
    await createUsers();
};

const createFilms = async () => {
    let promises = await lodash.times(COUNT_OF_FILMS, async () => {
        await FilmModel.create({
            name: casual.title
        })
    });
    await Promise.all(promises);
};

const createUsers = async () => {
    let promises = lodash.times(COUNT_OF_USERS, async () => {
        let user = await UserModel.create({
            name: casual.first_name
        });


        let numberOfFilmsInUser = lodash.random(
            MIN_COUNT_OF_FILMS_IN_USER, MAX_COUNT_OF_FILMS_IN_USER
        );
        let filmsId = lodash.range(1, COUNT_OF_FILMS + 1);

        let promises = lodash.times(numberOfFilmsInUser, async () => {
            let filmId = lodash.sample(filmsId);
            filmsId = lodash.without(filmsId, filmId);

            let film = await FilmModel.findById(filmId);
            await user.addFilm(film);
        });
        await Promise.all(promises);
    });
    await Promise.all(promises);
};

addDataToDB();

const User = sequelize.models.user;
const Film = sequelize.models.film;

export {User, Film};
