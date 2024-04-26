import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
  Request,
} from '@nestjs/common';

import { UsersService } from 'src/users/service';
import Web3 from 'web3';

@Controller('transactions')
export class TransactionsController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  newWeb3Client() {
    return new Web3('https://eth.llamarpc.com');
  }

  @Post('/send')
  async sendTransaction(@Request() req: any, @Body() body: any) {
    const user = await this.usersService.findOne(req.user.id);
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }
    const web3 = this.newWeb3Client();
    web3.eth.accounts.wallet.add(user.privateKey);

    // TODO: return send transaction
    const receipt = await web3.eth.sendTransaction({
      to: body.address,
      value: body.amount,
    });

    return receipt;
  }

  @Get('')
  async getTransactionsHistory(@Request() req: any) {
    const user = await this.usersService.findOne(req.user.id);
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    // TODO: return transactions history
  }
}
