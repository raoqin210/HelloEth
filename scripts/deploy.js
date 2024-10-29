const { Web3 } = require('web3');
//连接本地私链，可以使用ganache-cli搭建。
const web3 = new Web3("http://127.0.0.1:8545");

const fs = require("fs");
const path = require("path");
//加载合约编译后的abi文件以及bytecode文件
const compilePath = path.resolve(__dirname,"../compiled","Storage.json");

const storage = fs.readFileSync(compilePath,"utf-8");
const abi = JSON.parse(storage).abi;
const bytecode = JSON.parse(storage).bytecode;
console.log(abi);
console.log(bytecode);
console.log("-----------------------------------------------");
(async()=>{
    let accounts = await web3.eth.getAccounts();
    console.log("from:",accounts[0]);
    let result = await new web3.eth.Contract(abi)
        .deploy({data:bytecode,arguments:[]})
        .send({ from: accounts[0], gas: '1000000',gasPrice:1000000000 })
        .catch(err=>{
            console.error(err);
        });
    console.log("合约部署成功,合约地址:",result);
    console.log("合约部署成功,合约地址:",result.options.address);//0x089F653a02f2Be797067121D9675Fe3DA29F3F57
    console.log("合约部署成功,合约地址:",result._address);//0x089F653a02f2Be797067121D9675Fe3DA29F3F57
})();

