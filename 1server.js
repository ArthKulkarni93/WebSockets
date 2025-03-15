//creates simple Express server in nodejs

const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        msg: "hi there "
    })
})

const port = 3000;
app.listen(port, () => {
    console.log(`server running on ${port}`);
})