export interface User {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string; // Este campo es opcional
  rut: string; // Agregar el campo rut
  role: string; // Cambia a string para representar "conductor" o "cliente"
  profession: string; // Agregar el campo profesion
}
