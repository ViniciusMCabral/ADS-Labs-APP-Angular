import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PratoList } from './prato-list';

describe('PratoList', () => {
  let component: PratoList;
  let fixture: ComponentFixture<PratoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PratoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PratoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
