import fr from './fr.json';
import en from './en.json';
import { createContext } from 'preact';
import { useState } from 'preact/hooks';

export const locales = [fr, en].reduce(
  (obj, locale) => ({...obj, [locale.language]: locale}),
  new Object()
);

const availableLanguages = Object.keys(locales);

export const getBrowserLanguage = () => {
  if (typeof window == 'undefined')
    return undefined;

	// https://phrase.com/blog/posts/detecting-a-users-locale/#Client-side_The_navigatorlanguages_Object
  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages;

  if (!browserLocales) {
    return undefined;
  }

	const compatibleLanguages =
    browserLocales
    .map(locale => {
      const trimmedLocale = locale.trim();

      return trimmedLocale.split(/-|_/)[0];
    })
    .filter((value, index, self) => availableLanguages.indexOf(value) != -1 && self.indexOf(value) === index);

  if (compatibleLanguages.length > 0)
    return compatibleLanguages[0];

  return undefined;
}

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getBrowserLanguage() || 'fr');

  return (
    <LanguageContext.Provider value={{language, setLanguage, translations: locales[language].messages}}>
      { children }
    </LanguageContext.Provider>
  )
}
