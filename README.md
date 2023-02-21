# openai
commercetools &amp; openAI integration for generating product description


Basic integration between commercetools and openAI API to generat produc description.

Required:

AWS SQS
AWS Lambda with SQS queue trigger

commercetools subscription for product type.
commercetools category "openAI" 


How does it work?

Lambda will pick up product updates and check if the the message was product published.
Next, will get the productId from message and call commercetools for product version and name[en].

Call to openAI to generate  description based on name and update the product with commercetools apis.



