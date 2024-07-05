import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import { deleteTodo } from '../../businessLogic/todos.mjs'
import { getUserId, buildResponse } from '../utils.mjs'
import httpCors from '@middy/http-cors'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('DeleteTodo')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    httpCors({
      credentials: true
    })
  )
  .handler(async (event) => {
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    const updatedTodo = await deleteTodo(userId, todoId)
    logger.info('Todo deleted')

    return buildResponse(200, updatedTodo)
  })