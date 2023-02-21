const openAIcategoryID = "bd5424d1-2bd3-4519-922c-e3cc54181aef"
const messageType = "ProductPublished"

import { goOpenAI } from './app.js'

export const handler = async (event) => {

let body = JSON.parse(event.Records[0].body)
let productID = body.resource.id;

 
 if(body.type === messageType) {
     console.log("product was published")
     
    // check if belongs to OpenAI category
    let isOpenAI = false;
    for (let category of body.productProjection.categories) {
       if(category.id === openAIcategoryID){
           isOpenAI = true;
           console.log("product is in OpenAI category")
       }
    }
    
    if(isOpenAI){
        await goOpenAI(productID)
    } else{
     return{}
    }
 }
    
};
