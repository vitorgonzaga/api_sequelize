const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());

// Não faz o encode dos headers que vem na url da requisição
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products/', productController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
