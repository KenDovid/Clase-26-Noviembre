import fs from "fs";
import readline from "readline";

const ARCHIVO = "registro.txt";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- FUNCIONES CRUD ---
function crearArchivo() {
    if (fs.existsSync(ARCHIVO)) {
        console.log("⚠️  El archivo ya existe.");
    } else {
        fs.writeFileSync(ARCHIVO, "Inicio del registro\n");
        console.log("✅ Archivo creado exitosamente.");
    }
    mostrarMenu();
}

function agregarContenido() {
    rl.question("👉 Escribe el texto a agregar: ", (texto) => {
        fs.appendFileSync(ARCHIVO, texto + "\n");
        console.log("➕ Texto agregado.");
        mostrarMenu();
    });
}

function leerArchivo() {
    if (!fs.existsSync(ARCHIVO)) {
        console.log("❌ El archivo no existe.");
    } else {
        const contenido = fs.readFileSync(ARCHIVO, "utf8");
        console.log("\n📄 CONTENIDO DEL ARCHIVO:");
        console.log("-------------------------");
        console.log(contenido);
        console.log("-------------------------\n");
    }
    mostrarMenu();
}

function actualizarArchivo() {
    rl.question("✍️ Nuevo contenido: ", (texto) => {
        fs.writeFileSync(ARCHIVO, texto + "\n");
        console.log("🔄 Archivo reemplazado completamente.");
        mostrarMenu();
    });
}

function eliminarArchivo() {
    if (!fs.existsSync(ARCHIVO)) {
        console.log("❌ El archivo no existe.");
    } else {
        fs.unlinkSync(ARCHIVO);
        console.log("🗑️ Archivo eliminado exitosamente.");
    }
    mostrarMenu();
}

// --- MENÚ PRINCIPAL ---
function mostrarMenu() {
    console.log(`
==============================
     🧩  CRUD INTERACTIVO
==============================
1) Crear archivo
2) Agregar contenido
3) Leer archivo
4) Actualizar archivo
5) Eliminar archivo
6) Salir
`);

    rl.question("Elige una opción (1-6): ", (op) => {
        switch (op) {
            case "1": crearArchivo(); break;
            case "2": agregarContenido(); break;
            case "3": leerArchivo(); break;
            case "4": actualizarArchivo(); break;
            case "5": eliminarArchivo(); break;
            case "6":
                console.log("👋 Hasta la próxima, Amigo.");
                rl.close();
                break;
            default:
                console.log("❓ Opción no válida, intenta otra vez.");
                mostrarMenu();
        }
    });
}

// Iniciar programa
mostrarMenu();
