export class UserProfilePage {
	constructor(page) {
    this.page = page;
		this.firstArticleLink = page.locator(".preview-link").first();
		this.firstArticleHeading = page.locator(".preview-link h1").first();
  }

	async openArticle() {
		await this.firstArticleLink.click();
	}
}