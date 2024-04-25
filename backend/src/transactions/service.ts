import { Get, Injectable, Post } from '@nestjs/common';
import { Web3 } from 'web3';

@Injectable()
export class TransactionsService {
  @Get('')
  async getTransactions() {
    const web3 = new Web3('http://localhost:8545');
    const blockNumber = await web3.eth.getBlockNumber();
    const block = await web3.eth.getBlock(blockNumber);
    return block.transactions;
  }

  @Post('/send')
  async sendTransaction() {
    const web3 = new Web3('http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    const receipt = await web3.eth.sendTransaction({
      from: accounts[0],
      to: accounts[1],
      value: web3.utils.toWei('1', 'ether'),
    });
    return receipt;
  }

  @Get('/balance')
  async getBalance() {
    const web3 = new Web3('http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    return balance;
  }
}
