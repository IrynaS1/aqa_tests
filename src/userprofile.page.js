export class UserFeedsPage {
	constructor(page) {
    this.page = page;
    this.firstTagPill = page.locator(".tag-pill").first();
	this.activeTab = page.locator(".nav-pills .nav-item .nav-link.active");
		
	this.globalTab = page.getByRole("button", { name: "Global Feed" });
     this.firstArticle = page.locator(".article-preview").first();
		this.articles = page.locator(".article-preview");
		
		this.articleTag = page
      .locator(
        ".article-preview .preview-link .tag-list .tag-default.tag-pill.tag-outline",
      )
      .first();
  }

	async openTab() {
		await this.firstTagPill.click();
	}
}