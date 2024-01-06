//Методы запросов к базе данных
const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');

let dbQuery = '';

exports.showStart = (req, res) => {
    res.json(['Welcome to CAR BASE']);
};

exports.showAll = async (req, res) => {
    dbQuery = 'SELECT * FROM cars';
    try {
        const db = await mysql.createConnection(dbConfig);
        const [result, fields] = await db.execute(dbQuery);
        res.json(result);
        console.log('showAll worked correctly');
        await db.end();
    } catch (error) {
        console.log(error);
    }
}

exports.findCar = async (req, res) => {
    dbQuery = 'SELECT * FROM cars';
    const findQuery = Object.entries(req.query);
    findQuery.map(([key, value], i) => {
        dbQuery += `${i < 1 ? ' WHERE' : ''}${i > 0 ? ' AND' : ''} ${key} = '${value}'`
    });
    console.log(dbQuery);
    try {
        const db = await mysql.createConnection(dbConfig);
        const [result, fields] = await db.execute(dbQuery);
        console.log('findCar worked correctly');
        await db.end();
        return findQuery.length > 0 ? res.json(result) : res.json([]);
    } catch (error) {
        console.log(error);
    }
}

exports.createCar = async (req, res) => {
    const createQuery = Object.entries(req.query);
    let reqKeys = ''; 
    let reqValues = '';
    createQuery.map(([key, value], i) => {
        reqKeys += `${i < 1 ? '' : ', ' }${key}`;
        reqValues += `${i < 1 ? '' : ', ' }'${value}'`;
    })
    dbQuery = `INSERT INTO cars (${reqKeys}) VALUES (${reqValues})`;

    try {
        const db = await mysql.createConnection(dbConfig);
        await db.execute(dbQuery);
        console.log(`createCar worked correctly`);
        res.json(['create']);
        await db.end();
    } catch (error) {
        console.log(error);
    }
}

 exports.deleteCar = async (req, res) => {
    const idQuery = req.query.id;
    let deleteQuery = `DELETE FROM cars WHERE cars.id = ${idQuery}`;
    try {
        const db = await mysql.createConnection(dbConfig);
        await db.execute(deleteQuery);
        const [result] = await db.execute(dbQuery);
        console.log('deleteCar worked correctly');
        await db.end();
        return idQuery ? res.json(result) : res.json([]);
    } catch (error) {
        console.log(error);
    }    
}

exports.editCar = async (req, res) => {
    let editQuery = 'UPDATE cars SET ';
    const createQuery = Object.entries(req.query);
    createQuery.map(([key, value], i) => {
        if (key === 'id') return;
        editQuery += `${i < 2 ? '' : ', ' }${key} = '${value}'`;
    })
    editQuery += ` WHERE cars.id = ${req.query.id}`;
    try {
        const db = await mysql.createConnection(dbConfig);
        await db.execute(editQuery);
        const [result] = await db.execute(dbQuery);
        res.json(result);
        console.log('editCar worked correctly');
        await db.end();
    } catch (error) {
        console.log(error);
    }    
}


    // const db = mysql.createConnection(dbConfig);
    // db.connect();
    // let dbQuery = 'SELECT * FROM cars';
    // db.query(dbQuery, (error, result) => {
        // res.json(result);
        // console.log('showAll worked correctly');
    // });
    // db.end();
