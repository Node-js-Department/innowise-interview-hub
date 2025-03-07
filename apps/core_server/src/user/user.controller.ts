import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { UserService } from './user.service';

import { EUserRole } from '@/common/models';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Find All users' })

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Find users by name and email', description: 'Enter name or email' })
  @ApiQuery({ name: 'name', required: false, type: String, description: 'The name of the user to search for' })
  @ApiQuery({ name: 'email', required: false, type: String, description: 'The email of the user to search for' })
  @Get('/search')
  async getUserByEmailName(@Query('name') name?: string, @Query('email') email?: string) {
    return this.userService.findByEmailAndName(name, email);
  }

  @ApiOperation({ summary: 'Find all Candidates' })
  @Get('/candidates')
  async getAllByRole() {
    return await this.userService.findAllByRole(EUserRole.Candidate);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({
    status: 400,
    description: 'Validation error | Email already in use',
  })
  @ApiBody({ type: CreateUserDTO })
  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Error' })
  @ApiBody({ type: CreateUserDTO })
  async createUser(@Body() dto: CreateUserDTO) {
    return await this.userService.createNewUser(dto);
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found', type: CreateUserDTO })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: UpdateUserDTO, description: 'Updated user data' })
  @ApiResponse({ status: 200, description: 'User successfully updated', type: CreateUserDTO })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDTO) {
    return await this.userService.updateUserById(id, dto);
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUserById(id);
  }
}
