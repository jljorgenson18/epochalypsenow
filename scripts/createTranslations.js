const path = require('path');
const Promise = require('bluebird');
const fs = require('fs-extra');
const englishI18n = require('../translations/en.json');

// Creates a client

let credentials;
try {
  credentials = require('../.google_credentials.json');
} catch (err) {
  console.error('Credentials required at .google_credentials.json!');
  process.exit(1);
}

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(
  __dirname,
  '../.google_credentials.json'
);

const Translate = require('@google-cloud/translate');
const translate = new Translate({
  projectId: credentials.projectId
});

const getAllLanguages = () => {
  return translate.getLanguages();
};

const getTranslationsForLanguage = languageCode => {
  const newTranslations = {};
  return Promise.mapSeries(Object.keys(englishI18n), translateKey => {
    const text = englishI18n[translateKey];
    return translate
      .translate(text, {
        from: 'en',
        to: languageCode
      })
      .then(results => {
        newTranslations[translateKey] = results[0];
      });
  }).then(() => {
    console.log(newTranslations);
    return newTranslations;
  });
};

const setNewLanguageFile = (languageCode, newTranslations) => {
  return fs.outputJson(
    path.resolve(__dirname, `../translations/${languageCode}.json`),
    newTranslations,
    {
      spaces: '  '
    }
  );
};

const createNewTranslation = language => {
  // Already have it
  if (language.code === 'en') {
    return Promise.resolve();
  }
  return getTranslationsForLanguage(language.code).then(newTranslations => {
    return setNewLanguageFile(language.code, newTranslations);
  });
};

const createTranslations = () => {
  return getAllLanguages().then(results => {
    const languages = results[0];
    return Promise.mapSeries(languages, createNewTranslation);
  });
};

createTranslations();
