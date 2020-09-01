import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SupplierHttpService } from './service/supplierHttp.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import { SupplierSubmissionComponent } from './supplierSubmission/supplierSubmission.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  let supplierService: SupplierHttpService;
  beforeEach(async(() => {
    // routerStub = {
    //   navigate: jasmine.createSpy('navigate'),
    // };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'submission', component: SupplierSubmissionComponent }
        ]),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutModule
      ],
      declarations: [
        AppComponent,
        SupplierSubmissionComponent
      ],
      providers: [SupplierHttpService,
        //{provide: Router, useValue: routerStub }
      ]
    }).compileComponents().then(() => {
      supplierService = TestBed.inject(SupplierHttpService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should be created`, () => {
    expect(supplierService).toBeTruthy();
  });

  it('should have getListOfCities function', () => {
    expect(supplierService.getListOfCities).toBeTruthy();
  });

  it('should have getListOfProvinces function', () => {
    expect(supplierService.getListOfProvinces).toBeTruthy();
  });

  it('should have getListOfStates function', () => {
    expect(supplierService.getListOfStates).toBeTruthy();
  });

  it('should have getListOfCountries function', () => {
    expect(supplierService.getListOfCountries).toBeTruthy();
  });

  it('should have getListOfSupportItems function', () => {
    expect(supplierService.getListOfSupportItems).toBeTruthy();
  });

  it('should go to submission path',
    async(inject([Router, Location], (router: Router, location: Location) => {
      let fixture = TestBed.createComponent(SupplierSubmissionComponent);
      fixture.detectChanges();
      router.navigate(['/submission']).then(() => {
        expect(location.path()).toBe('/submission')
      });

    })));
});
