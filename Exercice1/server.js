const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const register = require('../Exercice3/userController');
const getAllUsers = require('../Exercice4/getAllUsers');
const updateUsers = require('../Exercice5/updateUsers');
const removeUsers = require('../Exercice6/removeUsers');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

dotenv.config(); 

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://iban:EggggE@test.vu90i.mongodb.net/exoUser?retryWrites=true&w=majority&appName=test");
        console.log(`Connexion à Mongoose`);
    } catch (error) { 
        console.error(error);
    }
};

connectDb();

app.get('/', (req, res) => { 
    res.send('Hello World !');
});

app.post('/register', (req, res) => {
    console.log(req.body);
    
    register(req, res);
});

app.get('/users', (req, res) => {
    getAllUsers(req, res);
});

app.put('/users/:id', (req, res) => {
    updateUsers(req, res);
});

app.delete('/users/:id', removeUsers);

app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`)); 
