const fs = require("fs");
const solc = require("solc");
const path = require("path");
//Storage.sol合约文件的路径，__dirname表示当前文件所在目录
const contractPath = path.resolve(__dirname,"../contracts","Storage.sol");
//使用fs加载Storage.sol合约文件
const contractSource = fs.readFileSync(contractPath,"utf-8");

//预先定义编译源输入json对象
let jsonContractSource = JSON.stringify({
    language: 'Solidity',
    sources: {
        'Storage.sol': {  // 指明编译的文件名
            content: contractSource, // solidity 源代码
        },
    },
    settings: { // 自定义编译输出的格式。以下选择输出全部结果。
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    },
});

const result = JSON.parse(solc.compile(jsonContractSource));
console.log(result);
if(Array.isArray(result.errors) && result.errors.length){
    console.log(result.errors);
}

storageJson = {
  'abi': {},
  'bytecode': ''
};
//此时的Storage.sol与输入的json对象中定义的编译文件名相同
storageJson.abi = result.contracts["Storage.sol"]["Storage"].abi;
storageJson.bytecode = result.contracts["Storage.sol"]["Storage"].evm.bytecode.object;

//输出文件的路径
const compilePath = path.resolve(__dirname,"../compiled","Storage.json");

//将abi以及bytecode数据输出到文件或者将整个result输出到文件
fs.writeFile(compilePath, JSON.stringify(storageJson), function(err){
    if(err){
        console.error(err);
    }else{
         console.log("contract file compiled sucessfully.");
    }
});

