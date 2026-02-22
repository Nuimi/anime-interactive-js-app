import { createButton } from "../builder/components/button.js";

export function canGoBack(canBackToList, onBackToList)
{
    if (canBackToList && onBackToList)
    {
        const btn = createButton('button--success', 'Back to list');
        btn.addEventListener('click', onBackToList);
        return btn;
    }
}

export function addActionButton(action, text, classes)
{
    const btn = createButton(classes, text);
    btn.addEventListener('click', action);
    return btn;
}

export function addButton(canCondition, onCondition, action, text, classes)
{
    if (canCondition && onCondition)
    {
        const btn = createButton(classes, text);
        btn.addEventListener('click', action);
        return btn;
    }
    return '';
}
export function submitButton(text, action)
{
    const btn = createButton('button--primary', text);
    btn.addEventListener('click', action);
    return btn;
}