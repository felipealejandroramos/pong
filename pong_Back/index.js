const express = require('express');
const app = express();
app.use(express.json());
cors =require('cors')
const api = require('./api/router.js')

app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*'
}));
app.use('/', function(req,res,next){
    console.log(req.method, req.body);
    next();
});

app.use('/', api);

// Altre route e logica qui...
const PORT =process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(" sever avviato su " + PORT);
});
