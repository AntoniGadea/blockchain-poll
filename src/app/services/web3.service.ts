import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

const contractAbi = require("../blockchain/contractABI.json");
declare let window: any;
@Injectable({
  providedIn: 'root'
})
export class Web3Service {
    private web3?: Web3;
    private contract?: Contract;
    private contractAddress: string = '0x6a73e469B1dD5F3c75E51e9A95395BC272ef9609';

  constructor() {
    if(window.web3) {
        this.web3 = new Web3(window.ethereum);
        this.contract = new this.web3.eth.Contract(contractAbi, this.contractAddress);

        window.ethereum.enable().catch((err: any) => console.log(err));
    } else {
        console.warn('Metamast not found');
    }
  }

  getAccount(): Promise<string | void> | undefined {
    if (!this.web3) return;

    return this.web3.eth.getAccounts().then(
        (accounts) => { accounts[0] || "" }
    );
  }

  async executeTransaction(fnName: string, ...args: any): Promise<void> {
    if (!this.contract) return;

    const account = this.getAccount;

    if(!account) return;

    await account;
    this.contract.methods[fnName](...args).send({ from: ''});
  }

}
