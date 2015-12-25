geth --genesis /home/$USER/privateChain/genesis.json --datadir ./privateChain --networkid 123 --maxpeers 3 --rpc --rpcaddr "127.0.0.1" --rpcport "8545" --verbosity "3" --dev --mine console 2>> /home/$USER/privateChain/geth.log

# console 2>> /home/$USER/privateChain/geth.log
# --nodiscover
