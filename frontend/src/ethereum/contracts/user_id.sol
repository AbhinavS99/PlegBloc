// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract User {
    mapping(string => bytes32) private U_Password;
    mapping(string => string) private U_ipfs;

    function register(
        string memory username,
        string memory password,
        string memory ipfs
    ) public {
        U_Password[username] = keccak256(bytes(password));
        U_ipfs[username] = ipfs;
    }

    function update_ipfs(
        string memory username,
        string memory password,
        string memory ipfs
    ) public {
        bytes32 actual = U_Password[username];
        bytes32 curr = keccak256(bytes(password));
        if (actual != curr) {
            return;
        }
        U_ipfs[username] = ipfs;
    }

    function get_ipfs(string memory username, string memory password)
        public
        view
        returns (string memory ipfs)
    {
        bytes32 actual = U_Password[username];
        bytes32 curr = keccak256(bytes(password));
        if (actual == curr) {
            return U_ipfs[username];
        }
        return "";
    }

    function login(string memory username, string memory password)
        public
        view
        returns (int256 count)
    {
        bytes32 actual = U_Password[username];
        bytes32 curr = keccak256(bytes(password));
        if (actual == curr) {
            return 1;
        }
        return -10;
    }
}
