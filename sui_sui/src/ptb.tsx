import { Transaction } from "@mysten/sui/transactions"

const tx = new Transaction();

const [coin] = tx.splitCoins(tx.gas, [100]);

