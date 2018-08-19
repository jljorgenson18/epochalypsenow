const AWS = require('aws-sdk');
const path = require('path');
const Promise = require('bluebird');
const fs = require('fs-extra');

let credentials;
try {
  credentials = require('../.aws_credentials.json');
} catch (err) {
  console.error('Credentials required at .aws_credentials.json!');
  process.exit(1);
}

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.Credentials(
    credentials.accessKeyId,
    credentials.secretAccessKey
  )
});

const translatableLanguages = [
  'ar', // Arabic
  'zh', // Chinese (Simplified),
  'fr', // French,
  'de', // German,
  'pt', // Portuguese,
  'es' // Spanish
];

const englishI18n = require('../src/i18n/en.json');
const translate = new AWS.Translate();

const getTranslationsForLanguage = languageCode => {
  const newTranslations = {};
  return Promise.mapSeries(Object.keys(englishI18n), translateKey => {
    const text = englishI18n[translateKey];
    return translate
      .translateText({
        SourceLanguageCode: 'en',
        TargetLanguageCode: languageCode,
        Text: text
      })
      .promise()
      .then(response => {
        newTranslations[translateKey] = response.TranslatedText;
      });
  }).then(() => {
    console.log(newTranslations);
    return newTranslations;
  });
};

const setNewLanguageFile = (languageCode, newTranslations) => {
  return fs.outputJson(
    path.resolve(__dirname, `../src/i18n/${languageCode}.json`),
    newTranslations
  );
};

const createNewTranslation = languageCode => {
  return getTranslationsForLanguage(languageCode).then(newTranslations => {
    return setNewLanguageFile(languageCode, newTranslations);
  });
};

const createTranslations = () => {
  return Promise.mapSeries(translatableLanguages, createNewTranslation);
};

createTranslations();
