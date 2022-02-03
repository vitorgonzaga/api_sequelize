const express = require('express');
// importando do arquivo index.js
const { Product } = require('../models');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, description, price } = req.body;
  Product.create({ name, description, price })
    .then((newProduct) => {
      res.status(201).json(newProduct);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});
