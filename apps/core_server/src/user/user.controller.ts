import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { UserService } from './user.service';

import { EUserRole } from '@/common/models';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get('/candidates')
  async getAllByRole() {
    return await this.userService.findAllByRole(EUserRole.Candidate);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDTO) {
    return await this.userService.create(dto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDTO) {
    return await this.userService.update(id, dto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
