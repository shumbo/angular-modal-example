import { AngularModalExamplePage } from './app.po';

describe('angular-modal-example App', function() {
  let page: AngularModalExamplePage;

  beforeEach(() => {
    page = new AngularModalExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
