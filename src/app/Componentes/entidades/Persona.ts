export class Persona {
    cedula: string;
    nombres: string;
    apellidos: string;
    sexo: string;
    fechaNacimiento: string;

    constructor(ced: string, nom: string, ape: string, sexo: string, fn: string) {
        this.cedula = ced;
        this.nombres = nom;
        this.apellidos = ape;
        this.sexo = sexo;
        this.fechaNacimiento = fn;
    }
}
