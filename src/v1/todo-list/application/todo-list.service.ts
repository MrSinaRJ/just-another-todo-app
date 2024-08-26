import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TodoList } from '../domain/todo-list.entity';
import {
  TODO_LIST_REPOSITORY,
  TodoListRepository,
} from '../domain/todo-list.repository';

@Injectable()
export class TodoListService {
  constructor(
    @Inject(TODO_LIST_REPOSITORY)
    private readonly todoListRepository: TodoListRepository,
  ) {}

  async create(userId: string, title: string): Promise<TodoList> {
    const todoList = new TodoList(randomUUID(), title, userId);
    return this.todoListRepository.save(todoList);
  }

  async update(
    userId: string,
    todoListId: string,
    title: string,
  ): Promise<TodoList> {
    const todoList = await this.todoListRepository.findById(todoListId);
    if (!todoList) {
      throw new NotFoundException();
    }
    if (todoList.userId !== userId) {
      throw new UnauthorizedException();
    }

    todoList.title = title;
    return this.todoListRepository.save(todoList);
  }

  async delete(userId: string, todoListId: string): Promise<void> {
    const todoList = await this.todoListRepository.findById(todoListId);
    if (!todoList || todoList.userId !== userId) {
      throw new UnauthorizedException();
    }

    await this.todoListRepository.delete(todoListId);
  }

  async findAllByUser(userId: string): Promise<TodoList[]> {
    return this.todoListRepository.findByUserId(userId);
  }
}
