import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistidosComponent } from './assistidos.component';

describe('AssistidosComponent', () => {
  let component: AssistidosComponent;
  let fixture: ComponentFixture<AssistidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
