import { TodoItem } from './todo-item.entity';

export interface TodoItemRepository {
  save(todoItem: TodoItem): Promise<TodoItem>;
  findById(id: string): Promise<TodoItem | null>;
  findByTodoListId(todoListId: string): Promise<TodoItem[]>;
  delete(id: string): Promise<void>;
}

export const TODO_ITEM_REPOSITORY = Symbol('TodoItemRepository');
