module.exports = (express, app)=>{
    const fs = require('fs');
    app.set('fs', fs);
    app.use((req,res,next)=>{
        req.db = JSON.parse(fs.readFileSync("db.json", {encoding:'utf-8'}));
        next();
    });
};