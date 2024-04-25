import {
  Controller,
  Post,
  Body,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IsEmail, IsNotEmpty } from 'class-validator';
import { UsersService } from 'src/users/service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { Public } from './jwt.guard';

export class CredentialsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  static comparePassword(password, encrypted: string): boolean {
    return bcrypt.compareSync(password, encrypted);
  }
}

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() credentials: CredentialsDto) {
    const user = await this.usersService.findByEmail(credentials.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!CredentialsDto.comparePassword(credentials.password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }
    return this.createToken(user);
  }

  @Public()
  @Post('register')
  @HttpCode(201)
  async register(@Body() credentials: CredentialsDto) {
    const existingUser = await this.usersService.findByEmail(credentials.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = bcrypt.hashSync(credentials.password, 10);
    const user = await this.usersService.create(
      credentials.email,
      hashedPassword,
    );
    if (!user) {
      throw new InternalServerErrorException('User could not be created');
    }
    return this.createToken(user);
  }

  createToken(user: User) {
    return this.jwtService.sign(
      {
        email: user.email,
        id: user.id,
        privateKey: user.privateKey,
      },
      {
        expiresIn: '10m',
        secret: 'change_this_secret_key_on_production',
      },
    );
  }
}
