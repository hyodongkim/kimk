module.exports = (express, app)=>{
    app.use(require('cookie-parser')("내가만든쿠키 너에게는 독약이지"));
    app.use(express.json());
    app.use(express.raw());
    app.use(express.text());
    app.use(express.urlencoded({extended:true}));
    app.use('/resources', express.static('resources',{
        dotfiles:"ignore",
        extensions:[], // 비포함 확장자
        fallthrough:true,
        immutable:false,
        maxAge:18000000,
        index:false,
        redirect:false,
    }));
    app.use((req,res,next)=>{
        res.locals.user = undefined;
        next();
    })
};