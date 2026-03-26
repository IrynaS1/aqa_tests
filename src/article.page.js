export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleHeading = page.locator(".banner .container h1");
    this.articleContent = page.locator(".article-content .col-md-12 p");
    this.articleTags = page.locator(
      ".article-content .col-md-12 .tag-list .tag-pill",
    );

    this.editArticleButton = page
      .getByRole("button", {
        name: "Edit Article",
      })
      .first();
    this.deleteArticleButton = page
      .getByRole("button", {
        name: "Delete Article",
      })
      .first();

    this.commentInput = page.getByRole("textbox", {
      name: "Write a comment...",
    });
    this.postCommentButton = page.getByRole("button", {
      name: "Post Comment",
    });
    this.lastCommentCard = page.locator(".card-text").last();
    this.firstCommentCard = page.locator(".card-text").first();
    this.deleteCommentButton = page.locator(".card .card-block button").first();
  }

  async editArticle() {
    this.editArticleButton.click();
  }

  async deleteArticle() {
    this.deleteArticleButton.click();
  }

  async postComment(commentText) {
    await this.commentInput.fill(commentText);
    await this.postCommentButton.click();
  }

  async deleteComment() {
    await this.deleteCommentButton.click();
  }
}
