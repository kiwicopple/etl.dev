require("dotenv").config() // Load environment variables from .env file
const fs = require("fs")
const OpenAI = require("openai")

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  organization: process.env["OPENAI_ORG"],
})

const locales = ["zh-CN"] // Add more locales here
const files = fs.readdirSync("./pages")

async function translateText(text, targetLanguage) {
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

    return chatCompletion.choices[0].message.content.trim()
  } catch (error) {
    console.error("Error in translation:", error)
    return ""
  }
}

;(async () => {
  for (let file of files) {
    if (file.indexOf("en-US.mdx") === -1) {
      continue
    }
    const content = fs.readFileSync(`./pages/${file}`, "utf-8")

    for (let locale of locales) {
      console.log("Translating: ", file)
      const translatedContent = await translateText(content, locale)
      const newFileName = file.replace("en-US.mdx", `${locale}.mdx`)
      fs.writeFileSync(`./pages/${newFileName}`, translatedContent)
    }
  }
})()
