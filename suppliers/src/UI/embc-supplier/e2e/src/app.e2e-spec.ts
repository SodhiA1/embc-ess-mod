import { AppPage } from './app.po';
import { browser, logging, element, by, Key, ElementFinder } from 'protractor';

const submissionRoute = 'submission';
const reviewRoute = 'review';

by.addLocator('formControlName', function (value, opt_parentElement) {
  var using = opt_parentElement || document;

  return using.querySelectorAll('[formControlName="' + value + '"]');
});

describe('embc-supplier portal to submit invoice', () => {
   let page: AppPage;

   beforeEach(() => {
     page = new AppPage();
     
   });

   it('check navigation', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + submissionRoute);
   });

  it('should enter supplier details', () => {
    fillFormInput(element(by.formControlName('supplierLegalName')), 'LegalAutomatedTesting');
    fillFormInput(element(by.formControlName('supplierName')), 'Test Supplier Name');
    fillFormInput(element(by.formControlName('location')), 'Saanich');
    fillFormInput(element(by.formControlName('gstNumber')), '1234567891234');

    expect(element(by.formControlName('gstNumber')).getAttribute('value'))
      .toBe('123456789-RT-1234');
  });

  it('should enter supplier address', () => {
    fillFormInput(element(by.formControlName('address1')), 'Address Line 1');
    fillFormInput(element(by.formControlName('address2')), 'Address Line 2');

    checkForAutoComplete('city', 1, 'Vic');
    expect(element(by.formControlName('city')).getAttribute('value'))
    .toBe('Victoria');

    fillFormInput(element(by.formControlName('postalCode')), 'V8N1G1');
  })

  it('should enter contact person', () => {
    fillFormInput(element(by.formControlName('firstName')), 'Automated Name');
    fillFormInput(element(by.formControlName('lastName')), 'Automated LastName');
    fillFormInput(element(by.formControlName('email')), 'test@gmail.com');
    fillFormInput(element(by.formControlName('phone')), '7789225000');
    fillFormInput(element(by.formControlName('fax')), '77892251111');

    expect(element(by.formControlName('phone')).getAttribute('value'))
      .toBe('778-922-5000');
    expect(element(by.formControlName('fax')).getAttribute('value'))
      .toBe('778-922-5111');
  });

  it('should select invoice', () => {
    element(by.id('invoice')).click();
    expect(element(by.id('invoice')).getAttribute('value'))
      .toBe('invoice');
  });

  it('should enter invoice details', () => {
    
    fillFormInput(element(by.id('invoiceNumber')), '12345');
    fillFormInput(element(by.id('invoiceDate')), '05/16/2020');

    element(by.id('referralList')).click();
    element(by.cssContainingText('option', '1')).click();
    element(by.buttonText('Next')).click();
  });

  it('should enter referral details', () => {
    fillFormInput(element(by.id('referralNumber')), '77595');
   
    element(by.formControlName('supportProvided')).click();
    element(by.cssContainingText('option', 'Clothing')).click();

    fillFormInput(element(by.formControlName('description')), 'new clothes needed');
    fillFormInput(element(by.formControlName('gst')), '2.34');
    fillFormInput(element(by.formControlName('amount')), '56.99');
  });

  it('should add attachments', () => {
    attachFile();
  });

  it('navigate to the review page', () => {
    element(by.buttonText('I am Done! Next')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + reviewRoute);
    browser.waitForAngular();
  });

  it('verify data on review page', () => {
    expect(element(by.cssContainingText('.col-md-12', 'LegalAutomatedTesting'))).toBeTruthy();
    expect(element(by.cssContainingText('.col-md-12', 'Test Supplier Name'))).toBeTruthy();
    expect(element(by.cssContainingText('.col-md-12', 'Saanich'))).toBeTruthy();
    expect(element(by.cssContainingText('.col-md-12', '123456789-RT-1234'))).toBeTruthy();

    expect(element(by.cssContainingText('.col-md-12', 'Address Line 1'))).toBeTruthy();
    expect(element(by.cssContainingText('.col-md-12', 'Address Line 2'))).toBeTruthy();
    expect(element(by.cssContainingText('.col-md-12', 'Victoria'))).toBeTruthy();
    expect(element(by.cssContainingText('.col-md-12', 'V8N1G1'))).toBeTruthy();

    expect(element(by.cssContainingText('.col-md-12', 'Automated Name'))).toBeTruthy();
    expect(element(by.cssContainingText('.col-md-12', 'Automated LastName'))).toBeTruthy();
    expect(element(by.cssContainingText('.col-md-12', 'test@gmail.com'))).toBeTruthy();
    expect(element(by.cssContainingText('.col-md-12', '778-922-5000'))).toBeTruthy();
    expect(element(by.cssContainingText('.col-md-12', '778-922-5111'))).toBeTruthy();

    expect(element(by.cssContainingText('.col-md-12', 'Invoice# 12345'))).toBeTruthy();
    expect(element(by.cssContainingText('.col-md-12', '5/16/2020'))).toBeTruthy();

    expect(element(by.cssContainingText('.nestedHeader', 'Referral# 77595'))).toBeTruthy();

    expect(element.all(by.css('td')).first().getText()).toEqual('Clothing');
    expect(element.all(by.css('td')).get(1).getText()).toEqual('new clothes needed');
    expect(element.all(by.css('td')).get(2).getText()).toEqual('$2.34');
    expect(element.all(by.css('td')).get(3).getText()).toEqual('$56.99');

    //expect(element.all(by.css('.iconText')).count()).toEqual(3);
    browser.waitForAngular();
  });

  // it('submit data on review page', () => {
  //   browser.executeScript(
      
  //     'return window.document'
  //     //window.document.body.getO
  //     //Element(document.body).findElement('app-review')
  //     //('test-directive').controller('testDirective');
  // ).then(function (comp) {
  //     console.log(comp);
  //     browser.sleep(3000)
  // });  
  
  // });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});


async function fillFormInput(element: ElementFinder, text: string) {
  await element.click();
  await element.sendKeys(text);
  browser.waitForAngular();
}

async function checkForAutoComplete(cntrlName: string, count: number, searchTerm: string) {
  element(by.formControlName(cntrlName)).sendKeys(searchTerm).then(() => {
    expect(element.all(by.css('ngb-typeahead-window .dropdown-item')).count()).toEqual(count);
    element.all(by.css('ngb-typeahead-window .dropdown-item')).first().click();
  });
  browser.waitForAngular();
}

async function attachFile() {
  let filePath = '../src/imgs/essBackground.jpg';
  let abPath = require('path').resolve(__dirname, filePath) ;
  let fileLocator = element.all(by.id('fileDrop'));
  for(let i=0; i<(await fileLocator).length; i++) {
    fileLocator.get(i).sendKeys(abPath);
  }
}
