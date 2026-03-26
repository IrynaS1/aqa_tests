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
    /* this.editArticleButton = page.locator('a:has-text("Edit Article")');
    this.deleteArticleButton = page.locator(
      'button:has-text("Delete Article")',
    );
    this.commentInput = page.locator(
      'textarea[placeholder="Write a comment..."]',
    );
    this.postCommentButton = page.locator('button:has-text("Post Comment")');
    this.lastComment = page.locator(".card-block p").last();
    this.lastCommentAuthor = page.locator(".card-footer a").last();
    this.commentsList = page.locator(".card-block");
  }

  async clickEditArticle() {
    await this.editArticleButton.click();
  }

  async clickDeleteArticle() {
    await this.deleteArticleButton.click();
  }

  async fillComment(commentText) {
    await this.commentInput.fill(commentText);
  }

  async postComment() {
    await this.postCommentButton.click();
  }

  async deleteLastComment() {
    const deleteButton = this.page.locator(".card-footer button").last();
    await deleteButton.click();
 
   */
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
