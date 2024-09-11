import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, IonModal, Animation } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  
  @ViewChild('appTitle', { read: ElementRef, static: true }) appTitle!: ElementRef;
  @ViewChild('modalPublicar', { static: true }) modalPublicar?: IonModal;
  @ViewChild('modalChat', { static: true }) modalChat?: IonModal;
  @ViewChild('modalPreguntas', { static: true }) modalPreguntas?: IonModal;
  // Agrega otros modales aquí si es necesario

  constructor(private animationCtrl: AnimationController) {}

  ngOnInit() {
    // Reproduce la animación del título
    this.playTitleAnimation();

    // Configura las animaciones para los modales
    const createEnterAnimation = (baseEl: HTMLElement): Animation => {
      const root = baseEl.shadowRoot;

      // Verificamos si los elementos existen antes de continuar
      const backdrop = root?.querySelector('ion-backdrop');
      const wrapper = root?.querySelector('.modal-wrapper');

      if (!backdrop || !wrapper) {
        // Retornamos una animación vacía en caso de que los elementos no existan
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

    // Asigna las animaciones a los modales
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
    // Repite para otros modales si tienes más
  }

  playTitleAnimation() {
    const titleAnimation = this.animationCtrl
      .create()
      .addElement(this.appTitle.nativeElement)
      .duration(4000) // Duración de la animación
      .iterations(Infinity) // Repetir indefinidamente
      .keyframes([
        { offset: 0, opacity: '1', transform: 'scale(1)', color: '#FFFFFF' },   // Inicio: opaco, tamaño normal, blanco
        { offset: 0.5, opacity: '0.7', transform: 'scale(1.2)', color: '#FFB800' },  // Mitad: más grande, amarillo
        { offset: 1, opacity: '1', transform: 'scale(1)', color: '#FFFFFF' },   // Final: tamaño normal, blanco
      ]);

    titleAnimation.play();
  }

  // Método para cerrar los modales
  closeModal() {
    if (this.modalPublicar) {
      this.modalPublicar.dismiss();
    }
    if (this.modalChat) {
      this.modalChat.dismiss();
    }
    if (this.modalPreguntas) {
      this.modalPreguntas.dismiss();
    }
    // Agrega otros modales si los tienes
  }
}
