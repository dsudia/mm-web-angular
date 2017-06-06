import { MmWebAngularPage } from './app.po';

describe('mm-web-angular App', () => {
  let page: MmWebAngularPage;

  beforeEach(() => {
    page = new MmWebAngularPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
