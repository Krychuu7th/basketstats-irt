import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamReorderComponent } from './team-reorder.component';

describe('TeamReorderComponent', () => {
  let component: TeamReorderComponent;
  let fixture: ComponentFixture<TeamReorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamReorderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
