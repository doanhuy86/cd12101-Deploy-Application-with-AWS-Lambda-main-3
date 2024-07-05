import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import { createTodo } from '../../businessLogic/todos.mjs'
import { getUserId, buildResponse } from '../utils.mjs'
import httpCors from '@middy/http-cors'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('CreateTodo')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    httpCors({
      credentials: true
    })
  )
  .handler(async (event) => {
    const newTodo = JSON.parse(event.body)
    const userId = getUserId(event)
    const item = await createTodo(userId, newTodo)
    logger.info('Todo created')

    return buildResponse(200, item)
  })