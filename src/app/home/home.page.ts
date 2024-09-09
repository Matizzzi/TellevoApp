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

    if (this.isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      this.logo = 'https://w7.pngwing.com/pngs/528/231/png-transparent-duoc-uc-logo-concepcion-central-academy-of-fine-arts-duoc-text-logo-computer-wallpaper.png';
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      this.logo = 'https://reqlut2.s3.sa-east-1.amazonaws.com/reqlut-images/duoc/logo_duoc_white.png?v=62.8';
    }
  }

  ngOnInit() {
    document.body.classList.add('light');
  }
}
