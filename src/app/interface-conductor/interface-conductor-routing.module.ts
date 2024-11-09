import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterfaceConductorPage } from './interface-conductor.page'; // Importa el nombre correcto

const routes: Routes = [
  {
    path: '',
    component: InterfaceConductorPage, // Asegúrate de que el componente es InterfaceConductorPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterfaceConductorPageRoutingModule {}
