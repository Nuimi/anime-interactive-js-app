import { createDiv } from "../components/div.js";
import { createIcon } from "../components/icon.js";

export function createSuccessNotification({ message })
{
    const icon = createIcon( 'start-icon  fa fa-info-circle');
    return createDiv('alert alert-simple alert-info', [icon, message]);
}

export function createDangerNotification({ message})
{
    let icon = createIcon('start-icon far fa-times-circle');
    return createDiv('alert alert-simple alert-danger', [icon, message]);
}