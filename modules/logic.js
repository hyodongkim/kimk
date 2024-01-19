module.exports = (express, app)=>{

    app.use((req,res,next)=>{
        if(req.signedCookies.sess) 
            res.locals.user = 
                req.db.users.find((user)=>user.userid === req.signedCookies.sess);
        next();
    });

    app.post('/login', (req,res,next)=>{
        if(res.locals.user){
            res.redirect('/index');
            return;
        }
        let user = req.db.users.find((user)=>
                user.userid === req.body.userid &&
                user.userpw === req.body.userpw);
        if(user){
            res.locals.user = user;
            res.cookie("sess", user.userid, {
                domain:req.domain,
                maxAge:1000 * 60 * 30,
                signed:true
            });

            res.redirect('/index');
        }
        else res.redirect('/loginForm');
    });

    app.post('/logout', (req,res,next)=>{
        if(res.locals.user) {
            res.clearCookie('sess',{
                domain:req.domain,
                signed:true
            });
        }
        res.redirect('/index');
    });
    
    app.post('/signup', (req,res,next)=>{
        if(res.locals.user){
            res.redirect('/index');
            return;
        }
        let fs = req.app.get('fs');
        if(req.db.users.find((user)=>
                user.userid === req.body.userid
            )) res.redirect('/loginForm');
        req.db.users.push({
            key: req.db.users.reduce((prev, now)=> prev > now ? prev : now).key + 1,
            userid:req.body.userid,
            userpw:req.body.userpw
        });
        res.locals.user = req.db.users[req.db.users.length - 1];
        res.cookie("sess", res.locals.user.userid, {
            domain:req.domain,
            maxAge:1000 * 60 * 30,
            signed:true
        });
        fs.writeFileSync("db.json", JSON.stringify(req.db), {encoding:"utf-8"});
        res.redirect('/index');
    });
};