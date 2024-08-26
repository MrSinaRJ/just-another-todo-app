import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  TODO_LIST_REPOSITORY,
  TodoListRepository,
} from '@todo-list/domain/todo-list.repository';
import { randomUUID } from 'crypto';
import { TodoItem } from '../domain/todo-item.entity';
import {
  TODO_ITEM_REPOSITORY,
  TodoItemRepository,
} from '../domain/todo-item.repository';

@Injectable()
export class TodoItemService {
  constructor(
    @Inject(TODO_ITEM_REPOSITORY)
    private readonly todoItemRepository: TodoItemRepository,
    @Inject(TODO_LIST_REPOSITORY)
    private readonly todoListRepository: TodoListRepository,
  ) {}

  async create(
    userId: string,
    todoListId: string,
    title: string,
    description: string,
    priority: number,
  ): Promise<TodoItem> {
    const todoList = await this.todoListRepository.findById(todoListId);
    if (!todoList) {
      throw new NotFoundException();
    }
    if (todoList.userId !== userId) {
      throw new UnauthorizedException();
    }

    const todoItem = new TodoItem(
      randomUUID(),
      title,
      description,
      priority,
      todoListId,
    );

    const savedItem = await this.todoItemRepository.save(todoItem);
    todoList.addTodoItem(savedItem._id);
    await this.todoListRepository.findAndUpdate(todoList);

    return savedItem;
  }

  async update(
    userId: string,
    todoItemId: string,
    title: string,
    description: string,
    priority: number,
  ): Promise<TodoItem> {
    const todoItem = await this.todoItemRepository.findById(todoItemId);
    if (!todoItem) {
      throw new NotFoundException('Todo item not found');
    }

    const todoList = await this.todoListRepository.findById(
      todoItem.todoListId,
    );
    if (!todoList || todoList.userId !== userId) {
      throw new UnauthorizedException();
    }

    todoItem.title = title;
    todoItem.description = description;
    todoItem.priority = priority;

    return this.todoItemRepository.save(todoItem);
  }

  async delete(userId: string, todoItemId: string): Promise<void> {
    const todoItem = await this.todoItemRepository.findById(todoItemId);
    if (!todoItem) {
      throw new NotFoundException('Todo item not found');
    }

    const todoList = await this.todoListRepository.findById(
      todoItem.todoListId,
    );
    if (!todoList || todoList.userId !== userId) {
      throw new UnauthorizedException();
    }

    todoList.removeTodoItem(todoItemId);
    await this.todoListRepository.save(todoList);
    await this.todoItemRepository.delete(todoItemId);
  }

  async findAndUpdate(todoList) {
    await this.todoListRepository.findAndUpdate(todoList);
  }
}
