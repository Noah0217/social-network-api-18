const mongoose = require('mongoose');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

//server connection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/noah-social-api', {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.set('debug', true);

//server successfully connected\
app.listen(PORT, () => console.log(`Successfully connected to:${PORT}`));