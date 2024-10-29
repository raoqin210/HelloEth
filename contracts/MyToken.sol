// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// solcjs 命令行执行的时候用下面这条
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyToken is ERC721 {
    constructor() ERC721("MyToken", "MTK") {}
}