import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchProcessComponent } from './match-process.component';

describe('MatchProcessComponent', () => {
  let component: MatchProcessComponent;
  let fixture: ComponentFixture<MatchProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
