// server.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/book_store');

app.use(express.json());
app.use(cors()); // Use the cors middleware

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    price: Number,
    image: String,
});

const Book = mongoose.model('Book', bookSchema);

// Function to seed initial data into the database
const seedDatabase = async () => {
    try {
        await Book.deleteMany(); // Clear existing data

        const books = [
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 20, image: 'https://img.freepik.com/premium-photo/book-with-boy-reading-book-titled-boy_1153744-14831.jpg?ga=GA1.1.1284746988.1718969743&semt=ais_hybrid'},

            { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth',price:50,image: 'https://img.freepik.com/premium-photo/book-with-bird-top-it-book-with-words-raven-page_1092575-65157.jpg?ga=GA1.1.1284746988.1718969743&semt=ais_hybrid'},

            { title: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A dystopian vision of a totalitarian future society', price: 255, image: 'https://img.freepik.com/free-photo/opened-book-near-leaves-box_23-2147868638.jpg?ga=GA1.1.1284746988.1718969743&semt=ais_hybrid' },

            { title: 'Pride and Prejudice', author: ' Jane Austen', genre: 'Fiction', description: 'The love story of Elizabeth Bennet and Mr.Darcy', price: 220, image: 'https://img.freepik.com/free-photo/red-rose-branch-with-wedding-ring-book_23-2148017955.jpg?ga=GA1.1.1284746988.1718969743&semt=ais_hybrid' },

            { title: 'Little Women', author: 'Louisa May Alcott', genre: 'Fiction', description: 'An emotional epic and moving family saga', price: 1115, image: 'https://img.freepik.com/premium-photo/happy-parents-reading-book-children-sitting-bed_1048944-23825487.jpg?ga=GA1.1.1284746988.1718969743&semt=ais_hybrid' },

            { title: 'Beloved', author: 'Toni Morrison', genre: 'Dystopian', description: 'The story of a dysfunctional family of formerly enslaved people', price: 125, image: 'https://img.freepik.com/premium-photo/book-with-chain-padlock-information-security_220873-9019.jpg?ga=GA1.1.1284746988.1718969743&semt=ais_hybrid' } 
        ];
        
        await Book.insertMany(books);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Seed the database on server startup
seedDatabase();
// Define API endpoint for fetching all books
app.get('/api/books', async (req, res) => {
    try {
        // Fetch all books from the database
        const allBooks = await Book.find();
        // Send the entire books array as JSON response
        res.json(allBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
