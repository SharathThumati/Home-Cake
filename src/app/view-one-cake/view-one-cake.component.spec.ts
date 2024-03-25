import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneCakeComponent } from './view-one-cake.component';

describe('ViewOneCakeComponent', () => {
  let component: ViewOneCakeComponent;
  let fixture: ComponentFixture<ViewOneCakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOneCakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOneCakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
