module.exports = app => {
    const cars = require('../controllers/cars.controller')

    app.get('/api', cars.showStart);

    app.get('/api/show', cars.showAll);

    app.get('/api/find', cars.findCar);

    app.get('/api/create', cars.createCar);
    
    app.get('/api/delete', cars.deleteCar);

    app.get('/api/edit', cars.editCar);
}