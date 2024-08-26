import env from '@env';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './application/jwt.strategy';
import { UserService } from './application/user.service';
import { USER_REPOSITORY } from './domain/user.repository';
import { UserRepositoryImpl } from './infrastructure/user.repository.impl';
import { User, UserSchema } from './infrastructure/user.schema';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: env.SECRET,
      signOptions: { expiresIn: env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
    JwtStrategy,
  ],
})
export class UserModule {}
