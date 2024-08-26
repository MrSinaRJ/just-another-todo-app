import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoList } from '@todo-list/domain/todo-list.entity';
import {
  TODO_LIST_REPOSITORY,
  TodoListRepository,
} from '@todo-list/domain/todo-list.repository';
import { TodoItem } from '../domain/todo-item.entity';
import {
  TODO_ITEM_REPOSITORY,
  TodoItemRepository,
} from '../domain/todo-item.repository';
import { TodoItemService } from './todo-item.service';

class MockTodoItemRepository implements TodoItemRepository {
  save = jest.fn();
  findById = jest.fn();
  delete = jest.fn();
  findByTodoListId = jest.fn();
}

class MockTodoListRepository implements TodoListRepository {
  findById = jest.fn();
  save = jest.fn();
  findByUserId = jest.fn();
  delete = jest.fn();
  findAndUpdate = jest.fn();
}

describe('TodoItemService', () => {
  let service: TodoItemService;
  let todoItemRepository: TodoItemRepository;
  let todoListRepository: TodoListRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoItemService,
        { provide: TODO_ITEM_REPOSITORY, useClass: MockTodoItemRepository },
        { provide: TODO_LIST_REPOSITORY, useClass: MockTodoListRepository },
      ],
    }).compile();

    service = module.get<TodoItemService>(TodoItemService);
    todoItemRepository = module.get<TodoItemRepository>(TODO_ITEM_REPOSITORY);
    todoListRepository = module.get<TodoListRepository>(TODO_LIST_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo item', async () => {
      const userId = 'testUserId';
      const todoListId = 'testTodoListId';
      const todoItemId = 'testTodoItemId';
      const todoList = new TodoList(todoListId, 'Test List', userId);
      const todoItem = new TodoItem(
        todoItemId,
        'Test Item',
        'Test Description',
        1,
        todoListId,
      );

      todoListRepository.findById = jest.fn().mockResolvedValue(todoList);
      todoItemRepository.save = jest.fn().mockResolvedValue(todoItem);
      todoListRepository.findAndUpdate = jest.fn().mockResolvedValue(todoList);

      const result = await service.create(
        userId,
        todoListId,
        'Test Item',
        'Test Description',
        1,
      );

      expect(todoItemRepository.save).toHaveBeenCalledWith(
        expect.any(TodoItem),
      );
      expect(todoListRepository.findAndUpdate).toHaveBeenCalledWith(
        expect.any(TodoList),
      );
      expect(result).toEqual(todoItem);
    });

    it('should throw UnauthorizedException if the todo list does not belong to the user', async () => {
      const userId = 'testUserId';
      const anotherUserId = 'anotherUserId';
      const todoListId = 'testTodoListId';
      const todoList = new TodoList(todoListId, 'Test List', anotherUserId);

      todoListRepository.findById = jest.fn().mockResolvedValue(todoList);

      await expect(
        service.create(userId, todoListId, 'Test Item', 'Test Description', 1),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if the todo list does not exist', async () => {
      const userId = 'testUserId';
      const todoListId = 'nonExistentTodoListId';

      todoListRepository.findById = jest.fn().mockResolvedValue(null);

      await expect(
        service.create(userId, todoListId, 'Test Item', 'Test Description', 1),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an existing todo item', async () => {
      const userId = 'testUserId';
      const todoListId = 'testTodoListId';
      const todoItemId = 'testTodoItemId';
      const todoList = new TodoList(todoListId, 'Test List', userId);
      const todoItem = new TodoItem(
        todoItemId,
        'Test Item',
        'Test Description',
        1,
        todoListId,
      );

      todoItemRepository.findById = jest.fn().mockResolvedValue(todoItem);
      todoListRepository.findById = jest.fn().mockResolvedValue(todoList);
      todoItemRepository.save = jest.fn().mockResolvedValue(todoItem);

      const result = await service.update(
        userId,
        todoItemId,
        'Updated Item',
        'Updated Description',
        2,
      );

      expect(todoItemRepository.findById).toHaveBeenCalledWith(todoItemId);
      expect(todoItemRepository.save).toHaveBeenCalledWith(
        expect.any(TodoItem),
      );
      expect(result).toEqual(todoItem);
    });

    it('should throw NotFoundException if the todo item does not exist', async () => {
      const userId = 'testUserId';
      const todoItemId = 'nonExistentId';

      todoItemRepository.findById = jest.fn().mockResolvedValue(null);

      await expect(
        service.update(
          userId,
          todoItemId,
          'Updated Item',
          'Updated Description',
          2,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if the todo item does not belong to the user', async () => {
      const userId = 'testUserId';
      const anotherUserId = 'anotherUserId';
      const todoListId = 'testTodoListId';
      const todoItemId = 'testTodoItemId';
      const todoList = new TodoList(todoListId, 'Test List', anotherUserId);
      const todoItem = new TodoItem(
        todoItemId,
        'Test Item',
        'Test Description',
        1,
        todoListId,
      );

      todoItemRepository.findById = jest.fn().mockResolvedValue(todoItem);
      todoListRepository.findById = jest.fn().mockResolvedValue(todoList);

      await expect(
        service.update(
          userId,
          todoItemId,
          'Updated Item',
          'Updated Description',
          2,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('delete', () => {
    it('should delete an existing todo item', async () => {
      const userId = 'testUserId';
      const todoListId = 'testTodoListId';
      const todoItemId = 'testTodoItemId';
      const todoList = new TodoList(todoListId, 'Test List', userId);
      const todoItem = new TodoItem(
        todoItemId,
        'Test Item',
        'Test Description',
        1,
        todoListId,
      );

      todoItemRepository.findById = jest.fn().mockResolvedValue(todoItem);
      todoListRepository.findById = jest.fn().mockResolvedValue(todoList);

      await service.delete(userId, todoItemId);

      expect(todoItemRepository.findById).toHaveBeenCalledWith(todoItemId);
      expect(todoItemRepository.delete).toHaveBeenCalledWith(todoItemId);
    });

    it('should throw NotFoundException if the todo item does not exist', async () => {
      const userId = 'testUserId';
      const todoItemId = 'nonExistentId';

      todoItemRepository.findById = jest.fn().mockResolvedValue(null);

      await expect(service.delete(userId, todoItemId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException if the todo item does not belong to the user', async () => {
      const userId = 'testUserId';
      const anotherUserId = 'anotherUserId';
      const todoListId = 'testTodoListId';
      const todoItemId = 'testTodoItemId';
      const todoList = new TodoList(todoListId, 'Test List', anotherUserId);
      const todoItem = new TodoItem(
        todoItemId,
        'Test Item',
        'Test Description',
        1,
        todoListId,
      );

      todoItemRepository.findById = jest.fn().mockResolvedValue(todoItem);
      todoListRepository.findById = jest.fn().mockResolvedValue(todoList);

      await expect(service.delete(userId, todoItemId)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
