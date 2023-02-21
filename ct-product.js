import 'dotenv/config'
import { client } from "./ct-client.js";
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'


const projectKey = process.env.CTP_PROJECT_KEY

const apiRoot = createApiBuilderFromCtpClient(client)



export async function getProduct(productId) {
    try {
      const product = await apiRoot
        .withProjectKey({projectKey})
          .products()
          .withId({ ID: productId })
          .get({queryArgs: { staged: true} })
          .execute()
      return product.body
    } catch (err) {
      if (err.statusCode === 404) {
          return null
      }
      throw err
    }
  }


  export async function updateDescription(productId,version,description) {
  
    try {
      let body = await apiRoot.withProjectKey({projectKey: projectKey})
      .products()
      .withId({ ID: productId })
      .post(
        {
          body: {
            version: version,
            actions: [
              {
                action: 'setDescription',
                description: {
                  'en': description
                },
              }
            ],
          },
        })
      .execute();
      return body
    } catch (err) {
      console.log(err)
      if (err.statusCode === 404) return null
      throw err
    }
  };
