import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, IonModal, Animation, IonDatetime } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  @ViewChild('datePicker', { static: true }) datePicker!: IonDatetime; // Referencia al ion-datetime
  @ViewChild('appTitle', { read: ElementRef, static: true }) appTitle!: ElementRef;
  @ViewChild('modalViaje', { static: true }) modalViaje?: IonModal;
  @ViewChild('modalPublicar', { static: true }) modalPublicar?: IonModal;
  @ViewChild('modalChat', { static: true }) modalChat?: IonModal;
  @ViewChild('modalPreguntas', { static: true }) modalPreguntas?: IonModal;
  @ViewChild('modalCredencial', { static: true }) modalCredencial?: IonModal;
  @ViewChild('modalPerfil', { static: true }) modalPerfil?: IonModal;
  @ViewChild('modalHistorial', { static: true }) modalHistorial?: IonModal;
  @ViewChild('modalConfiguracion', { static: true }) modalConfiguracion?: IonModal;

  isDarkMode: boolean = false;
  selectedTheme: string = 'light';
  selectedLanguage: string = 'es';

  constructor(private animationCtrl: AnimationController) {}

  ngOnInit() {
    // Cargar el tema y el idioma guardados
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
    this.selectedTheme = savedTheme || 'light';
    this.selectedLanguage = savedLanguage || 'es';

    // Reproduce la animación del título
    this.playTitleAnimation();

    // Configura las animaciones para los modales (opcional)
    this.setupModalAnimations();
  }

  applySettings(theme: string, language: string) {
    this.applyTheme(theme);
    this.applyLanguage(language);
    this.closeModal();
  }

  applyTheme(theme: string) {
    this.isDarkMode = (theme === 'dark');
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark');
      body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.add('light');
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  applyLanguage(language: string) {
    // Aquí puedes añadir la lógica para aplicar el idioma a la aplicación
    localStorage.setItem('language', language);
  }

  playTitleAnimation() {
    const titleAnimation = this.animationCtrl
      .create()
      .addElement(this.appTitle.nativeElement)
      .duration(4000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, opacity: '1', transform: 'scale(1)', color: '#FFFFFF' },
        { offset: 0.5, opacity: '0.7', transform: 'scale(1.2)', color: '#FFB800' },
        { offset: 1, opacity: '1', transform: 'scale(1)', color: '#FFFFFF' },
      ]);

    titleAnimation.play();
  }

  setupModalAnimations() {
    const createEnterAnimation = (baseEl: HTMLElement): Animation => {
      const root = baseEl.shadowRoot;
      const backdrop = root?.querySelector('ion-backdrop');
      const wrapper = root?.querySelector('.modal-wrapper');

      if (!backdrop || !wrapper) {
        return this.animationCtrl.create();
      }

      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(backdrop)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(wrapper)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const createLeaveAnimation = (baseEl: HTMLElement): Animation => {
      return createEnterAnimation(baseEl).direction('reverse');
    };

    if (this.modalViaje) {
      this.modalViaje.enterAnimation = createEnterAnimation;
      this.modalViaje.leaveAnimation = createLeaveAnimation;
    }
    if (this.modalPublicar) {
      this.modalPublicar.enterAnimation = createEnterAnimation;
      this.modalPublicar.leaveAnimation = createLeaveAnimation;
    }
    if (this.modalChat) {
      this.modalChat.enterAnimation = createEnterAnimation;
      this.modalChat.leaveAnimation = createLeaveAnimation;
    }
    if (this.modalPreguntas) {
      this.modalPreguntas.enterAnimation = createEnterAnimation;
      this.modalPreguntas.leaveAnimation = createLeaveAnimation;
    }
    if (this.modalCredencial) {
      this.modalCredencial.enterAnimation = createEnterAnimation;
      this.modalCredencial.leaveAnimation = createLeaveAnimation;
    }
    if (this.modalPerfil) {
      this.modalPerfil.enterAnimation = createEnterAnimation;
      this.modalPerfil.leaveAnimation = createLeaveAnimation;
    }
    if (this.modalHistorial) {
      this.modalHistorial.enterAnimation = createEnterAnimation;
      this.modalHistorial.leaveAnimation = createLeaveAnimation;
    }
    if (this.modalConfiguracion) {
      this.modalConfiguracion.enterAnimation = createEnterAnimation;
      this.modalConfiguracion.leaveAnimation = createLeaveAnimation;
    }
  }

  // Método para cerrar los modales
  closeModal() {
    if (this.modalViaje) this.modalViaje.dismiss();
    if (this.modalPublicar) this.modalPublicar.dismiss();
    if (this.modalChat) this.modalChat.dismiss();
    if (this.modalPreguntas) this.modalPreguntas.dismiss();
    if (this.modalCredencial) this.modalCredencial.dismiss();
    if (this.modalPerfil) this.modalPerfil.dismiss();
    if (this.modalHistorial) this.modalHistorial.dismiss();
    if (this.modalConfiguracion) this.modalConfiguracion.dismiss();
  }
}
