import type { APIGatewayEvent } from 'aws-lambda'
import { db } from 'src/lib/db'

export const handler = async (event: APIGatewayEvent) => {

  try {
    const body = JSON.parse(event.body)
    const new_title = body.title
    const new_content = body.content

    // create article
    const article = await db.post.create({
      data: { 
        title: new_title,
        body: new_content,
      },
    })

    return {
      statusCode: 200, // Success!!!
      body: JSON.stringify({
        article,
        message: `Article ${article.title} created successfully`,
      }),
    }
  } catch (error) {
    return {
      statusCode: 500, // An error
      body: JSON.stringify({
        error: error.message,
        message: `Unable to create article`,
      }),
    }
  }
}