// Código corregido

import http from 'http';
import fs from 'fs';

const port = 3000;
const ARCHIVO = 'registro.txt';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // ===== RUTA INICIO =====
    if (req.url === '/' || req.url === '/inicio') {
        return res.end(`
            <h1>CRUD con archivos .txt usando FS</h1>
            <p>Selecciona una acción:</p>
            <ul>
                <li><a href="/crear">Crear archivo</a></li>
                <li><a href="/agregar">Agregar contenido</a></li>
                <li><a href="/leer">Leer archivo</a></li>
                <li><a href="/actualizar">Actualizar archivo</a></li>               
                <li><a href="/eliminar">Eliminar archivo</a></li>
            </ul>
        `);
    }

    // ===== CREATE =====
    if (req.url === '/crear') {

        // Si NO existe, lo crea
        if (!fs.existsSync(ARCHIVO)) {
            fs.writeFileSync(ARCHIVO, 'Inicio del registro de actividades\n');
        }

        return res.end(`
            <h1>Crear archivo</h1>
            <p>Archivo creado exitosamente.</p>
            <a href="/inicio">Volver</a>
        `);
    }

    // ===== APPEND =====
    if (req.url === '/agregar') {

        const nuevaLinea = `Nueva actividad: ${new Date().toISOString()}\n`;

        fs.appendFileSync(ARCHIVO, nuevaLinea);

        return res.end(`
            <h1>Agregar contenido</h1>
            <p>Se agregó esta línea:</p>
            <pre>${nuevaLinea}</pre>
            <a href="/inicio">Volver</a>
        `);
    }

    // ===== READ =====
    if (req.url === '/leer') {

        if (!fs.existsSync(ARCHIVO)) {
            return res.end(`
                <h1>Error</h1>
                <p>El archivo no existe.</p>
                <a href="/inicio">Volver</a>
            `);
        }

        const contenido = fs.readFileSync(ARCHIVO, 'utf8');

        return res.end(`
            <h1>Leer archivo</h1>
            <pre>${contenido}</pre>
            <a href="/inicio">Volver</a>
        `);
    }

    // ===== UPDATE =====
    if (req.url === '/actualizar') {

        const nuevoContenido = `REGISTRO ACTUALIZADO\nÚltima modificación: ${new Date().toISOString()}\n`;

        fs.writeFileSync(ARCHIVO, nuevoContenido);

        return res.end(`
            <h1>Actualizar archivo</h1>
            <p>Archivo reemplazado completamente por:</p>
            <pre>${nuevoContenido}</pre>
            <a href="/inicio">Volver</a>
        `);
    }

    // ===== DELETE =====
    if (req.url === '/eliminar') {

        if (fs.existsSync(ARCHIVO)) {
            fs.unlinkSync(ARCHIVO);
            return res.end(`
                <h1>Eliminar archivo</h1>
                <p>Archivo eliminado correctamente.</p>
                <a href="/inicio">Volver</a>
            `);
        }

        return res.end(`
            <h1>Eliminar archivo</h1>
            <p>El archivo no existe.</p>
            <a href="/inicio">Volver</a>
        `);
    }

    // ===== RUTA NO EXISTE =====
    res.end(`
        <h1>Error 404</h1>
        <p>Ruta no encontrada: ${req.url}</p>
        <a href="/inicio">Volver</a>
    `);

});

server.listen(port, () => {
    console.log(`Servidor arriba en http://localhost:${port}`);
});