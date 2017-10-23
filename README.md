# Ethereum EVM smart contracts dev

## Local blockchain installation

To init one or more accounts with Ether, edit ./res/genesis19.json with (for example):
 
 ```
 "alloc": {
     "0x1fb891f92eb557f4d688463d0d7c560552263b5a": {
         "balance": "20000000000000000000"
     }
 }
 ```

### Init blockchain
run `npm run initBlockchain`

### Attach to network
run `geth --datadir ~/.ethereum/net19 --networkid 19 console`

- Create a new account: run `personal.newAccount()`
- Start mining: run `miner.start(1)`
- Stop mining: run `miner.stop()`
- Check balance: run `eth.getBalance(eth.coinbase)`
- Check balance in Ether: run `web3.fromWei(eth.getBalance(eth.coinbase), "ether")`