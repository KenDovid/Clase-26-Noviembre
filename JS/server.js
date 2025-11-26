// Primer código

const http = require('http');
const server = http.createServer((req,res)=>{
    res.end("Servidor funcionando");
});

const port = 3000;
server.listen(port,()=>{
    console.log(`Servidor conectado en http://localhost:${port}`);
});

const fs = require("fs");
fs.writeFile("register.txt", "Contenido inicial del archivo", (err) => {
    if(err){
        console.log("Error al crear el archivo", err)
    } else {
        console.log("Archivo creado correctamente");
    }
});