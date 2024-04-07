import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtPanelComponent } from './court-panel.component';

describe('CourtPanelComponent', () => {
  let component: CourtPanelComponent;
  let fixture: ComponentFixture<CourtPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourtPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourtPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
