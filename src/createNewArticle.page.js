export class CreateNewArticlePage {
	constructor(page) {
	  this.page = page;
	  this.titleInput = page.getByRole("textbox", { name: "Article Title" });
	  this.descriptionInput = page.getByRole("textbox", {
      name: "What's this article about?",
	  });
	    this.contentInput = page.getByRole("textbox", {
        name: "Write your article (in markdown)",
      });
	   this.tagsInput = page.getByRole("textbox", {
       name: "Enter tags",
		}); 
	  this.publishButton = page.getByRole("button", {
      name: "Publish Article",
	  }); 
		  this.updateButton = page.getByRole("button", {
        name: "Update Article",
      });
  }

  async fillArticleForm(title, description, content, tags) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
	  await this.contentInput.fill(content);
	  await this.tagsInput.fill(tags);
  }

  async publishArticle() {
    await this.publishButton.click();
	}
	
	async clearArticleData() {
	await this.titleInput.clear();
    await this.descriptionInput.clear();
    await this.contentInput.clear();
    await this.tagsInput.clear();
	}

	async updateArticle() {
		this.updateButton.click();
	}
}
