import { expect, test } from "../fixtures/custom-fixtures";
import { BuzzPostData } from "../interfaces";
import postData from "../test-data/create-buzz-post.json";
// const data:BuzzPostData = postData


test.describe("Create Buzz post @regression", () => {
    for (const [index, buzzPost] of postData.entries()) {
        test(`posts and validates data set ${index + 1}`, async ({ buzzPage }) => {
            const typedBuzzPost: BuzzPostData = buzzPost;
            const uniqueMessage = `${typedBuzzPost.message} ${Date.now()}`;

            await buzzPage.navigateToBuzz();
            await buzzPage.postMessage(uniqueMessage);
            await expect(buzzPage.postByMessage(uniqueMessage)).toHaveText(uniqueMessage);
        });
    }
});