import ('colors');

import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import {inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareasBorrar, 
    confirmar,
    mostrarListadoChecklist
} from './helpers/inquirer.js'
//import { Tarea } from './models/tarea.js';
import { Tareas } from './models/tareas.js';

console.clear();

const main = async() => {

    let opt ='';

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        // cargar tareas
        tareas.cargarTareasFromArray(tareasDB)
    }

    await pausa();

    do {
        //imprime el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // crear Tarea
                const desc = await leerInput('Descripción : ');
                tareas.crearTarea(desc)
            break;

            case '2': // listar todas las tareas
                tareas.listadoCompleto();
            break;

            case '3': // Listar todas las tareas completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4': // Listar todas las tareas pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': // competado | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr)
                console.log(ids);
            break;

            case '6': // Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');
                }
                }
                //TO DO: preguntar si está seguro
                
            break;
        }

        guardarDB(tareas.listadoArr)

        await pausa();


    } while ( opt !== '0' );

}

main();