import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoListService } from './application/todo-list.service';
import { TODO_LIST_REPOSITORY } from './domain/todo-list.repository';
import { TodoListRepositoryImpl } from './infrastructure/todo-list.repository.impl';
import { TodoList, TodoListSchema } from './infrastructure/todo-list.schema';
import { TodoListController } from './todo-list.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
    ]),
  ],
  providers: [
    TodoListService,
    { provide: TODO_LIST_REPOSITORY, useClass: TodoListRepositoryImpl },
  ],
  controllers: [TodoListController],
  exports: [TodoListService, TODO_LIST_REPOSITORY],
})
export class TodoListModule {}
