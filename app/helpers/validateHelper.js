const { validationResult } = require('express-validator');

//Construimos una función con los parámetros que nos pasan desde /validators/personas.js

const validateResult = (request,response, next) =>{

    try{
        //si no obtuvimos ninguna error continuamos con el flujo next()
        validationResult(request).throw()
        return next()
    }catch(error){
        // si obtuvimos algún error lo regresamos en la respuesta
       response.status(400).json({ errors: error.array() });
    }
}

module.exports={validateResult}