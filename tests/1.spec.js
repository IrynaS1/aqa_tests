import { test, expect } from "@playwright/test";
import { faker, fakerRU } from "@faker-js/faker";
import { MainPage } from "../src/main.page";
import { CreateNewArticlePage } from "../src/createNewArticle.page";
import { ArticlePage } from "../src/article.page";
import { UserProfilePage } from "../src/userprofile.page";

const testUser = {
  userName: "Test123",
  email: "test1234@ya.ru",
  password: "123456",
};

const testNewArticleData = {
  title: faker.lorem.words(5),
  description: faker.lorem.sentence({ min: 5, max: 7 }),
  content: faker.lorem.sentences(4),
  tags: "#lorem",
};

console.log(testNewArticleData.password);

test("1. Создание новой статьи авторизованным пользователем", async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  const createNewArticlePage = new CreateNewArticlePage(page);
  const articlePage = new ArticlePage(page);

  await mainPage.openPage();
  await mainPage.login(testUser);
  await mainPage.createNewArticle();

	const { title, description, content, tags } = testNewArticleData;
	
  await createNewArticlePage.fillArticleForm(title, description, content, tags);
  await createNewArticlePage.publishArticle();

  const actualTitle = await articlePage.articleHeading.textContent();
	
  await expect(actualTitle).toBe(title);
});

test("2. Редактирование существующей статьи авторизованным пользователем", async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  const userProfilePage = new UserProfilePage(page);
  const articlePage = new ArticlePage(page);
  const createNewArticlePage = new CreateNewArticlePage(page);

  await mainPage.openPage();
  await mainPage.login(testUser);
  await mainPage.openUserProfile();
  await userProfilePage.openArticle();

  const articleData = {
    title: await articlePage.articleHeading.textContent(),
    content: await articlePage.articleContent.textContent(),
  };

  await articlePage.editArticle();
  await createNewArticlePage.clearArticleData();

  const { title, description, content, tags } = testNewArticleData;

  await createNewArticlePage.fillArticleForm(title, description, content, tags);
  await createNewArticlePage.updateArticle();

  const editedTitle = await articlePage.articleHeading.textContent();
  const editedContent = await articlePage.articleContent.textContent();

  await expect(editedTitle).not.toContain(articleData.title);
  await expect(editedContent).not.toContain(articleData.content);
});

test("3. Удаление статьи авторизованным пользователем", async ({ page }) => {
  const mainPage = new MainPage(page);
  const userProfilePage = new UserProfilePage(page);
  const articlePage = new ArticlePage(page);

  await mainPage.openPage();
  await mainPage.login(testUser);
  await mainPage.openUserProfile();
  await userProfilePage.openArticle();

  const articleTitle = await articlePage.articleHeading.textContent();
  const dialogConfirm = page.waitForEvent("dialog");

  await articlePage.deleteArticle();

  const dialog = await dialogConfirm;

  await dialog.accept();
  await mainPage.openPage();
  await mainPage.openUserProfile();

  const articleTitleFirst =
    await userProfilePage.firstArticleHeading.textContent();

  await expect(articleTitleFirst).not.toContain(articleTitle);
});

test("4. Добавление комментария к статье авторизованным пользователем", async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  const userProfilePage = new UserProfilePage(page);
  const articlePage = new ArticlePage(page);

  await mainPage.openPage();
  await mainPage.login(testUser);
  await mainPage.openUserProfile();
  await userProfilePage.openArticle();

  const addCommentText = faker.lorem.sentences(1);

  await articlePage.postComment(addCommentText);

  const lastCommentTextBefore = await articlePage.lastCommentCard.textContent();
  const commentText = faker.lorem.sentences(1);

  await articlePage.postComment(commentText);

  const lastCommentTextAfter = await articlePage.lastCommentCard.textContent();

  await expect(articlePage.lastCommentCard).toBeVisible();
  await expect(lastCommentTextAfter).toBe(lastCommentTextBefore);
  await expect(articlePage.commentInput).toHaveValue("");
});

test("5. Удаление комментария авторизованным пользователем", async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  const userProfilePage = new UserProfilePage(page);
  const articlePage = new ArticlePage(page);

  await mainPage.openPage();
  await mainPage.login(testUser);
  await mainPage.openUserProfile();
  await userProfilePage.openArticle();

  const commentTextFirst = faker.lorem.sentences(1);

  await articlePage.postComment(commentTextFirst);

  const commentTextSecond = faker.lorem.sentences(1);

  await articlePage.postComment(commentTextSecond);

  const lastCommentText = await articlePage.lastCommentCard.textContent();

  await expect(lastCommentText).not.toBe(commentTextSecond);
});
