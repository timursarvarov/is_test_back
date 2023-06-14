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

@Controller('api/users')
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
  @Get()
  async getAllUser(@Res() res) {
    const Users = await this.UserService.getAllUser();
    return res.status(HttpStatus.OK).json({
      users: Users,
    });
  }

  // Fetch a particular User using ID
  @Get(':userID')
  async getUser(@Res() res, @Param('userID') userID) {
    const User = await this.UserService.getUser(userID);
    if (!User) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      results: User,
    });
  }

  // Update a User's details
  @Put('/update')
  async updateUser(
    @Res() res,
    @Query('userID') userID,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    const User = await this.UserService.updateUser(userID, createUserDTO);
    if (!User) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      User,
    });
  }

  // Delete a User
  @Delete('/delete')
  async deleteUser(@Res() res, @Query('userID') userID) {
    const User = await this.UserService.deleteUser(userID);
    if (!User) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      User,
    });
  }
}
