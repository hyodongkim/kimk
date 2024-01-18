module.exports = (express, app)=>{
    app.get('/index', (req,res,next)=>{
        res.render('index');
    });
    app.get('/loginForm', (req,res,next)=>{
        res.render('loginForm');
    });
};