import { TodoList } from './todo-list.entity';

export interface TodoListRepository {
  save(todoList: TodoList): Promise<TodoList>;
  findById(id: string): Promise<TodoList | null>;
  findByUserId(userId: string): Promise<TodoList[]>;
  delete(id: string): Promise<void>;
  findAndUpdate(todoList: TodoList): Promise<TodoList>;
}

export const TODO_LIST_REPOSITORY = Symbol('TodoListRepository');
