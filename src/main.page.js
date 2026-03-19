export class MainPage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.getByRole("link", { name: " Login" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });

    this.globalTab = page.getByRole("button", { name: "Global Feed" });
    this.firstArticle = page.locator(".article-preview").first();
    this.articles = page.locator(".article-preview");

    this.pagination = page.locator(".pagination");
    this.secondPage = page.getByRole("button", { name: "Page 2" });
    this.currentPage = page.locator(".pagination .page-item.active a");
    this.rightArrow = page.getByRole("button", { name: "Next page" });
    this.leftArrow = page.getByRole("button", { name: "Previous page" });

    this.headingArticle = page.locator(".preview-link h1").first();
    this.descriptionArticle = page.locator(".preview-link p").first();
    this.goToArticleBtn = page.locator(".preview-link span").first();
    this.authorArticle = page.locator(".author").first();
    this.dateArticle = page.locator(".date").first();
    this.blockTags = page.locator(".preview-link .tag-list .tag-pill").first();
	  this.likesCountBtn = page.locator(".btn-outline-primary").first();
	  this.likesCount = page.locator(".btn-outline-primary .counter").first();
  }

  async openPage() {
    await this.page.goto("https://realworld.qa.guru/");
  }

  async paginationOperation() {
    await this.secondPage.click();
  }

  async goToNextPage() {
    await this.rightArrow.click();
  }

  async goToPreviousPage() {
    await this.leftArrow.click();
  }

  async goToArticle() {
    await this.goToArticleBtn.click();
  }

  async addLike() {
    await this.likesCountBtn.click();
  }

  async login(user) {
    const { email, password } = user;

    await this.loginLink.click();
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}