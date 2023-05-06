const express = require('express');
const path = require('path')
const app = express();

// get our port
const port = process.env.PORT || 4200;

// applicaton code goes here

app.use(express.static('dist/slice-of-life/'));

app.get('/', function(req,res) {
    res.sendFile(path.resolve('dist/slice-of-life/index.html'));
});

// have node listen on our port
app.listen(port, () => console.log(`App listening on port ${port}!`));

