module.exports = (express, app)=>{
    require('dotenv').config({path:'config/.env'});
    app.use(require('cookie-parser')(process.env.COOKIE_SECRET));
    app.use((req,res,next)=>{
        res.setCookie=(key,value,age)=>{
            res.cookie(key,value,{
                path:'/',
                domain:req.domain,
                secure: false,
                httpOnly: false,
                signed: true,
                maxAge: age
            });
        };

        res.removeCookie = (key) =>{
            res.clearCookie(key, {
                path:'/',
                domain:req.domain,
                secure: false,
                httpOnly: false,
                signed: true
            });
        };

        res.removeAllCookie = () =>{
            for(let key in req.signedCookies){
            res.clearCookie(key, {
                path:'/',
                domain:req.domain,
                secure: false,
                httpOnly: false,
                signed: true
            })};
        };
        res.totalCookies = {...req.cookies, ...req.signedCokkies};
        next();
    });
    app.use(require('cors')({
         origin:"https://localhost:3000",
        // origin : /^http?:\/\/www\.naver\.com$/
        // origin: (origin, done)=>{
        //     if(origin ==="http://www.naver.com") done(null,true);
        //     else done(new Error("에러"));
        // }
        methods:['get','post'],
        allowedHeaders:['Content-Type'],
        exposedHeaders:['Content-Type'],
        credentials:true,
        maxAge: 1000 * 60 * 30
    }));
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
    app.set('view engine', 'ejs');
    app.set('views', 'templates');
};