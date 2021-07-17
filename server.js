const express = require('express');
const app = express();
const helmet = require("helmet");
const PORT = process.env.PORT || 3001

app.use(helmet());
//body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
var routes = require('./routes/routes')
app.use('/', routes)

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})