import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionNoticeComponent } from './collection-notice.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CollectionNoticeComponent', () => {
  let component: CollectionNoticeComponent;
  let fixture: ComponentFixture<CollectionNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CollectionNoticeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
