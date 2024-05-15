const express = require('express');
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

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});