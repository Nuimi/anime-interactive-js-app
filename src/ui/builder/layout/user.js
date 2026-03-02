import { createDiv } from "../components/div.js";
import { createIcon } from "../components/icon.js";

export function createUserIcon()
{
    const icon = createIcon( 'fa fa-user');
    return createDiv('profile-icon', [icon]);
}