const express = require('express');
morgan = require('morgan');

const app = express();

let topMovies = [
    {
        title: 'Terminator 2: Judegement Day',
        director: 'James Cameron'
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        director: 'Irvin Kershner'
    },
    {
        title: 'Dances with Wolves',
        director: 'Kevin Costner'
    },
    {
        title: 'The Last Samuria',
        director: 'Edward Zwick'
    },
    {
        title: 'Dune',
        director: 'Denis Villeneuve'
    },
    {
        title: 'Dune: Part Two',
        director: 'Denis Villeneuve'
    },
    {
        title: 'Ladyhawke',
        director: 'Richard Donner'
    },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        director: 'Richard Marquand'
    },
    {
        title: 'John Wick',
        director: 'Chad Stahelski'
    },
    {
        title: 'John Wich: Chapter 2',
        director: 'Chad Stahelski'
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

app.get('/movies/:title', (req, res) => {
    const title = req.params.title;
    const movie = topMovies.find(movie => movie.title === title);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('Movie not found');
    }
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).send('User registered successfully');
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