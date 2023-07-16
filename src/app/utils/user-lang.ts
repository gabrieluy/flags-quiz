export const userLang = (): string => {
  let lang = navigator.languages ? navigator.languages[0] : null;
  lang = lang || navigator.language;

  let shortLang = lang;
  if (shortLang.indexOf('-') !== -1) shortLang = shortLang.split('-')[0];

  if (shortLang.indexOf('_') !== -1) shortLang = shortLang.split('_')[0];

  return shortLang;
};
