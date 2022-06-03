
const { response } = require('express');
const { request } = require('express');
const res = require('express/lib/response');

/*Creamos una 'variable' body  que son de express-validator, las cuales nos ayudarán a realizar las validaciones */
const { body} = require('express-validator');

/* importo la función validateResult desde  helpers/validateHelperes un helper para seguir el proceso
o mandar un error*/
const {validateResult}= require('../helpers/validateHelper') 

const validarDatos = [
     /*Con ayuda de las variables body  y validationResult creadas con 'express-validator',
    validamos que los elementos que viene en el body existan, se llamen de la forma correcta y
    sean del tipo correcto. NOTEN que es necesario que vengan todos los datos para realizar la modificación*/
    body('Nombre').exists().isLength({ min: 3 }),
    body('Apellido').exists().isLength({ min: 3 }),
    body('Edad').exists().isNumeric(), 
    body('Mail').exists().isEmail(), 
    body('Celular').exists().isNumeric(), 

    (request,response, next)=>{    
        /* Desacoplamos esta función para tener mejor control, entonces la mandamos a llamar y le pasamos los parámetros.
         nos da un resultado si consigue todas las validaciones, si consigue un error  nos retorna el error  
        sino continua el flujo con next(). Asi que simplemente la mandamos a llamar desde helpers/validateHelper */ 
        validateResult(request,response, next)
    }
]

module.exports = {validarDatos}//exportamos la constante para hacer uso en /routers/personajes.js como un  Middleware