import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDialComponent } from './operation-dial.component';

describe('OperationDialComponent', () => {
  let component: OperationDialComponent;
  let fixture: ComponentFixture<OperationDialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationDialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
