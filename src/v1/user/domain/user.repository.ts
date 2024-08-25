import { User } from './user.entity';

export interface UserRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}

// for reference usage
export const USER_REPOSITORY = Symbol('UserRepository');
