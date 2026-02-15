import { createTitle } from "../components/title.js";
import { createText } from "../components/text.js";
import { createDiv } from "../components/div.js";
import { createArticle } from "../components/article.js";

export function createCard({ title, description, description2, button})
{
    const titleElement = createTitle(2, title);
    const textElement1 = createText( description);
    const textElement2 = createText( description2);

    const cardTitle = createDiv('card__title', [titleElement]);
    const cardText = createDiv('card__text', [textElement1, textElement2]);

    return createArticle( "card" , [cardTitle, cardText, button]  );
}