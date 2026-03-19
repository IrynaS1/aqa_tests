
import { test, expect } from "@playwright/test";
import { MainPage } from "../src/main.page";
import { UserFeedsPage } from "../src/userprofile.page";
import { ArticlePage } from "../src/article.page";

const testUser = {
  userName: "Test123",
	email: "test1234@ya.ru",
	password: "123456"
};

test("1. Проверка отображения списка статей, опубликованных пользователями (вкладка Global Feed)", async ({
  page,
}) => {
  const openPage = new MainPage(page);

  await openPage.openPage();

  await expect(openPage.globalTab).toBeVisible({ timeout: 10000 });
  await expect(openPage.firstArticle).toBeVisible({ timeout: 10000 });
  await expect(openPage.articles).toHaveCount(3);
});

test("2. Проверка работы кнопок пагинации на странице со списком статей (вкладка Global Feed)", async ({
  page,
}) => {
  const openPage = new MainPage(page);

  await openPage.openPage();

  await expect(openPage.pagination).toBeVisible({ timeout: 10000 });
  await expect(openPage.secondPage).toBeVisible({ timeout: 10000 });

  await openPage.paginationOperation();
  await expect(openPage.globalTab).toBeVisible({ timeout: 10000 });
  await expect(openPage.firstArticle).toBeVisible({ timeout: 10000 });
	await expect(openPage.articles).toHaveCount(3);
	
	await openPage.goToNextPage();
	await expect(openPage.globalTab).toBeVisible({ timeout: 10000 });
   await expect(openPage.firstArticle).toBeVisible({ timeout: 10000 });
   await expect(openPage.articles).toHaveCount(3);
	await expect(openPage.currentPage).toHaveAttribute(
    "aria-label",
    "Page 3 is your current page",
  );

	await openPage.goToPreviousPage();
	await expect(openPage.globalTab).toBeVisible({ timeout: 10000 });
  await expect(openPage.firstArticle).toBeVisible({ timeout: 10000 });
  await expect(openPage.articles).toHaveCount(3);
  		await expect(openPage.currentPage).toHaveAttribute(
        "aria-label",
        "Page 2 is your current page",
      );
});

test("3. Проверка отображения элементов в карточке статьи - заголовок, описание, имя автора, дата, счётчик лайков, кнопка дл перехода на статью", async ({
  page,
}) => {
  const openPage = new MainPage(page);

  await openPage.openPage();

	await expect(openPage.globalTab).toBeVisible({ timeout: 10000 });
	await expect(openPage.firstArticle).toBeVisible({ timeout: 10000 });
	await expect(openPage.headingArticle).toBeVisible({ timeout: 10000 });	
	await expect(openPage.descriptionArticle).toBeVisible({ timeout: 10000 });	
	await expect(openPage.goToArticleBtn).toBeVisible({ timeout: 10000 });	
	await expect(openPage.authorArticle).toBeVisible({ timeout: 10000 });	
	await expect(openPage.dateArticle).toBeVisible({ timeout: 10000 });
	await expect(openPage.blockTags).toBeVisible({ timeout: 10000 });
	await expect(openPage.likesCountBtn).toBeVisible({ timeout: 10000 });
});

test("4. Проверка перехода к полной версии статьи кликом на карточку статьи", async ({
  page,
}) => {
	const openPage = new MainPage(page);
	const articlePage = new ArticlePage(page);

  await openPage.openPage();

  await expect(openPage.globalTab).toBeVisible({ timeout: 10000 });
  await expect(openPage.firstArticle).toBeVisible({ timeout: 10000 });

	await expect(openPage.goToArticleBtn).toBeVisible({ timeout: 10000 });
	
	let hArticle1 = await openPage.headingArticle.textContent();
	
	await openPage.goToArticle();

	
	let hArticle2 = await articlePage.articleHeading.textContent();

	await expect(hArticle2).toContain(hArticle1);
});

test("5. Клик на популярный тег в личном кабинете открывает новую вкладку со статьями, подобранными по тегу", async ({
  page,
}) => {
  const openPage = new MainPage(page);
  const newTab = new UserFeedsPage(page);

  await openPage.openPage();
	await openPage.login(testUser);
	
	await expect(newTab.firstTagPill).toBeVisible({ timeout: 10000 });

	let titleTag = await newTab.firstTagPill.textContent();
	titleTag = titleTag.trim();
	
	await newTab.openTab();

	await expect(newTab.activeTab).toBeVisible({ timeout: 10000 });

	let tabTitle = await newTab.activeTab.textContent();
	tabTitle = tabTitle.trim();
	await expect(titleTag).toContain(tabTitle);

	 await expect(newTab.globalTab).toBeVisible({ timeout: 10000 });
   await expect(newTab.firstArticle).toBeVisible({ timeout: 10000 });
	await expect(newTab.articles).toHaveCount(3);
	
	await expect(newTab.articleTag).toBeVisible({ timeout: 10000 });

	let articleTagTitle = await newTab.articleTag.textContent();
	articleTagTitle = articleTagTitle.trim();
	
	await expect(articleTagTitle).toContain(tabTitle);
});