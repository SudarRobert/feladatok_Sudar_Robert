import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeladatComponent } from './feladat.component';

describe('FeladatComponent', () => {
  let component: FeladatComponent;
  let fixture: ComponentFixture<FeladatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeladatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeladatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
