import { BioQuestionsPage } from './app.po';

describe('bio-questions App', function() {
  let page: BioQuestionsPage;

  beforeEach(() => {
    page = new BioQuestionsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
