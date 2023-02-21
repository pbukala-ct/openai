import 'dotenv/config'
import { callOpenAI } from './openai.js'
import { getProduct } from'./ct-product.js'
import { updateDescription } from'./ct-product.js'

export async function goOpenAI(productId) {
    let ctProductData = await  getProduct(productId);
     // console.log(ctProductData)


    let productVersion = ctProductData.version;
    let productName = ctProductData.masterData.staged.name.en;

    // Use product name to generate description
    let description =  await callOpenAI(productName);


    await updateDescription(productId,productVersion,description)
    
    console.log('Success in updating description with text: ' + description)
    return true
}

//test locally without Lambda
//goOpenAI('250bcde2-40af-4d75-b892-a87ce3c173ae');















