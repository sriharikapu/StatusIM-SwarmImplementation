           
# Status.im Swarm Implementation                     ![Image](https://github.com/sriharikapu/StatusIM-SwarmImplementation/blob/master/assets/icon.png?raw=true) [![Join the chat at https://gitter.im/ethereum/swarm](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ethereum/swarm?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/sriharikapu/StatusIM-SwarmImplementation.svg?branch=master)](https://travis-ci.org/sriharikapu/StatusIM-SwarmImplementation)

A simple way to host static html webpages on Ethereum Smart contracts and Ethereum swarm. In this project I focused on implementing the rendering of static html web pages from Ethereum Smart Contracts and Ethereum Swarm. 

![Image](https://github.com/sriharikapu/StatusIM-SwarmImplementation/blob/master/assets/SimpleArchitecture-2.png?raw=true)

## Rendering from Ethereum Smart Contracts [Not Recommended]
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


# Rendering from Ethereum Swarm [Recommended - provided you know GO lang basics]

The most important thing is to [install](https://swarm-guide.readthedocs.io/en/latest/installation.html) swarm on your machine.

Install go lang if you want to interact with the swarm directly

Linux, macOS, and FreeBSD tarballs
```
tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz
export PATH=$PATH:/usr/local/go/bin
```
You can check if your swarm is running or not 

![Image](https://github.com/sriharikapu/StatusIM-SwarmImplementation/blob/master/assets/Screen%20Shot%202018-11-16%20at%2011.02.59%20AM.png?raw=true)

you can try out some go code and check wether the file upload is working fine or not
```
package main

import (
    "fmt"
    "io/ioutil"
    "log"

//    bzzclient "github.com/ethereum/go-ethereum/swarm/api/client"
        bzzclient "github.com/ethereum/go-ethereum/tree/master/swarm/api/client"
)

func main() {
    client := bzzclient.NewClient("http://127.0.0.1:8500")
    manifestHash := "2e0849490b62e706a5f1cb8e7219db7b01677f2a859bac4b5f522afd2a5f02c0"
    manifest, isEncrypted, err := client.DownloadManifest(manifestHash)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(isEncrypted) // false

    for _, entry := range manifest.Entries {
        fmt.Println(entry.Hash)        // 42179060941352ba7b400b16c40f1e1290423a826de2a70587034dc14bc4ab2f
        fmt.Println(entry.ContentType) // text/plain; charset=utf-8
        fmt.Println(entry.Size)        // 12
        fmt.Println(entry.Path)        // ""
    }

    file, err := client.Download(manifestHash, "")
    if err != nil {
        log.Fatal(err)
    }

    content, err := ioutil.ReadAll(file)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(string(content)) // hello world
}
```
Compile the file cross weather the code is working fine or not
```
go tool compile swarm_upload.go 
go run swarm_upload.go
```
Here is a simple single page HTML [Resume](https://swarm-gateways.net/bzz:/5b3bf6a9beabd8f4c36ed0b1a92fe3f4047797ccd1674ea5e3ed44963d700d39/) uploaded on swarm.

Indeed you follow the basic approch in uploading files & directories on swarm. Which is discribed in the [wiki](https://github.com/sriharikapu/StatusIM-SwarmImplementation/wiki/Getting-started).


# Alternative Approach [Recommended]
Alternatively In this Project I used [Swarmgw](https://www.npmjs.com/package/swarmgw) For accomlising the task of rendering the static html page on a web browser.

Lets get started. Inorder for you to access the swarm ther are two ways. Either you connect to the swarm gateways or you run your own swarm locally or on a server. In the above case I used a Tier 4 AWS linux server for my testing. But this time we can do it in a much simpler way. Firstly
```
mkdir SwarmTest
cd SwarmTest
```
Now clone the repo
```
https://github.com/sriharikapu/StatusIM-SwarmImplementation.git
cd StatusIM-SwarmImplementation
cd src
```
Now install the node js dependencies
```
npm install
npm install -g pm2 
npm install -g expressjs
npm install -g swarmgw
```
We can start ```render.js``` using the process manager pm2. In order to access the html code via localhost
```
pm2 start render.js
```
![Image](https://github.com/sriharikapu/StatusIM-SwarmImplementation/blob/master/assets/Screen%20Shot%202018-11-16%20at%202.33.00%20PM.png?raw=true)

For a quick testing you can open the Insomnia / Postman and make a GET request at ```http://localhost:8080``` or you can use your web browser.

![Images](https://github.com/sriharikapu/StatusIM-SwarmImplementation/blob/master/assets/Screen%20Shot%202018-11-16%20at%202.36.36%20PM.png?raw=true)

Common Errors That I came accross: 
- Manifest 441235131a5120fa is malformed: invalid character '<' looking for beginning of value
- swarm: unrecognized option '--bzzaccount'
- swarm_upload.go:8:5: can't find import: "github.com/ethereum/go-ethereum/swarm/api/client"
- swarm: unrecognized option '--ens-api'
- Error: Illegal header line in fasta file.
- go: disabling cache


Further Scope: 

Right now am able to store and serve a static html from the swarm. In future we can use a similar approch for the storing of static portfolio websites/ Resumes and any content behind the hash. Right now its possible to do live streaming video's over swarm. Which can possibilly unleash us in creating much more sophisticated infrastructure which can help us in building a better `Web3.0.` Its possible to host the swarm static web page over ENS. 


For collaborating: 
- Fork the code and create pull request.
- If you come accoss create issues Reach out to the community on [Gitter](https://gitter.im/ethereum/swarm)

# Final Result 

Fell free to check out [status.im on swarm.](https://swarm-gateways.net/bzz:/8ee1c7297f606b00a7b0925e0159a9ac8f7ef89cb111875660501bb0bbc5fdea/)

![Image](https://github.com/sriharikapu/StatusIM-SwarmImplementation/blob/master/assets/status.gif?raw=true)


Issues: Cross origin resource sharing should be enabled if you want to view `Latest News Section` on the [status.im swarm webpage.](https://swarm-gateways.net/bzz:/8ee1c7297f606b00a7b0925e0159a9ac8f7ef89cb111875660501bb0bbc5fdea/)


# Tools & Languages used
- [Solidity](https://github.com/ethereum/solidity)
- Stringify
- [ExpressJS](https://expressjs.com/)
- [GoLang](https://golang.org/d)
- [Swarm](https://swarm-gateways.net)
- [Remix](https://remix.ethereum.org)
- Rinkeby & Kovan
- [Embark](https://embark.status.im/)
- [Runkit](https://npm.runkit.com/)
- [swarmgw](https://www.npmjs.com/package/swarmgw)

Thanks to [andytudhope](https://github.com/andytudhope), [jacqueswww](https://github.com/jacqueswww), [leafcutterant](https://github.com/leafcutterant)
