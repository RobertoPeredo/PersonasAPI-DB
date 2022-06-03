const mysql = require('mysql');//Utilizo el módulo de mysql p

 /*creo un objeto con los parámetros necesarios para realizar la conexión a la db, noten
    que lo realizo con los valores que añadimos en el archivo .env*/
    conn= mysql.createConnection({
        host:process.env.DB_CONN,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD, 
        database:process.env.DB_DATABASE,
        port:process.env.DB_PORT      
  })

//Creo una función para realizar la conexión de la base de datos
const dbConnect = () =>{ 
  //con los datos del objeto, intentamos hacer la conexión a la base de datos
    conn.connect(error=>{
        // si hay error en la conexión
    if(error) throw {error: "**** ERROR DE CONEXION ****"}
       //si la conexión fue correcta    
    console.log("**** CONEXION CORRECTA ****");
})
}

const dbEndPoint =(sql)=>{
    conn.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
          res.json(results);
        } else {
          res.send('Not result');
        }
      });
   

}

//exportamos nuestra función para llamarla en el index
module.exports={dbConnect}