const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
let todos = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

// Routes
app.get('/', (req, res) => {
    res.render('index', { todos });
});

app.post('/add', (req, res) => {
    const { todo } = req.body;
    if (todo) todos.push(todo);
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const { index } = req.body;
    if (index >= 0 && index < todos.length) todos.splice(index, 1);
    res.redirect('/');
});

// Error handling
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
