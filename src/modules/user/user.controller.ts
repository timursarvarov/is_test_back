import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Res,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
    constructor(private UserService: UserService) { }

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
            results: Users,
        });
    }

    // Fetch a particular User using ID
    @Get('/user/:email')
    async getUser(@Res() res, @Param('email') email) {
        const user = await this.UserService.getUser(email);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            results: [user],
        });
    }

    // Update a User's details
    @Patch('')
    async updateUser(
        @Res() res,
        @Query('email') email,
        @Body() createUserDTO: CreateUserDTO,
    ) {
        const user = await this.UserService.updateOrUserByEmailOrCreate(
            email,
            createUserDTO,
        );
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully updated',
            user,
        });
    }

    // Delete a User
    @Delete(':id')
    async deleteUser(@Res() res, @Param('id') id) {
        const user = await this.UserService.deleteUser(id);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted',
            user,
        });
    }
}
