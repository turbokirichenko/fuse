// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Contract.sol";

contract BottleTestContract is ERC20Contract {
    bytes32[] private datamatrix;

    constructor(string memory name, string memory symbol, uint8 decimals)
        ERC20Contract(name, symbol, decimals)
    {
        // Mint 1 free bottle token for owner
        _mint(msg.sender, 1 * 10 ** uint256(decimals));
    }

    function datamatrixLen() public view returns (uint256) {
        return datamatrix.length;
    }

    function mintByApprove(string calldata gs1string) external returns (bool) {
        bool isValid = _validateMark(gs1string);
        require(isValid == true, "This mark isn't valid");
        bytes memory gs1bytes = bytes(gs1string);
        bytes32 hash = sha256(gs1bytes);
        bool isPossible = _searchMark(hash);
        require(isPossible == true, "This mark already exists");
        datamatrix.push(hash);
        _mint(msg.sender, 1);
        return true;
    }

    function _searchMark(bytes32 hash) internal view returns (bool) {
        uint256 len = datamatrix.length;
        bool isPossible = true;
        for (uint256 i = 0; i < len; ++i) {
            if (datamatrix[i] == hash) {
                isPossible = false;
                break;
            }
        }
        return isPossible;
    }

    function _validateMark(string calldata gs1string) internal pure returns (bool) {
        if (bytes(gs1string).length < 18) {
            return false;
        }
        bytes memory gtin = bytes(_substr(gs1string, 3, 16));
        if (gtin.length < 13) {
            return false;
        }
        uint8 checksum = uint8(gtin[12]) - 48;
        uint sum = 0;
        for (uint i = 0; i < 12; i++) {
            uint8 ch = uint8(gtin[i]);
            if (ch < 48 || ch >= 58) {
                return false;
            }
            sum += (i%2 == 0) ? (ch-48) : ((ch-48)*3);
        }
        uint remainder = 10 - (sum%10);
        return remainder == checksum;
    }

    function _substr(string calldata str, uint startIndex, uint endIndex) internal pure returns (string memory) {
        return str[startIndex:endIndex];
    }

    function _substring(string memory str, uint startIndex, uint endIndex) internal pure returns (string memory ) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex-startIndex);
        for(uint i = startIndex; i < endIndex; i++) {
            result[i-startIndex] = strBytes[i];
        }
        return string(result);
    }
}