import { APP_GUARD, NestFactory } from '@nestjs/core';
import { Controller, Get, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/module';
import { TransactionsModule } from './transactions/module';
import { UsersModule } from './users/module';
import { User } from './users/user.entity';
import { JwtAuthGuard } from './auth/jwt.guard';
import { BalanceModule } from './balance/module';
import { Transaction } from './transactions/transaction.entity';

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
  entities: [User, Transaction],
};

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseOptions),
    UsersModule,
    AuthModule,
    TransactionsModule,
    BalanceModule,
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

// I was planning to adapt the nestjs code to the existing Next.js code,
// but I think this seperation was to decouple the web app and api.
async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(8080);
}
main();
