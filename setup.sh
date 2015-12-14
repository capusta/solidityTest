#!/bin/bash

sudo apt-get install tig nodejs npm nodejs-legacy -y

sudo apt-get-repository ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install solc -y
which solc

npm install web3
