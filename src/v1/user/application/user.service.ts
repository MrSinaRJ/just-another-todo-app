import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { USER_REPOSITORY, UserRepository } from '../domain/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async register(username: string, password: string): Promise<User> {
    const user = new User(undefined, username, password);
    return this.userRepository.save(user);
  }
}
