require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const passport = require('passport'); 
const initializePassport = require('./config/passport.config'); 

const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const viewsRouter = require('./routes/views.router');
const sessionsRouter = require('./routes/sessions.router'); 
const mocksRouter = require('./routes/mocks.router'); 
const usersRouter = require('./routes/users.router.js');
const petsRouter = require('./routes/pets.router');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');
const adoptionsRouter = require('./routes/adoption.router.js');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Inicializamos Passport ANTES de las rutas
initializePassport();
app.use(passport.initialize());

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación Backend III',
            description: 'API pensada para gestionar el e-commerce (Módulo de Usuarios)'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter); 
app.use('/api/mocks', mocksRouter); 
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/', viewsRouter);

module.exports = app;