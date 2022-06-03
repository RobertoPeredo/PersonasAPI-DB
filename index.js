const express = require('express'); // Utilizo el módulo de express de Node
const path = require('path'); // Utilizo el módulo path de Node
const bodyParser = require('body-parser') // Utilizo el modulo de body parser
const app = express(); // Genero mi aplicación de express simplemente llamando al constructor express()
const endPoints = require('./app/routers/personas')/*Importo  el modulo(en este caso endPoint) que exporte
 desde la ruta ./app/routers/personas */
 const cors = require('cors')//Utilizo el módulo de cors
 require('dotenv').config()
 const {dbConnect}=require('./config/mysql')// importamos la función dbConnect del archivo mysql.js


app.use(cors());//le damos acceso a nuestro API desde cualquier 'origen'

//Route "Pagina principal" al momento de conectarse al API, con un método GET que el navegador hace por default
app.get('/', (req, res)=>{
    res.send("Bienvenido a mi API");
})

//Middleware
//Body Parser (Para pasar a json los endpoint tipo post), se ejecuta antes de llegar al siguiente Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


 //Middleware  (registra una ruta) y ejecuta lo que viene dentro de endPoints
app.use('/personas', endPoints)
/*Si tuviéramos otra ruta en nuestra api como por ejemplo '/objetos', debemos crear las respectivas hojas
de las carpetas controllers y routers con el mismo nombre 'objetos'*/

//llamamos a la función que realiza la conexión con la DB
dbConnect()


/* constante para nuestro puerto, es un una condición OR para el caso de  desarrollo en algún servicio
 o desarrollo local (nuestro caso) */
const port = process.env.port || 8080; 
app.listen(port, () =>console.log(`Escuchando en el puerto ${port}`))
