import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { UserService } from './user.service';

import { EUserRole } from '@/common/models';

@ApiTags('Users')
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
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Error' })
  @ApiBody({ type: CreateUserDTO })
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
