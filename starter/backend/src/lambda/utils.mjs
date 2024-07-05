import { parseUserId } from '../auth/utils.mjs'

export function getUserId(event) {
  const authorization = event.headers.Authorization
  console.log("Value of Authorization:- " + authorization)
  const authorization2 = event.headers.authorization
  console.log("Value of Authorization:- " + authorization2)
  const split = authorization.split(' ')
  const jwtToken = split[1]
  
  return parseUserId(jwtToken)
}

export function buildResponse(statusCode, item) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: item
    })
  }
}