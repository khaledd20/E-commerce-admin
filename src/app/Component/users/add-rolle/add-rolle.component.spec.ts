import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRolleComponent } from './add-rolle.component';

describe('AddRolleComponent', () => {
  let component: AddRolleComponent;
  let fixture: ComponentFixture<AddRolleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRolleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRolleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
