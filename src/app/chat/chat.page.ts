import { Component, OnInit } from '@angular/core';

interface ChatMessage {
  sender: 'usuario' | 'conductor';
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages: ChatMessage[] = []; // Almacena los mensajes
  newMessage: string = ''; // Entrada de texto para el mensaje
  currentSender: 'usuario' | 'conductor' = 'usuario'; // Remitente actual

  constructor() {}

  ngOnInit() {}

  sendMessage() {
    if (this.newMessage.trim()) {
      // Agregar el mensaje del usuario al arreglo
      this.messages.push({
        sender: this.currentSender,
        text: this.newMessage.trim(),
      });

      // Simular respuesta del conductor
      if (this.currentSender === 'usuario') {
        setTimeout(() => {
          this.messages.push({
            sender: 'conductor',
            text: 'Gracias por tu mensaje. Estoy revisando.',
          });
        }, 1000);
      }

      // Limpiar el campo de texto
      this.newMessage = '';
    }
  }
}
