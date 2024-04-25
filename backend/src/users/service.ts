import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import Web3 from 'web3';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  newWeb3Client() {
    return new Web3('https://eth.llamarpc.com');
  }
  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  create(email: string, password: string): Promise<User> {
    const web3 = this.newWeb3Client();
    const account = web3.eth.accounts.create();
    const user = new User();
    user.email = email;
    user.password = password;
    user.privateKey = account.privateKey;

    return this.usersRepository.save(user);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
