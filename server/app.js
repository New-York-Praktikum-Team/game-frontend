const path = require('path');
const express = require('express');

const app = express();

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.resolve(__dirname, '../dist') });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
