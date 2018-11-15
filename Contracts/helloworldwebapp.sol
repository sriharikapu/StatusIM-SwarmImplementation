// Credits to :  andrecronje

pragma solidity ^0.4.11;
contract helloWorldWebApp {
 address public owner;
 string public html;
 
 modifier onlyOwner() {
  require(msg.sender == owner);
  _;
 }
 
 function helloWorldWeb() public {
  owner = msg.sender;
 }
 
 function setHTML(string _html) payable public onlyOwner {
  html = _html;
 }
 
 function renderWeb() public returns (string) {
   return html;
 }
}
