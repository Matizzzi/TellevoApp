import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.add(savedTheme);
    } else {
      document.body.classList.add('light'); // Tema por defecto
    }
  }

  toggleTheme() {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Remover el tema actual y agregar el nuevo
    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);

    // Guardar la selección en localStorage
    localStorage.setItem('theme', newTheme);
  }
}
