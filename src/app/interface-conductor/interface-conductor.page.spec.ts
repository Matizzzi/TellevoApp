import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterfaceConductorPage } from './interface-conductor.page';

describe('InterfaceConductorPage', () => {
  let component: InterfaceConductorPage;
  let fixture: ComponentFixture<InterfaceConductorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
