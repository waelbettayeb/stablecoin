import { Module } from '@nestjs/common';
import { BalanceController } from './controller';
import { UsersModule } from 'src/users/module';

@Module({
  controllers: [BalanceController],
  imports: [UsersModule],
})
export class BalanceModule {}
