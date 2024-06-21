const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const actionsRouter = require('./routes/actions');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', actionsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
