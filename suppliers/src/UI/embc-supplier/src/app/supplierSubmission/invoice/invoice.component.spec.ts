import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InvoiceComponent } from './invoice.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapterService } from 'src/app/service/customDateAdapter.service';
import { DateParserService } from 'src/app/service/dateParser.service';
import { CoreModule } from '../../core/core.module'
import { CustomValidationService } from 'src/app/service/customValidation.service';

class MockInvoiceForm {

}

describe('InvoiceComponent', () => {
    let fixture: ComponentFixture<InvoiceComponent>;
    let component: InvoiceComponent;
    let de: DebugElement;
    let el: HTMLElement;
    let builder: FormBuilder;
    let expectedInvoiceForm: FormGroup;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                NgbModule,
                CoreModule
            ],
            declarations: [
                InvoiceComponent
            ],
            providers: [
                CustomValidationService
                //{ provide: NgbDateAdapter, useClass: CustomDateAdapterService },
                //{ provide: NgbDateParserFormatter, useClass: DateParserService },
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(InvoiceComponent);
            component = fixture.componentInstance;
            de = fixture.debugElement.query(By.css('form'));
            el = de.nativeElement;

            builder = TestBed.inject(FormBuilder);
            expectedInvoiceForm = builder.group({
                invoiceNumber: ['', [Validators.required]],
                invoiceDate: [null, [Validators.required]],
                invoiceAttachments: builder.array([], [Validators.required]),
                referralList: ['', Validators.required],
                referrals: builder.array([
                ], Validators.required),
                invoiceTotalGst: [''],
                invoiceTotalAmount: ['']
            });
            component.invoiceForm = expectedInvoiceForm;
        });
    }));

    it('should create the invoice component', () => {
        expect(component).toBeTruthy();
    });

    it('invoice form should be valid', async(() => {
        console.log(component)
        // component.supplierForm.get('supplierLegalName').setValue('LegalAutomatedTesting');
        // component.supplierForm.get('gstNumber').setValue('1234567891234');
        // component.supplierForm.get('address.address1').setValue('Address Line 1');
        // component.supplierForm.get('address.city').setValue('Victoria');
        // component.supplierForm.get('address.postalCode').setValue('V8N1G1');
        // component.supplierForm.get('contactPerson.firstName').setValue('Automated Name');
        // component.supplierForm.get('contactPerson.lastName').setValue('Automated LastName');
        // component.supplierForm.get('contactPerson.email').setValue('test@gmail.com');
        // component.supplierForm.get('contactPerson.phone').setValue('7789225000');
        // component.supplierForm.get('supplierSubmissionType').setValue('invoice');
        expect(component).toBeTruthy();
    }));

});
