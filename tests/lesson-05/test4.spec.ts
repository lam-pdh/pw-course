import { test } from "@playwright/test";

test("Personal Notes page", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/");
  await page.click('//*[@id="section-xpath"]/table/tbody/tr[4]/td[2]/a');

  const notes = Array.from({ length: 10 }, (_, i) => ({
    title: `Tiêu đề ${i + 1}`,
    body: `Tóm tắt note ${i + 1}\nDòng thứ hai\nDòng thứ ba`,
  }));

  for (const n of notes) {
    await page.fill('//*[@id="note-title"]', n.title);
    await page.fill('//*[@id="note-content"]', n.body);
    await page.click('//*[@id="add-note"]');
  }

  const pick = notes[4].title;
  await page.fill('//*[@id="search"]', pick);
});
