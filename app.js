const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));
// app.use(badRoute);
// app.use(handleCustomErrors);
// app.use(handlePSQL400s);
// app.use(handle500Statuses);

module.exports = app;
