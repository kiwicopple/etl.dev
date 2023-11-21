const fs = require("fs")
const path = require("path")

const locales = ["zh-CN"] // Add more locales here

const files = fs.readdirSync("./pages")

files.forEach((file) => {
  if (file.indexOf("en-US.mdx") === -1) {
    return
  }
  const content = fs.readFileSync(`./pages/${file}`, "utf-8")

  locales.forEach((locale) => {
    const newFileName = file.replace("en-US.mdx", `${locale}.mdx`)
    fs.writeFileSync(`./pages/${newFileName}`, "translatedContent")
  })
})
