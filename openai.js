import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import { Configuration, OpenAIApi } from "openai";
// const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export async function callOpenAI(productName) 
{

        const data =  await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Write product description for " +productName,
        temperature: 0.5,
        max_tokens: 400,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        })

        //console.log("OpenAI text ** " +  data.data.choices[0].text + "  ***  ")
        return cleanUp(data.data.choices[0].text)


}

// OpenAI returns empty lines on top of text, this will remove them
function cleanUp(input){
    return input.split(/\r?\n/) 
    .filter(line => line.trim() !== "") 
    .join("\n"); 
}

