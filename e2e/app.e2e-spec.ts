import { StoreUIPage } from './app.po';

describe('store-ui App', () => {
  let page: StoreUIPage;

  beforeEach(() => {
    page = new StoreUIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
