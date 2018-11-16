# Status.im Swarm Implementation
A simple way to host static html webpages on Ethereum Smart contracts and Ethereum swarm. In this project I focused on implementing the rendering of static html web pages from Ethereum Smart Contracts and Ethereum Swarm. 

## Rendering from Ethereum Smart Contracts
Navigate to ``` Ethereum Remix console ```

Create a new Solidity file ``` SimpleStaticHTMLStorage.sol ```

Copy the following code and paste it choose the compiler version 0.4.11
```
pragma solidity ^0.4.11;
contract SimpleStaticHTMLStorage {
 address public owner;
 string public html;
 
 modifier onlyOwner() {
  require(msg.sender == owner);
  _;
 }
 
 function SimpleStaticHTMLStorage() public {
     owner = msg.sender;
 }
 
 function setHTML(string _html) payable public onlyOwner {
  html = _html;
 }
 
 function renderWeb() public returns (string) {
   return html;
 }
}
```
Now, Got to run section and interact with deployed contract..
You can set your HTML using SetHTML. You can only pass [stringified html](https://www.willpeavy.com/minifier/). 

![Image](https://github.com/sriharikapu/StatusIM-SwarmImplementation/blob/master/assets/Screen%20Shot%202018-11-16%20at%2010.28.30%20AM.png?raw=true)

Note: The major drawback in this approach is you cannot be able this for storing a huge html page, Which might result in error's in gas calicuation. Although I have a alternative idea to by pass this problem. Which is by storing a stringified division or section of html in various solidity functions and render them on and align them on front end. This will work fine although we will end up in crating more functions than what we ecpected. Over all the pro's with this approach is you can modify your html anytime you want.

![Image](https://github.com/sriharikapu/StatusIM-SwarmImplementation/blob/master/assets/skelton.gif?style=center)


# Tools used
- Solidity
- Stringify
- Swarm
- Remix
- Rinkeby
- Embark
- Runkit
- swarmgw [Node module]
