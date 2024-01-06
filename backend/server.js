const express = require('express');
const server = express();
const PORT = process.env.PORT || 8000;

const cors = require('cors');
server.use(cors('http://localhost:3000'));

appCars = require('./routes');
appCars(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
}); 