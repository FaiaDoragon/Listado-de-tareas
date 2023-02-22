import { v4 } from 'uuid'

class Tarea {

    id = '';
    desc ='';
    completadoEn = null;

    constructor( desc ) {
        this.id = v4();
        this.desc = desc;
        this.completadoEn = null;
    }

}

export {Tarea};