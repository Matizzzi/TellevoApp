export interface User {
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone?: string; // Este campo es opcional
    rut: string; // Agregar el campo rut
    rol: boolean // Agregar el campo rol
    profession: string; // Agregar el campo profesion
  }
  