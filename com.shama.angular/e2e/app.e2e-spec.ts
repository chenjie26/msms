import { Com.Shama.AngularPage } from './app.po';

describe('com.shama.angular App', () => {
  let page: Com.Shama.AngularPage;

  beforeEach(() => {
    page = new Com.Shama.AngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
