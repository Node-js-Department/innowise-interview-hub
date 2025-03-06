import { Inject, Injectable } from '@nestjs/common';
import { NEO4J_TOKEN } from 'src/database/neode.provider';
import { EEntities } from 'src/database/model';
import Neode from 'neode';

import { BaseNeodeService } from '../database/neode.service';
import { TUser } from '../database/schemas/user.schema';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

@Injectable()
export class UserService
  extends BaseNeodeService<TUser, CreateUserDTO, UpdateUserDTO> {

  constructor(@Inject(NEO4J_TOKEN) neode: Neode) {
    super(neode, EEntities.User);
  }

  async findOneByEmail(email: string): Promise<TUser | null> {
    try {
      const instance = await this.neode.model(this.modelName).first('email', email);
      return instance ? (await instance.toJson() as TUser) : null;
    } catch (error) {
      throw error;
    }
  }
}
