import * as uuid from 'uuid';
import { TodosAccess } from "../dataLayer/todosAccess.mjs";
import { createLogger } from '../utils/logger.mjs';

const logger = createLogger("TodosBusinessLogic");
const todosAccess = new TodosAccess();

// Get todos
export async function getTodos(userId) {
  try {
    logger.info("Getting todos for user:", { userId });
    logger.info(userId);
    logger.info("Parse user id in todos.mjs");
    return await todosAccess.getAll(userId);
  } catch (error) {
    logger.error("Error getting todos:", { userId, error });
    throw error;
  }
}

// Update a todo
export async function updateTodo(userId, todoId, updateToDoRequest) {
  try {
    logger.info("Updating todo:", { userId, todoId });
    return await todosAccess.updateTodo(userId, todoId, updateToDoRequest);
  } catch (error) {
    logger.error("Error updating todo:", { userId, todoId, error });
    throw error;
  }
}

// Update an attachment's presigned URL
export async function updateAttachmentPresignedUrl(userId, todoId) {
  try {
    logger.info("Updating attachment presigned URL:", { userId, todoId });
    return await todosAccess.updateAttachmentPresignedUrl(userId, todoId);
  } catch (error) {
    logger.error("Error updating attachment presigned URL:", { userId, todoId, error });
    throw error;
  }
}

// Create a new todo
export async function createTodo(userId, createTodoRequest) {
  try {
    logger.info("Creating new todo for user:", { userId });

    const todoId = uuid.v4();
    const createdAt = new Date().toISOString();

    const todoItem = {
      todoId: todoId,
      userId: userId,
      createdAt,
      done: false,
      attachmentUrl: null,
      name: createTodoRequest.name,
      dueDate: createTodoRequest.dueDate
    };

    return await todosAccess.createTodo(todoItem);
  } catch (error) {
    logger.error("Error creating todo:", { userId, error });
    throw error;
  }
}

// Delete a todo
export async function deleteTodo(userId, todoId) {
  try {
    logger.info("Deleting todo:", { userId, todoId });
    return await todosAccess.deteteTodo(userId, todoId);
  } catch (error) {
    logger.error("Error deleting todo:", { userId, todoId, error });
    throw error;
  }
}