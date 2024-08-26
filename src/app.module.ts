import env from '@env';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItemModule } from '@todo-item/todo-item.module';
import { TodoListModule } from '@todo-list/todo-list.module';
import { UserModule } from '@user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${env.MONGODB_DB_USER}:${env.MONGODB_DB_PASS}@${env.MONGODB_HOST}`,
      {
        dbName: env.MONGODB_DB_NAME,
      },
    ),
    UserModule,
    TodoListModule,
    TodoItemModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
