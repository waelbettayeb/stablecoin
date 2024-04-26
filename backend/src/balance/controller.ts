import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Request,
} from '@nestjs/common';
import { UsersService } from 'src/users/service';
import Web3 from 'web3';

@Controller('balance')
export class BalanceController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  newWeb3Client() {
    return new Web3('https://eth.llamarpc.com');
  }

  @Get()
  async getBalance(@Request() req: any) {
    const user = await this.usersService.findOne(req.user.id);
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }
    const web3 = this.newWeb3Client();

    const address = web3.eth.accounts.wallet.add(user.privateKey)[0].address;
    const balance = await web3.eth.getBalance(address);
    return balance;
  }
}
