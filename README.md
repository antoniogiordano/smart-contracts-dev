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

### Osx

run `npm run initBlockchain`