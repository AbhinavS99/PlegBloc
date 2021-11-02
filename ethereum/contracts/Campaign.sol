// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.7.5;
    
contract CampaignFactory{
    address[] public deployed_campaigns;
    
    function create_campaign(uint min_c) public{
        address new_campaign = address(new Campaign(min_c, msg.sender));
        deployed_campaigns.push(new_campaign);
    }
    
    function getDeployedCampaigns() public view returns(address[] memory){
        return deployed_campaigns;
    }
}


contract Campaign{
    struct Request{
        string description;
        uint value;
        address recepient;
        bool complete;
        uint yes_count;
        mapping( address => bool) approvers;
    }
    
    address public creator;
    uint public minimum_contribution;
    mapping(address => bool) public backers;
    uint backers_count; 
    Request[] public requests;
    
    
    modifier restrict_to_creator(){
        require(msg.sender == creator);
        _;
    }
    
    
    constructor (uint min_c, address manager) {
        creator = manager;
        minimum_contribution = min_c;
        backers_count = 0;
        
    }
    
    function contribute() public payable {
        require(msg.value >= minimum_contribution);
        backers[msg.sender] = true;
        backers_count++;
        
    }
    
    function new_request( string memory description, uint value, address  recepient) 
    public payable restrict_to_creator {
        
        Request storage temp = requests.push();
        temp.description = description;
        temp.value = value;
        temp.recepient = recepient;
        temp.complete = false;
        temp.yes_count = 0;
        
    }
    
    function approve_request(uint i) public {
        //i : request index in array
        Request storage curr_request = requests[i];
        require( backers[msg.sender] ); // Should be a backer         
        require( ! curr_request.approvers[msg.sender] ); //Should not have voted on this request 
        
        curr_request.approvers[msg.sender] = true;
        curr_request.yes_count++;
    }
    
    function make_transaction( uint i) public restrict_to_creator {
        Request storage curr_request = requests[i];
        
        require( curr_request.yes_count > (backers_count/2));
        require( ! curr_request.complete);
        
        address payable addr = payable(curr_request.recepient);
        addr.transfer( curr_request.value );
        
        curr_request.complete = true;
    }
}

