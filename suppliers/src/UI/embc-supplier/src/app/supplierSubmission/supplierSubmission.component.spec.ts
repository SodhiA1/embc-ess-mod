import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierSubmissionComponent } from './supplierSubmission.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('SubmissionComponent', () => {
  let fixture: ComponentFixture<SupplierSubmissionComponent>;
  let component: SupplierSubmissionComponent;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        NgbModule
      ],
      declarations: [
        SupplierSubmissionComponent
      ],
      providers: []
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SupplierSubmissionComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));

  it('should create the submission component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid', async(() => {
    component.supplierForm.get('supplierLegalName').setValue('LegalAutomatedTesting');
    component.supplierForm.get('gstNumber').setValue('1234567891234');
    component.supplierForm.get('address.address1').setValue('Address Line 1');
    component.supplierForm.get('address.city').setValue('Victoria');
    component.supplierForm.get('address.postalCode').setValue('V8N1G1');
    component.supplierForm.get('contactPerson.firstName').setValue('Automated Name');
    component.supplierForm.get('contactPerson.lastName').setValue('Automated LastName');
    component.supplierForm.get('contactPerson.email').setValue('test@gmail.com');
    component.supplierForm.get('contactPerson.phone').setValue('7789225000');
    expect(component).toBeTruthy();
  }));

  it('should be able to create invoice', () => {
    spyOn(component, 'onValueChange').and.callThrough();
    let opts: DebugElement[] = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
    let inv = opts[0].triggerEventHandler('change', { target: opts[0].nativeElement});
    expect(component.onValueChange).toHaveBeenCalled();
    console.log(component)
  })

  it('invoice array length should be 1', () => {
    spyOn(component, 'onValueChange').and.callThrough();
    let opts: DebugElement[] = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
    let inv = opts[0].triggerEventHandler('change', { target: opts[0].nativeElement});
    expect(component.invoices.length).toBe(1);
  })

});
