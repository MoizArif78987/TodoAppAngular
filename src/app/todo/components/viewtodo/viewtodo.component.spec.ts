import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtodoComponent } from './viewtodo.component';

describe('ViewtodoComponent', () => {
  let component: ViewtodoComponent;
  let fixture: ComponentFixture<ViewtodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
