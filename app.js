const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

//mongoose connection
require('./db')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());











const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});