const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGOD_URI || 'mongodb://localhost/socialnet', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//log mongo queries to console
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));