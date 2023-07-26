const http = require("http");

const server = http.createServer((request,response)=>{
    console.log("El servidor ha recibido una solicitud");
});

//Levantar el servidor en un puerto
server.listen(8080,()=>console.log("Servidor corriendo en el puerto 8080"));