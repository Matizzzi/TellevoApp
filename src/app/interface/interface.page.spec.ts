import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterfacePage } from './interface.page';

describe('InterfacePage', () => {
  let component: InterfacePage;
  let fixture: ComponentFixture<InterfacePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
