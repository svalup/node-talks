import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@node-talks/api/core';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findOne (token: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ token })
  }

  async createUser (user: Partial<User>) {
    return await this.usersRepository.save(user)
  }
}
