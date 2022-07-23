import express from "express";
import session from 'express-session';
const { Router } = express;
import { User } from "./dbsConfig.js";
import photoRouter from "./routers/photoRouter.js";
import cors from 'cors';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import { isValidPassword } from './utils.js';
import "dotenv/config.js";

const app = express()

const router = Router();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", express.static("./public"));
app.set("view engine", "ejs"); 
app.set("views", "./views")

app.use(cookieParser());

app.use(session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB,
      mongoOptions: advancedOptions,
      ttl: 600
  }),
    secret: 'fahrenheit',
    resave: true,
    saveUninitialized: true
   }))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(
  cors({
      credentials: true,
      origin: true
  })
);
app.options('*', cors());

//PASSPORT STRATEGIES
passport.use('login', new LocalStrategy((username, password, done) => {
    return User.findOne({ username })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Usuario inexistente' })
        }
  
        if (!isValidPassword(user.password, password)) {
          return done(null, false, { message: 'Contraseña incorrecta' })
        }
        
        return done(null, user)
      })
      .catch(err => done(err))
  }))

   passport.serializeUser((user, done) => {
    //console.log('serializeUser')
    done(null, user.id)
  })
  
  passport.deserializeUser((id, done) => {
    //console.log('deserializeUser')
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

// RUTAS AUTH
router.get('/login', (req, res) => {

    if (req.user) {
        return res.redirect('/api/')
    } else {
        res.render("pages/login.ejs", { message: req.flash('error')})
    }
})

router.post('/login', passport.authenticate('login', {
    successRedirect: '/api',
    failureRedirect: '/api/login',
    failureFlash: true
  }))

router.get('/logout', (req, res) => {

    const nameRemanent = req.user; 

    if (nameRemanent) {
        return req.session.destroy(err => {
            if (!err) {
              return res.render("pages/logout.ejs", {name: nameRemanent})
            }
            return res.send({ error: err })
          })
    } else {
        return res.render("pages/expired.ejs")
    }  
   })

router.get("/", (req, res) => {
  
  if (req.user) {
      req.session.user = req.user;
      req.user.admin ? res.render("pages/index.ejs", {user: req.user}) : res.send('No tienes acceso a esta ruta')
  } else {
      res.redirect('/api/login')
  }
});

router.get("/viewordelete", (req, res) => {
  
  if (req.user) {
      req.session.user = req.user;
      req.user.admin ? res.render("pages/viewOrDelete.ejs", {user: req.user}) : res.send('No tienes acceso a esta ruta')
  } else {
      res.redirect('/api/login')
  }
});

app.use('/api', router);
app.use('/api/photos', photoRouter)
app.use((req, res, next) => {
    res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
  });