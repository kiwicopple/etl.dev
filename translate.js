require('dotenv').config()
const fs = require('fs')
const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
  organization: process.env['OPENAI_ORG'],
})
const primaryLocale = 'en-US'
const primarySuffix = 'en-US.mdx'
const fileExtension = 'mdx'
const localeList = [
  { locale: 'en-US', text: '🇺🇸 English' },
  { locale: 'zh-CN', text: '🇨🇳 Chinese (Simplified)' },
  { locale: 'es-ES', text: '🇪🇸 Spanish' },
  { locale: 'hi-IN', text: '🇮🇳 Hindi' },
  { locale: 'ar-SA', text: '🇸🇦 Arabic' },
  { locale: 'bn-IN', text: '🇮🇳 Bengali' },
  { locale: 'pt-BR', text: '🇧🇷 Portuguese (Brazil)' },
  { locale: 'ru-RU', text: '🇷🇺 Russian' },
  { locale: 'ja-JP', text: '🇯🇵 Japanese' },
  { locale: 'de-DE', text: '🇩🇪 German' },
  { locale: 'jv-ID', text: '🇮🇩 Javanese' },
  { locale: 'ko-KR', text: '🇰🇷 Korean' },
  { locale: 'fr-FR', text: '🇫🇷 French' },
  { locale: 'tr-TR', text: '🇹🇷 Turkish' },
  { locale: 'vi-VN', text: '🇻🇳 Vietnamese' },
  { locale: 'ta-IN', text: '🇮🇳 Tamil' },
  { locale: 'ur-PK', text: '🇵🇰 Urdu' },
  { locale: 'fa-IR', text: '🇮🇷 Persian' },
  { locale: 'it-IT', text: '🇮🇹 Italian' },
  { locale: 'pl-PL', text: '🇵🇱 Polish' },
  { locale: 'uk-UA', text: '🇺🇦 Ukrainian' },
  { locale: 'ro-RO', text: '🇷🇴 Romanian' },
  { locale: 'nl-NL', text: '🇳🇱 Dutch' },
  { locale: 'id-ID', text: '🇮🇩 Indonesian' },
  { locale: 'th-TH', text: '🇹🇭 Thai' },
  { locale: 'el-GR', text: '🇬🇷 Greek' },
  { locale: 'hu-HU', text: '🇭🇺 Hungarian' },
  { locale: 'sv-SE', text: '🇸🇪 Swedish' },
  { locale: 'cs-CZ', text: '🇨🇿 Czech' },
  { locale: 'bg-BG', text: '🇧🇬 Bulgarian' },
]
const locales = localeList.map((locale) => locale.locale)
const files = fs.readdirSync('./pages')

// We translate and write the file at the same time so that translations are not held in memory
async function translateAndWriteFile(text, targetLanguage, fileName) {
  if (targetLanguage === primaryLocale) {
    console.log(`Skipping translation of ${targetLanguage}.`)
    return
  }
  console.log(`Starting translation of ${fileName} to ${targetLanguage}`)
  try {
    const params = {
      messages: [
        {
          role: 'user',
          content: `Translate the following English markdown to ${targetLanguage}. Do not change any of the markdown formatting:\n\n${text}.`,
        },
      ],
      model: 'gpt-3.5-turbo',
    }
    const chatCompletion = await openai.chat.completions.create(params)
    const translatedContent = chatCompletion.choices[0].message.content.trim()

    const newFileName = fileName.replace(
      primarySuffix,
      `${targetLanguage}.${fileExtension}`
    )
    fs.writeFileSync(`./pages/${newFileName}`, translatedContent)
    console.log(`Completed translation and wrote ${fileName} to ${newFileName}`)
  } catch (error) {
    console.error(
      `Error in translating and writing ${fileName} to ${targetLanguage}:`,
      error
    )
  }
}

;(async () => {
  console.log('Starting all translations...')
  const translationPromises = files
    .filter((file) => file.includes(primarySuffix))
    .flatMap((file) => {
      const content = fs.readFileSync(`./pages/${file}`, 'utf-8')
      return locales.map((locale) =>
        translateAndWriteFile(content, locale, file)
      )
    })

  await Promise.all(translationPromises)
  console.log(
    'All translations and file writings have been completed successfully.'
  )
})()
