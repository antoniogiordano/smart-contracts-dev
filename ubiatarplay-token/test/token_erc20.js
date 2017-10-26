/**
 * Created by antoniogiordano on 26/10/2017.
 */

const nope = () => null

const Web3 = require('web3')
const web3 = new Web3()

const TestRPC = require('ethereumjs-testrpc')
web3.setProvider(TestRPC.provider())

const Promise = require('bluebird');
Promise.promisifyAll(web3.eth, { suffix: "Promise" });
Promise.promisifyAll(web3.version, { suffix: "Promise" });

const assert = require('assert-plus');

const truffleContract = require("truffle-contract");

const TokenERC20 = truffleContract(require(__dirname + "/../build/contracts/TokenERC20.json"));
TokenERC20.setProvider(web3.currentProvider);

describe("TokenERC20", function() {
  var accounts, networkId, tokenErc20

  before("get accounts", function() {
    return web3.eth.getAccountsPromise()
      .then(_accounts => accounts = _accounts)
      .then(() => web3.version.getNetworkPromise())
      .then(_networkId => {
        networkId = _networkId;
        TokenERC20.setNetwork(networkId);
        console.log(accounts)
      });
  });

  /*
  before("deploy library", function() {
    return ConvertLib.new({ from: accounts[0] })
      .then(_convertLib => convertLib = _convertLib)
      .then(() => MetaCoin.link({ ConvertLib: convertLib.address }));
  });
  */

  beforeEach("deploy a TokenERC20", function() {
    return TokenERC20.new({ from: accounts[0] })
      .then(_tokenErc20 => tokenErc20 = _tokenErc20);
  });

  it("should have 18 decimals", function() {
    return tokenErc20.decimals()
      .then(decimals => assert.strictEqual(
        decimals.toString(),
        '18',
        "should be 18"));
  });

  it("should start with 4,000,000 coins", function() {
    return tokenErc20.balanceOf.call(accounts[0])
      .then(balance => assert.strictEqual(
        web3.toBigNumber(balance).toString(10),
        web3.toBigNumber(4000000).times('1000000000000000000').toString(10),
        "should be 4M"));
  });

  it("should burn 1000 tokens", function() {
    return tokenErc20.burn.call(1000)
      .then(success => assert.strictEqual(success, true, "should be true"))
      .then(() => tokenErc20.balanceOf.call(accounts[0]))
      .then(balance => assert.strictEqual(
        web3.toBigNumber(balance).toString(10),
        web3.toBigNumber(4000000).times('1000000000000000000').minus(1000).toString(10),
        "should be 4 * 10 ^ 24 - 1000"))
  });

  it("should return false", function() {
    return tokenErc20.burn.call(1000, { from: accounts[1] })
      .then(success => assert.fail(success, undefined, "if should throw"))
      .catch(nope)
  });
});
