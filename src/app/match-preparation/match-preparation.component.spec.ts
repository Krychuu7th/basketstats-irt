import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPreparationComponent } from './match-preparation.component';

describe('MatchPreparationComponent', () => {
  let component: MatchPreparationComponent;
  let fixture: ComponentFixture<MatchPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchPreparationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
