import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TodoList } from '@todo-list/domain/todo-list.entity';
import { Model } from 'mongoose';
import { TodoListRepository } from '../domain/todo-list.repository';
import { TodoListDocument } from './todo-list.schema';

@Injectable()
export class TodoListRepositoryImpl implements TodoListRepository {
  constructor(
    @InjectModel(TodoList.name) private todoListModel: Model<TodoListDocument>,
  ) {}

  async save(todoList: TodoList): Promise<TodoList> {
    const todoListDoc = new this.todoListModel(todoList);
    const result = await todoListDoc.save();
    return new TodoList(
      result.id,
      result.title,
      result.userId,
      result.todoItems,
    );
  }

  async findById(id: string): Promise<TodoList | null> {
    const result = await this.todoListModel
      .findById(id)
      .populate('todoItems')
      .exec();
    if (!result) return null;
    return new TodoList(
      result.id,
      result.title,
      result.userId,
      result.todoItems,
    );
  }

  async findByUserId(userId: string): Promise<TodoList[]> {
    const results = await this.todoListModel
      .find({ userId })
      .populate('todoItems')
      .exec();
    return results.map(
      (result) =>
        new TodoList(result.id, result.title, result.userId, result.todoItems),
    );
  }

  async delete(id: string): Promise<void> {
    await this.todoListModel.findByIdAndDelete(id).exec();
  }

  async findAndUpdate(todoList: TodoList): Promise<TodoList | null> {
    const result = await this.todoListModel.findById(todoList._id).exec();
    if (!result) return null;
    await this.todoListModel.findByIdAndUpdate(todoList._id, todoList).exec();
    const updatedResult = await this.todoListModel
      .findById(todoList._id)
      .populate('todoItems')
      .exec();
    return new TodoList(
      updatedResult._id,
      updatedResult.title,
      updatedResult.userId,
      updatedResult.todoItems,
    );
  }
}
