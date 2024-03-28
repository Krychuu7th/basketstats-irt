import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnCourtPlayersComponent } from './on-court-players.component';

describe('OnCourtPlayersComponent', () => {
  let component: OnCourtPlayersComponent;
  let fixture: ComponentFixture<OnCourtPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnCourtPlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnCourtPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
