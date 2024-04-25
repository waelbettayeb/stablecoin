import { Injectable } from '@nestjs/common';
import { Web3 } from 'web3';

@Injectable()
export class BalanceService {
  async getBalance() {
    const web3 = new Web3('http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    return balance;
  }
}
