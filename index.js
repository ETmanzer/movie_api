const express = require('express');
morgan = require('morgan');

const app = express();

let directors = [
    {
        name: 'James Cameron',
        bio: 'James Francis Cameron is a Canadian filmmaker, philanthropist, and deep-sea explorer. He first found success with the science fiction action film The Terminator.',
        birthYear: 1954,
        deathYear: null // If the director is still alive, you can use null or undefined
    },
    {
        name: 'Irvin Kershner',
        bio: 'Irvin Kershner was an American film director and occasional actor, best known for directing The Empire Strikes Back, the James Bond film Never Say Never Again, and RoboCop 2.',
        birthYear: 1923,
        deathYear: 2010
    },
    {
        name: 'Kevin Costner',
        bio: 'Kevin Michael Costner is an American actor, film director, and producer. He has received two Academy Awards, two Golden Globe Awards, a Primetime Emmy Award, and two Screen Actors Guild Awards.',
        birthYear: 1955,
        deathYear: null
    },
    {
        name: 'Edward Zwick',
        bio: 'Edward M. Zwick is an American filmmaker and producer of film and television. He has worked primarily in the comedy-drama and epic historical film genres, including About Last Night, Glory, Legends of the Fall, and Blood Diamond.',
        birthYear: 1952,
        deathYear: null
    },
    {
        name: 'Denis Villeneuve',
        bio: 'Denis Villeneuve is a Canadian film director, producer, and screenwriter. He is a four-time recipient of the Canadian Screen Award (formerly Genie Award) for Best Direction, for Maelström in 2001, Polytechnique in 2010, Incendies in 2011, and Enemy in 2013. ',
        birthYear: 1967,
        deathYear: null
    },
    {
        name: 'Richard Donner',
        bio: 'Richard Donner is an American director and producer of film and television. He is best known for the superhero film Superman (1978) and its sequels Superman II (1980) and Superman III (1983), and for directing the adventure films The Goonies (1985) and Ladyhawke (1985), and the horror film The Omen (1976).',
        birthYear: 1930,
        deathYear: 2021
    },
    {
        name: 'Richard Marquand',
        bio: 'Richard Marquand was a Welsh film director best known for directing 1983\'s Return of the Jedi, one of the original Star Wars trilogy.',
        birthYear: 1937,
        deathYear: 1987
    },
    {
        name: 'Chad Stahelski',
        bio: 'Chad Stahelski is an American stuntman and film director. He is best known for his work on the John Wick franchise, which he co-directed with David Leitch. He has also worked as a stunt coordinator and second unit director on several films.',
        birthYear: 1968,
        deathYear: null
    }
];

let topMovies = [
    {
        title: 'Terminator 2: Judegement Day',
        director: directors.find(director => director.name === 'James Cameron'),
        genre: 'Sci-Fi',
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        director: directors.find(director => director.name === 'Irvin Kershner'),
        genre: 'Sci-Fi',
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'Dances with Wolves',
        director: directors.find(director => director.name === 'Kevin Costner'),
        genre: 'Adventure',
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'The Last Samuria',
        director: directors.find(director => director.name === 'Edward Zwick'),
        genre: 'Action',
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'Dune',
        director: directors.find(director => director.name === 'Denis Villeneuve'),
        genre: 'Adventure',
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'Dune: Part Two',
        director: directors.find(director => director.name === 'Denis Villeneuve'),
        genre: 'Adventure',
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'Ladyhawke',
        director: directors.find(director => director.name === 'Richard Donner'),
        genre: 'Fantasy',
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        director: directors.find(director => director.name === 'Richard Marquand'),
        genre: 'Sci-Fi',
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'John Wick',
        director: directors.find(director => director.name === 'Chad Stahelski'),
        genre: 'Action',
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'John Wich: Chapter 2',
        director: directors.find(director => director.name === 'Chad Stahelski'),
        genre: 'Action',
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
];

let users = []; // This will store registered users


// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public'));
app.use(morgan('common'));

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my top movies!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.get('/genres/:name', (req, res) => {
    const genreName = req.params.name;
    const genre = genres.find(genre => genre.name === genreName);
    if (genre) {
        res.json(genre);
    } else {
        res.status(404).send('Genre not found');
    }
});

// Return data about a single movie by title
app.get('/movies/:title', (req, res) => {
    const title = req.params.title;
    const movie = topMovies.find(movie => movie.title === title);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('Movie not found');
    }
});

// Allow new users to register
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).send('User registered successfully');
});

// Allow users to update their user info (username)
app.put('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const updatedUserInfo = req.body;
    res.send('User info updated successfully');
});

// Allow users to add a movie to their list of favorites
app.post('/users/:userId/favorites/:movieId', (req, res) => {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    res.send('Movie added to favorites successfully');
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:userId/favorites/:movieId', (req, res) => {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    res.send('Movie removed from favorites successfully');
});

// Allow existing users to deregister
app.delete('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send('User deregistered successfully');
});

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});