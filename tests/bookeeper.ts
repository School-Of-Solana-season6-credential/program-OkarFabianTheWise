import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Bookeeper } from "../target/types/bookeeper";
import { assert } from "chai";
// import { describe, it } from "node:test";

describe('bookeeper', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Bookeeper as Program<Bookeeper>;

  let baseAccount = anchor.web3.Keypair.generate();

  // Test: Initialize the account
  it('Initializes the account!', async () => {
    const tx = await program.methods.initialize()
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }).signers([baseAccount]).rpc({ commitment: "confirmed" });

    console.log('init tx:', tx);

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Account initialized:', account);
    assert.strictEqual(account.trades.length, 0, 'Account should start with zero trades');
  });

  // Test: Save a trade (Happy Path)
  it('Saves a trade!', async () => {
    const item = 'Test Item';
    const price = '1 SOL';
    const time = new anchor.BN(Date.now() / 1000); // Current time in seconds

    await program.methods.saveTrade(item, price, time)
      .accounts({
        baseAccount: baseAccount.publicKey,
      }).signers([baseAccount]).rpc({ commitment: "confirmed" });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Account after saving trade:', account);

    assert.strictEqual(account.trades.length, 1, 'One trade should be saved');
    assert.strictEqual(account.trades[0].item, item, 'Item should match saved value');
    assert.strictEqual(account.trades[0].price, price, 'Price should match saved value');
  });

  // Test: Save a trade (Unhappy Path - Uninitialized Account)
  it('Fails to save a trade with an uninitialized account!', async () => {
    const uninitializedAccount = anchor.web3.Keypair.generate();

    const item = 'Invalid Trade';
    const price = '0.5 SOL';
    const time = new anchor.BN(Date.now() / 1000);

    try {
      await program.methods.saveTrade(item, price, time)
        .accounts({
          baseAccount: uninitializedAccount.publicKey,
        }).rpc({ commitment: "confirmed" });
    } catch (err) {
      console.log('Expected error:', err.message);
      assert.include(err.message, 'Account not initialized', 'Error should indicate uninitialized account');
    }
  });

  // Test: Get trades
  it('Fetches trades!', async () => {
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    assert.strictEqual(account.trades.length, 1, 'Should match the number of previously saved trades');
    console.log('Fetched trades:', account.trades);
  });
});
