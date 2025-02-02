const { GoogleGenerativeAI } = require("@google/generative-ai")
require('dotenv').config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function createCoverLetter(name, company, role) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `My name is ${name}. I am applying for ${role} at ${company}. Write me a cover letter.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text();
    return text
}

module.exports = createCoverLetter