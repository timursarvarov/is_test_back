import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('User')
export class UserController {
  constructor(private UserService: UserService) {}

  // add a User
  @Post('/create')
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const User = await this.UserService.addUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      User,
    });
  }

  // Retrieve Users list
  @Get('Users')
  async getAllUser(@Res() res) {
    const Users = await this.UserService.getAllUser();
    return res.status(HttpStatus.OK).json(Users);
  }

  // Fetch a particular User using ID
  @Get('User/:UserID')
  async getUser(@Res() res, @Param('UserID') UserID) {
    const User = await this.UserService.getUser(UserID);
    if (!User) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(User);
  }

  // Update a User's details
  @Put('/update')
  async updateUser(
    @Res() res,
    @Query('UserID') UserID,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    const User = await this.UserService.updateUser(UserID, createUserDTO);
    if (!User) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      User,
    });
  }

  // Delete a User
  @Delete('/delete')
  async deleteUser(@Res() res, @Query('UserID') UserID) {
    const User = await this.UserService.deleteUser(UserID);
    if (!User) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      User,
    });
  }
}