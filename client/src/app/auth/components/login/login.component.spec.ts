import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let debugEl: DebugElement;
  let component: LoginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should properly img logo', () => {
    const imgLogin = debugEl.query(By.css('[img-testing="logo"]'));
    expect(imgLogin.attributes['src']).toEqual(
      '../../../../assets/images/icons/beed.png'
    );
  });
  it('should properly lable input', () => {
    const labelLogin = debugEl.query(
      By.css('[data-testing="login-text"]')
    ).nativeElement;
    expect(labelLogin.innerText).toBe('login');
  });
  it('should create the form with username and password controls', () => {
    let actualForm = component.form.value;
    expect(actualForm).toEqual({
      username: '',
      password: '',
    });
  });
  it('should validate username as required and email format', () => {
    const usernameControl = component.form.get('username');
    usernameControl?.setValue('invalie-email');

    expect(usernameControl?.valid).toBeFalsy();
    expect(usernameControl?.hasError('required')).toBeFalsy();
    expect(usernameControl?.hasError('email')).toBeTruthy();
  });
  it('should validate password as required', () => {
    const passwordControl = component.form.get('password');

    expect(passwordControl?.valid).toBeFalsy();
    expect(passwordControl?.hasError('required')).toBeTruthy();
    expect(passwordControl?.hasError('password')).toBeFalsy();
  });
  describe('submitButton', () => {
    it('should disable the button when form is invalid', () => {
      const buttonElement = debugEl.query(
        By.css('[data-testid="login-button"]')
      ).nativeElement;
      expect(buttonElement.disabled).toBe(true);
      fixture.detectChanges();
    });
  });
});
