import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { User } from '../domain/user.entity';
import { USER_REPOSITORY, UserRepository } from '../domain/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = new User(randomUUID(), username, password);
    await user.setPassword(password);
    const savedUser = await this.userRepository.save(user);
    const payload = { username: savedUser.username, sub: savedUser._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await user.validatePassword(password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
