module.exports = (PORT)=>{
    const express = require('express');
    const app = express({xPoweredBy:false});

    require('./defaultmw')(express, app);
    require('./viewmw')(express, app);
    require('./sampledb')(express, app);
    require('./logic')(express, app);
    require('./ejslinker')(express, app);

    require('./defset')(express,app);

    const router = express.Router();
    router.get('/test');
    app.use('/admin',router);
    app.use('/user',router);

    app.get('/test',(req,res,next)=>{
        res.send("테스트 성공");
    });

    app.get ('/',(req,res,next)=>{
        res.render('test');
    });

    app.listen(process.env.PORT);
}