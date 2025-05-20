module faucet::faucet;

    use sui::coin::{Self, Coin};
    use sui::pay;
    use sui::tx_context::{Self, TxContext};
    use sui::sui::SUI;

    /// Transfers `amount` of SUI from the transaction sender to the `recipient`.
    public entry fun transfer_sui(
        coin: &mut Coin<SUI>,        
        amount: u64,                  
        recipient: address,
        ctx: &mut TxContext
    ) {
        pay::split_and_transfer(coin, 1000000000, recipient, ctx)
    }