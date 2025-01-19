import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDonorsComponent } from './list-of-donors.component';

describe('ListOfDodnorsComponent', () => {
  let component: ListOfDonorsComponent;
  let fixture: ComponentFixture<ListOfDonorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOfDonorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfDonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
