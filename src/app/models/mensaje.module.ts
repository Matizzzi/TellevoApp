export interface ChatMessage {
    sender: 'usuario' | 'conductor'; // Identifica quién envió el mensaje
    text: string; // Contenido del mensaje
  }
  