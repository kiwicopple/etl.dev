require("dotenv").config()
const fs = require("fs")
const OpenAI = require("openai")

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  organization: process.env["OPENAI_ORG"],
})

const locales = ["zh-CN"] // Add more locales here
const files = fs.readdirSync("./pages")

async function translateText(text, targetLanguage, fileName) {
  console.log(`Starting translation of ${fileName} to ${targetLanguage}`)
  try {
    const params = {
      messages: [
        {
          role: "user",
          content: `Translate the following English markdown to ${targetLanguage}. Do not change any of the markdown formatting:\n\n${text}.`,
        },
      ],
      model: "gpt-3.5-turbo",
    }
    const chatCompletion = await openai.chat.completions.create(params)

    console.log(`Completed translation of ${fileName} to ${targetLanguage}`)
    return chatCompletion.choices[0].message.content.trim()
  } catch (error) {
    console.error(
      `Error in translating ${fileName} to ${targetLanguage}:`,
      error
    )
    return ""
  }
}

;(async () => {
  const translationPromises = []

  files.forEach((file) => {
    if (file.indexOf("en-US.mdx") === -1) {
      return
    }

    const content = fs.readFileSync(`./pages/${file}`, "utf-8")

    locales.forEach((locale) => {
      translationPromises.push({
        file,
        locale,
        promise: translateText(content, locale, file),
      })
    })
  })

  console.log("Starting all translations...")
  const results = await Promise.all(translationPromises.map((p) => p.promise))
  console.log("All translations completed. Writing to files...")

  results.forEach((translatedContent, index) => {
    const { file, locale } = translationPromises[index]
    const newFileName = file.replace("en-US.mdx", `${locale}.mdx`)
    console.log(`Writing translated content of ${file} to ${newFileName}`)
    fs.writeFileSync(`./pages/${newFileName}`, translatedContent)
  })

  console.log("All files have been written successfully.")
})()
