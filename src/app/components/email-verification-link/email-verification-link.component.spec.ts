import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationLinkComponent } from './email-verification-link.component';

describe('EmailVerificationLinkComponent', () => {
  let component: EmailVerificationLinkComponent;
  let fixture: ComponentFixture<EmailVerificationLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVerificationLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerificationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
