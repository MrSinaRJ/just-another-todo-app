import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './application/user.service';
import { USER_REPOSITORY } from './domain/user.repository';
import { UserRepositoryImpl } from './infrastructure/user.repository.impl';
import { User, UserSchema } from './infrastructure/user.schema';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
  ],
})
export class UserModule {}
