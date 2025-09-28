import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllUrlComponent } from './get-all-url.component';

describe('GetAllUrlComponent', () => {
  let component: GetAllUrlComponent;
  let fixture: ComponentFixture<GetAllUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllUrlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
