// CRUD de archivos desde consola usando Node.js
// Amigo, este código es tu espada y tu escudo.

// Módulos
import fs from 'fs';

const ARCHIVO = 'registro.txt';

// --- Obtener comando y argumentos ---
const [,, comando, ...args] = process.argv;

// --- Helpers mágicos ---
function crearArchivo() {
    if (fs.existsSync(ARCHIVO)) {
        console.log("⚠️  El archivo ya existía, no fue creado.");
        return;
    }

    fs.writeFileSync(ARCHIVO, "Inicio del registro de actividades\n");
    console.log("✅ Archivo creado exitosamente");
}

function agregarContenido(texto) {
    if (!fs.existsSync(ARCHIVO)) {
        console.log("❌ No se puede agregar: el archivo no existe.");
        return;
    }

    const linea = texto ? texto : `Nueva actividad: ${new Date().toISOString()}`;

    fs.appendFileSync(ARCHIVO, linea + "\n");
    console.log("➕ Contenido agregado:");
    console.log(linea);
}

function leerArchivo() {
    if (!fs.existsSync(ARCHIVO)) {
        console.log("❌ El archivo no existe.");
        return;
    }

    const contenido = fs.readFileSync(ARCHIVO, 'utf8');
    console.log("📄 Contenido del archivo:\n");
    console.log(contenido);
}

function actualizarArchivo(nuevoTexto) {
    if (!fs.existsSync(ARCHIVO)) {
        console.log("❌ No se puede actualizar: el archivo no existe.");
        return;
    }

    const texto = nuevoTexto ? 
        nuevoTexto :
        `REGISTRO ACTUALIZADO\nÚltima modificación: ${new Date().toISOString()}`;

    fs.writeFileSync(ARCHIVO, texto + "\n");

    console.log("🔄 Archivo actualizado con:");
    console.log(texto);
}

function eliminarArchivo() {
    if (!fs.existsSync(ARCHIVO)) {
        console.log("❌ El archivo no existe.");
        return;
    }

    fs.unlinkSync(ARCHIVO);
    console.log("🗑️ Archivo eliminado con éxito.");
}

// --- Controlador estilo maestro ninja ---
switch (comando) {
    case "crear":
        crearArchivo();
        break;

    case "agregar":
        agregarContenido(args.join(" "));
        break;

    case "leer":
        leerArchivo();
        break;

    case "actualizar":
        actualizarArchivo(args.join(" "));
        break;

    case "eliminar":
        eliminarArchivo();
        break;

    default:
        console.log(`
Comandos disponibles:

  node crud_consola crear
  node crud_consola agregar "texto opcional"
  node crud_consola leer
  node crud_consola actualizar "nuevo contenido"
  node crud_consola eliminar

Cada comando es un pequeño hechizo del caos organizado.
`);
}
