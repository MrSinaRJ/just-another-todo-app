import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoListModule } from '@todo-list/todo-list.module';
import { TodoItemService } from './application/todo-item.service';
import { TODO_ITEM_REPOSITORY } from './domain/todo-item.repository';
import { TodoItemRepositoryImpl } from './infrastructure/todo-item.repository.impl';
import { TodoItem, TodoItemSchema } from './infrastructure/todo-item.schema';
import { TodoItemController } from './todo-item.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoItem.name, schema: TodoItemSchema },
    ]),
    TodoListModule,
  ],
  providers: [
    TodoItemService,
    { provide: TODO_ITEM_REPOSITORY, useClass: TodoItemRepositoryImpl },
  ],
  controllers: [TodoItemController],
})
export class TodoItemModule {}
