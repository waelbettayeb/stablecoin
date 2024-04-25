import { APP_GUARD, NestFactory } from '@nestjs/core';
import { Controller, Get, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/module';
import { TransactionsModule } from './transactions/module';
import { UsersModule } from './users/module';
import { User } from './users/user.entity';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller()
class AppController {
  @Get('health')
  health() {
    return { status: 'up' };
  }
}

const DatabaseOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'public',
  synchronize: true,
  entities: [User],
};

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseOptions),
    UsersModule,
    AuthModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
