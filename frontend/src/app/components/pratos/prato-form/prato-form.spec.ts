import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PratoForm } from './prato-form';

describe('PratoForm', () => {
  let component: PratoForm;
  let fixture: ComponentFixture<PratoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PratoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PratoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
