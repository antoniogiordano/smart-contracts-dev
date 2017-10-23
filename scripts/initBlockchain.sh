#!/usr/bin/env bash

# Run this once, but it does not hurt to run it every time
geth --datadir ~/.ethereum/net19 init ./res/genesis19.json
# Run this every time you start your Geth "19", and add flags here as you need
# geth --datadir ~/.ethereum/net19 --networkid 19 console
