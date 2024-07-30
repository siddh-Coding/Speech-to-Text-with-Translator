// translator.js
import { AppError, handleApiCall } from './errorHandler.js';

export async function translateText(text, from, to) {
    let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new AppError('Translation service is unavailable. Please try again later.', 'API');
    }
    const data = await response.json();
    if (data.responseStatus !== 200) {
        throw new AppError('Unable to translate text. Please try again.', 'Translation');
    }
    return data.responseData.translatedText;
}

export function populateLanguageDropdowns(selectElements, languages) {
    selectElements.forEach((select, index) => {
        for (let [code, name] of Object.entries(languages)) {
            let option = document.createElement('option');
            option.value = code;
            option.textContent = name;
            if ((index === 0 && code === 'en-GB') || (index === 1 && code === 'hi-IN')) {
                option.selected = true;
            }
            select.appendChild(option);
        }
    });
}