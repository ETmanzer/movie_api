const { Movie, User, Genre } = require('./models'); // Ensure Genre model is imported

const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const { MongoClient } = require('mongodb'); // Including the MongoClient

const app = express();
const url = 'mongodb://localhost:27017/mfDB';
const dbName = 'mfDB';
let db; // Database variable

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('common'));

// Connect to MongoDB using Mongoose
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected successfully to MongoDB');
    seedDatabase();
}).catch(err => {
    console.error('Database connection error:', err);
});

// Connect using MongoClient for direct access if needed
MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
});

async function seedDatabase() {
    try {
        // Clear existing data
        await Movie.deleteMany({});
        await User.deleteMany({});

        // Insert genres with unique IDs
        const genresWithIds = genres.map((genre, index) => ({
            _id: index + 1,
            name: genre.name,
            description: genre.description
        }));

        // Map directors to insert into movies
        const directorsMap = new Map();
        directors.forEach(director => directorsMap.set(director.name, director));

        // Map genres to insert into movies
        const genresMap = new Map();
        genresWithIds.forEach(genre => genresMap.set(genre.name, genre));

        // Insert movies
        const moviesToInsert = topMovies.map(movie => ({
            Title: movie.title,
            Description: movie.description,
            Genre: movie.genre,
            Director: movie.director,
            ImagePath: movie.imageUrl,
            Featured: false // You might need to adjust this value
        }));
        
        await Movie.insertMany(moviesToInsert); // Error occurs here
        await User.insertMany(usersData);

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// connect();

// let movieSchema = new mongoose.Schema({
//     Title: { type: String, required: true },
//     Description: { type: String, required: true },
// });

// let Movie = mongoose.model('Movie', movieSchema);
// module.exports.Movie = Movie;

let genres = [
    { name: 'Action', description: 'Movies characterized by intense sequences of action and excitement.' },
    { name: 'Adventure', description: 'Movies that take viewers on exciting journeys and quests.' },
    { name: 'Comedy', description: 'Movies intended to make the audience laugh or find humor in situations.' },
    { name: 'Drama', description: 'Movies that explore serious themes and emotions, often focusing on character development.' },
    { name: 'Fantasy', description: 'Movies set in imaginary worlds with magical or supernatural elements.' },
    { name: 'Horror', description: 'Movies designed to scare or shock the audience with frightening or unsettling scenes.' },
    { name: 'Mystery', description: 'Movies that involve solving a mysterious event or crime, often with unexpected twists.' },
    { name: 'Romance', description: 'Movies centered around romantic relationships and love stories.' },
    { name: 'Sci-Fi', description: 'Movies that explore futuristic or speculative concepts, often set in space or the future.' },
    { name: 'Thriller', description: 'Movies characterized by suspenseful and thrilling plots, keeping viewers on the edge of their seats.' },
    // Add more genres as needed
];

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
        title: 'Terminator 2: Judgement Day',
        director: directors.find(director => director.name === 'James Cameron'),
        genre: genres.find(genre => genre.name === 'Action'),
        description: "In this sci-fi classic, a cyborg, identical to the one who failed to kill Sarah Connor, must now protect her teenage son, John, from an even more advanced and powerful Terminator.",
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        director: directors.find(director => director.name === 'Irvin Kershner'),
        genre: genres.find(genre => genre.name === 'Sci-Fi'),
        description: "In the second installment of the original Star Wars trilogy, the Rebels scatter after the Empire attacks their base. Luke Skywalker begins his training with Jedi Master Yoda, while Han Solo and Princess Leia are pursued by Darth Vader.",
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'Dances with Wolves',
        director: directors.find(director => director.name === 'Kevin Costner'),
        genre: genres.find(genre => genre.name === 'Adventure'),
        description: "A Civil War soldier develops a relationship with a band of Lakota Indians, learning their culture and way of life, ultimately becoming a member of their tribe as tensions rise between Native Americans and encroaching settlers.",
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'The Last Samuria',
        director: directors.find(director => director.name === 'Edward Zwick'),
        genre: genres.find(genre => genre.name === 'Action'),
        description: "An American military advisor embraces the Samurai culture he was hired to destroy after he is captured in battle, finding a new sense of purpose and honor.",
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'Dune',
        director: directors.find(director => director.name === 'Denis Villeneuve'),
        genre: genres.find(genre => genre.name === 'Adventure'),
        description: "In this adaptation of Frank Herbert's epic novel, Paul Atreides, a young nobleman, must navigate the dangerous politics and deadly environment of the desert planet Arrakis to ensure the future of his family and people.",
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'Dune: Part Two',
        director: directors.find(director => director.name === 'Denis Villeneuve'),
        genre: genres.find(genre => genre.name === 'Adventure'),
        description: "Continuing the saga, Paul Atreides unites with the Fremen to rise against the corrupt galactic empire and avenge his family, while fulfilling his destiny on Arrakis.",
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'Ladyhawke',
        director: directors.find(director => director.name === 'Richard Donner'),
        genre: genres.find(genre => genre.name === 'Fantasy'),
        description: "A young thief, an exiled knight, and a beautiful woman cursed to transform into a hawk during the day must work together to break the spell and defeat the evil bishop who cast it.",
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        director: directors.find(director => director.name === 'Richard Marquand'),
        genre: genres.find(genre => genre.name === 'Sci-Fi'),
        description: "In the final chapter of the original trilogy, the Rebel Alliance launches a full-scale attack on the Empire's new Death Star, while Luke Skywalker confronts Darth Vader and the Emperor to save the galaxy.",
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'John Wick',
        director: directors.find(director => director.name === 'Chad Stahelski'),
        genre: genres.find(genre => genre.name === 'Action'),
        description: "After the death of his beloved wife, former hitman John Wick is drawn back into the criminal underworld he left behind to seek vengeance against those who wronged him.",
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
    {
        title: 'John Wick: Chapter 2',
        director: directors.find(director => director.name === 'Chad Stahelski'),
        genre: genres.find(genre => genre.name === 'Action'),
        description: "Legendary hitman John Wick is forced out of retirement once again by a former associate plotting to seize control of an international assassins' guild. Bound by a blood oath, Wick travels to Rome to take down some of the world's deadliest killers.",
        imageUrl: 'https://via.placeholder.com/300x150' // Placeholder image URL
    },
];

let users = []; // This will store registered users

let usersData = [
    { Username: 'alice', Password: 'password123', Email: 'alice@example.com', Birthday: new Date('1985-02-19'), FavoriteMovies: [] },
    { Username: 'bob', Password: 'password456', Email: 'bob@example.com', Birthday: new Date('1990-07-15'), FavoriteMovies: [] },
    { Username: 'Charlie', Password: 'password789', Email: 'charlie@example.com', birthday: new Date('1982-11-30'), favoriteMovies: [] },
    { Username: 'David', Password: 'password246', Email: 'david@example.com', birthday: new Date('1995-04-25'), favoriteMovies: [] },
    { Username: 'Eve', Password: 'password357', Email: 'eve@example.com', birthday: new Date('1988-09-03'), favoriteMovies: [] }
];

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to my top movies!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

app.get('/genres/:name', async (req, res) => {
    try {
        const movie = await Movie.findOne({ 'Genre.Name': req.params.name }, 'Genre');
        if (movie) {
            res.status(200).json(movie.Genre);
        } else {
            res.status(404).send('Genre not found');
        }
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

app.get('/directors/:name', async (req, res) => {
    try {
        const movie = await Movie.findOne({ 'Director.Name': req.params.name }, 'Director');
        if (movie) {
            res.status(200).json(movie.Director);
        } else {
            res.status(404).send('Director not found');
        }
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

// Return data about a single movie by title
app.get('/movies/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const movie = await Movie.findOne({ Title: title });
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).send('Movie not found');
        }
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).send('Internal server error');
    }
});

// Allow new users to register
app.post('/users', async (req, res) => {
    try {
        const user = new User({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

// Allow users to update their user info (username)
app.put('/users/:userId', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

// Allow users to add a movie to their list of favorites
app.post('/users/:userId/favorites/:movieId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { FavoriteMovies: req.params.movieId } },
            { new: true }
        );
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:userId/favorites/:movieId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { FavoriteMovies: req.params.movieId } },
            { new: true }
        );
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

// Allow existing users to deregister
app.delete('/users/:userId', async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.userId);
        res.status(200).send('User deregistered successfully');
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});