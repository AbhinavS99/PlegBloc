// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract User{
    mapping(string => bytes32) private U_Password;
    mapping(string => string) private U_ipfs;
    mapping(string => int) private U_login_count;

    function register( string memory username,bytes memory password, string memory ipfs) public{
        U_Password[username] = keccak256(password);
        U_ipfs[username] = ipfs;
        U_login_count[username] = 0;
    }

    function get_ipfs( string memory username,bytes memory password) public view returns (string memory ipfs){
        bytes32 actual = U_Password[username];
        bytes32 curr = keccak256(password);
        if (actual == curr){
            return U_ipfs[username];
        }
        return "";
    }

    function login( string memory username,bytes memory password) public returns (int count){
        bytes32 actual = U_Password[username];
        bytes32 curr = keccak256(password);
        if (actual == curr){
            U_login_count[username] += 1;
            return U_login_count[username];
        }
        return -1;
    }

}