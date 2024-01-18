module.exports = (PORT)=>{
    const express = require('express');
    const app = express({xPoweredBy:false});

    require('./defaultmw')(express, app);
    require('./viewmw')(express, app);
    require('./sampledb')(express, app);
    require('./logic')(express, app);
    require('./ejslinker')(express, app);

    app.listen(PORT);
}