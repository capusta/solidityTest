#!/bin/bash
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo add-apt-repository -y ppa:ethereum/ethereum-dev

sudo apt-get update
sudo apt-get install tig nodejs npm nodejs-legacy -y
sudo apt-get install puppet ethereum -y
sudo apt-get install solc -y
sudo puppet module install camptocamp-accounts

which solc
if [ i $? != 0 ]; then
  echo "UH OH ... solidity compiler not installed"
fi

npm install web3
