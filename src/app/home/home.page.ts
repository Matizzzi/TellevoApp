import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {@ViewChild('startButton', { read: ElementRef, static: true }) startButton!: ElementRef;

  logo: string = 'https://reqlut2.s3.sa-east-1.amazonaws.com/reqlut-images/duoc/logo_duoc_white.png?v=62.8';
  isDarkMode: boolean = false;

  constructor(private animationCtrl: AnimationController) {}

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark');
      body.classList.remove('light');
      this.logo = 'https://reqlut2.s3.sa-east-1.amazonaws.com/reqlut-images/duoc/logo_duoc_white.png?v=62.8';
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.add('light');
      body.classList.remove('dark');
      this.logo = 'https://reqlut2.s3.sa-east-1.amazonaws.com/reqlut-images/duoc/logo_duoc_white.png?v=62.8';
      localStorage.setItem('theme', 'light');
    }
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark');
      this.logo = 'https://reqlut2.s3.sa-east-1.amazonaws.com/reqlut-images/duoc/logo_duoc_white.png?v=62.8';
    } else {
      document.body.classList.add('light');
      this.logo = 'https://reqlut2.s3.sa-east-1.amazonaws.com/reqlut-images/duoc/logo_duoc_white.png?v=62.8';
    }

    // Ejecutar la animación después de cargar la página
    this.playButtonAnimation();
  }

  playButtonAnimation() {
    const buttonAnimation = this.animationCtrl
      .create()
      .addElement(this.startButton.nativeElement)
      .duration(1000)
      .iterations(Infinity) // Repetir indefinidamente
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.1)' },
        { offset: 1, transform: 'scale(1)' },
      ]);

    buttonAnimation.play();
  }
}
