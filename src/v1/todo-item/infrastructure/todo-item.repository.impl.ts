import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem } from '../domain/todo-item.entity';
import { TodoItemRepository } from '../domain/todo-item.repository';
import { TodoItemDocument } from './todo-item.schema';

@Injectable()
export class TodoItemRepositoryImpl implements TodoItemRepository {
  constructor(
    @InjectModel(TodoItem.name) private todoItemModel: Model<TodoItemDocument>,
  ) {}

  async save(todoItem: TodoItem): Promise<TodoItem> {
    const todoItemDoc = new this.todoItemModel(todoItem);
    const result = await todoItemDoc.save();
    return new TodoItem(
      result._id,
      result.title,
      result.description,
      result.priority,
      result.todoListId,
    );
  }

  async findById(id: string): Promise<TodoItem | null> {
    const result = await this.todoItemModel.findById(id).exec();
    if (!result) return null;
    return new TodoItem(
      result._id,
      result.title,
      result.description,
      result.priority,
      result.todoListId,
    );
  }

  async findByTodoListId(todoListId: string): Promise<TodoItem[]> {
    const results = await this.todoItemModel.find({ todoListId }).exec();
    return results.map(
      (result) =>
        new TodoItem(
          result._id,
          result.title,
          result.description,
          result.priority,
          result.todoListId,
        ),
    );
  }

  async delete(id: string): Promise<void> {
    await this.todoItemModel.findByIdAndDelete(id).exec();
  }
}
