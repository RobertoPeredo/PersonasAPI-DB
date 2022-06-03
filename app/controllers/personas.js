const { response } = require('express');
const { request } = require('express');


//Obtener todas las personas de la lista

const obtenerPersonas = [(request, response)=>{

    //creo el comando para seleccionar todas los elementos  mi tabla personas y lo guardo en sql
    const sql = 'SELECT * FROM personas';
     //Hago la conexión con mi base de datos
    conn.query(sql, (error, results) => {
      //Si se genera un error con la bd lo lanzamos
        if (error) throw error;
         // Sino se genera error, verificamos que venga algo en la respuesta, es decir que el haya al menos una persona registrada
        if (results.length > 0) {
          /*Si existen personas,Mandamos todas las persona registradas en la respuesta, 
          aquí ya se realizó la sentencia de sql*/
          response.json(results);
        } else {
          //Sino existe ninguna persona registrada imprimimos el mensaje:
            response.status(415).json({error: "No existe  ninguna persona registrada"});
        }
      }); 
}]


//Obtener una  personas de la lista de acuerdo a su ID
const obtenerPersona =[(request,response)=>{
    /*recupero el id de la persona haciendo un de-structur. La idea es crear una variable llamada id, 
    que está contenida con el mismo nombre id dentro de parms*/
    const {id} = request.params 
    //creo el comando para seleccionar la persona con el id de mi tabla personas y lo guardo en sql 
    const sql = `SELECT * FROM personas WHERE id = ${id}`;
     //Hago la conexión con mi base de datos
    conn.query(sql, (error, results) => {
      //Si se genera un error con la bd lo lanzamos
        if (error) throw error;
         // Sino se genera error, verificamos que venga algo en la respuesta, es decir que el id exista
        if (results.length > 0) {
      // Si el id existe, mandamos en la respuesta los datos de la persona, aquí ya se realizó la sentencia de sql
          response.json(results);
        } else {
          //Sino existe el id imprimimos el mensaje:
        response.status(410).json({error: "Este id no existe"});
        }
      }); 
    
    
}]



//Añadir una nueva persona a la lista
const añadirPersona = [(request,response)=>{ 
/*Todo esto se ejecuta solo si los datos fueron validados. Es decir, validarDatos dentro de
/validator/personas.js continuó con  next()*/

//creo el comando para seleccionar para añadir una persona en  mi tabla personas y lo guardo en sql 
const sql = `INSERT INTO personas SET ?`
 //Crea una variable de tipo objeto, llamada nuevaPersona, con los datos mandados en el body dentro de request
    const nuevaPersona = {        
        Nombre: request.body.Nombre,
        Apellido: request.body.Apellido,
        Edad: request.body.Edad,
        Mail: request.body.Mail,
        Celular: request.body.Celular
    }
  //Hago la conexión con mi base de datos
    conn.query(sql,nuevaPersona, (error) => {
      //Si se genera un error con la bd lo lanzamos
        if (error) throw error;
        /* Sino se genera error, mando en mi respuesta los de la persona creada, aquí ya se realizó la 
        sentencia de sql,pero para mandar los datos de la persona creada primero solicito el id que le asignó
        con el siguiente comando*/                         
        sqlId ='SELECT @@identity AS id'
        //Hago la conexión con mi base de datos
        conn.query(sqlId,(error,results)=>{
        //Si se genera un error con la bd lo lanzamos
          if (error) throw error;
          // Sino se genera error accedo al id que viene que viene en la posición cero de resultados
        neWId=results[0].id
        //a mi objeto nuevo persona le agrego el id
        nuevaPersona.id=neWId
        // Ahora sí mando como respuesta los datos de la persona que se agregó
        response.json(nuevaPersona) 
          
        })        
        
      }); 
}]

  
//Actualizar una nueva persona de la lista
const actualizarPersona = [ (request,response)=>{  
    /*Todo esto se ejecuta solo si los datos fueron validados. Es decir, validarDatos dentro de
/validator/personas.js continuó con  next() */
   

 /*recupero el id de la persona haciendo un de-structur. La idea es crear una variable llamada id, 
    que está contenida con el mismo nombre id dentro de parms*/    
    const {id} = request.params
    
   //creo el comando para seleccionar la persona con el id de mi tabla personas y lo guardo en sql 
    const sql = `SELECT * FROM personas WHERE id = ${id}`;
    //Hago la conexión con mi base de datos
    conn.query(sql, (error, results) => {
      //Si se genera un error con la bd lo lanzamos
        if (error) throw error;
        // Sino se genera error, verificamos que venga algo en la respuesta, es decir que el id exista
        if (results.length > 0) {
           /*Si el id existe, almaceno en variables  todos los valores que provienen del body (desestructuro)  */
           const {Nombre,Apellido,Edad,Mail,Celular} = request.body;
          /* Si el id existe, podemos modificar los datos de la persona, entonces guardamos el comando
           para modificar en sqlUpdate*/
          const sqlUpdate = `UPDATE personas SET  Nombre = '${Nombre}', Apellido = '${Apellido}',
          Edad = '${Edad}', Mail = '${Mail}', Celular = '${Celular}' WHERE id = ${id}; `          
          //Hago la conexión con mi base de datos       
          conn.query(sqlUpdate,error => {
            //Si se genera un error con la bd lo lanzamos
            if (error) throw error;
            /* Sino se genera error, mando en mi respuesta los de la persona modificados, 
              aquí ya se realizó la sentencia de sql */
            response.json({id,Nombre,Apellido,Edad,Mail,Celular});
      }); 
    }  
        else {
          //Sino existe el id imprimimos el mensaje:
        response.status(410).json({error: "Este id no existe"});
        }
      });
  
}]

const eliminarPersona = [(request,response)=>{
   /*recupero el id de la persona haciendo un de-structur. La idea es crear una variable llamada id, 
    que está contenida con el mismo nombre id dentro de parms*/
    const {id} = request.params 

    //creo el comando para seleccionar la persona con el id de mi tabla personas y lo guardo en sql 
    const sql = `SELECT * FROM personas WHERE id = ${id}`;
          //Hago la conexión con mi base de datos
        conn.query(sql, (error, results) => {
           //Si se genera un error con la bd lo lanzamos
        if (error) throw error;
        // Sino se genera error, verificamos que venga algo en la respuesta, es decir que el id exista
        if (results.length > 0) {
          // Si el id existe, lo podemos eliminar., entonces guardamos el comando para eliminar en: sqlDelete
            const sqlDelete = `DELETE FROM personas WHERE  id = ${id};`
            //Hago la conexión con mi base de datos
            conn.query(sqlDelete,error => {
              //Si se genera un error con la bd lo lanzamos
                if (error) throw error;
                /* Sino se genera error, mando en mi respuesta el id de la persona eliminada, 
                aquí ya se realizó la sentencia de sqlDelete */
              response.json(id);
              }); 
        } else {
          //Sino existe el id imprimimos el mensaje
        response.status(410).json({error: "Este id no existe"});
        }
      }); 

    
}]

//exporto las funciones hacia mi ruta /routers/personas.js
module.exports = {obtenerPersonas, obtenerPersona,añadirPersona, actualizarPersona, eliminarPersona}
