const express = require('express');
morgan = require('morgan');

const app = express();

let topMovies = [
    {
        title: 'Terminator 2: Judegement Day',
        director: 'James Cameron',
        genre: 'Sci-Fi'
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        director: 'Irvin Kershner',
        genre: 'Sci-Fi'
    },
    {
        title: 'Dances with Wolves',
        director: 'Kevin Costner',
        genre: 'Adventure'
    },
    {
        title: 'The Last Samuria',
        director: 'Edward Zwick',
        genre: 'Action'
    },
    {
        title: 'Dune',
        director: 'Denis Villeneuve',
        genre: 'Adventure'
    },
    {
        title: 'Dune: Part Two',
        director: 'Denis Villeneuve',
        genre: 'Adventure'
    },
    {
        title: 'Ladyhawke',
        director: 'Richard Donner',
        genre: 'Fantasy'
    },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        director: 'Richard Marquand',
        genre: 'Sci-Fi'
    },
    {
        title: 'John Wick',
        director: 'Chad Stahelski',
        genre: 'Action'
    },
    {
        title: 'John Wich: Chapter 2',
        director: 'Chad Stahelski',
        genre: 'Action'
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