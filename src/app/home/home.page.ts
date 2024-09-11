import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  logo: string = 'https://reqlut2.s3.sa-east-1.amazonaws.com/reqlut-images/duoc/logo_duoc_white.png?v=62.8';
  isDarkMode: boolean = false;

  constructor() {}

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  
    const body = document.body;
  
    if (this.isDarkMode) {
      body.classList.add('dark');
      body.classList.remove('light');
      this.logo = 'https://reqlut2.s3.sa-east-1.amazonaws.com/reqlut-images/duoc/logo_duoc_white.png?v=62.8';
      localStorage.setItem('theme', 'dark'); // Guarda el tema en el localStorage
    } else {
      body.classList.add('light');
      body.classList.remove('dark');
      this.logo = 'https://reqlut2.s3.sa-east-1.amazonaws.com/reqlut-images/duoc/logo_duoc_white.png?v=62.8';
      localStorage.setItem('theme', 'light'); // Guarda el tema en el localStorage
    }
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    
    // Verifica si ya se ha guardado un tema y lo aplica
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark');
      this.logo = 'https://reqlut2.s3.sa-east-1.amazonaws.com/reqlut-images/duoc/logo_duoc_white.png?v=62.8';
    } else {
      document.body.classList.add('light');
      this.logo = 'https://reqlut2.s3.sa-east-1.amazonaws.com/reqlut-images/duoc/logo_duoc_white.png?v=62.8';
    }
  }
}
