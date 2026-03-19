export class ArticlePage {
  constructor(page) {
    this.page = page;
   this.articleHeading = page.getByRole("heading", { level: 1 });
  }
}
