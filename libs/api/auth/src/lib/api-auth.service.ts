import { Injectable } from '@nestjs/common';
import { User } from '@node-talks/api/core';
import { UsersService } from '../users/users.service';

@Injectable()
export class ApiAuthService {
  constructor (private usersService: UsersService) {}

  async findOrCreateUser (profile: Partial<User>): Promise<User> {
    const { token } = profile
    let user = await this.usersService.findOne(token)
    if (!user) {
      user = await this.usersService.createUser(profile)
    }
    return user
  }

  async getUser(uuid: string) {
    return await this.usersService.findOne(uuid)
  }

  retrieveUserData (user: User) {
    return { token: user.token, username: user.username }
  }
}
