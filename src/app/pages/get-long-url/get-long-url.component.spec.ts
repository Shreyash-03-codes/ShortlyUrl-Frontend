import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLongUrlComponent } from './get-long-url.component';

describe('GetLongUrlComponent', () => {
  let component: GetLongUrlComponent;
  let fixture: ComponentFixture<GetLongUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetLongUrlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetLongUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
