import { Module } from '@nestjs/common';
import { BalanceController } from './controller';
import { BalanceService } from './service';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class TransactionsModule {}
