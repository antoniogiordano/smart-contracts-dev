/**
 * Created by antoniogiordano on 23/10/2017.
 */

import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

web3.eth.getAccounts((err, accounts) => {
  console.log(accounts)
})