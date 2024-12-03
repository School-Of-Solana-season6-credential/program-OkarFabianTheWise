import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Bookeeper } from "../target/types/bookeeper";
import { assert } from "chai";

describe('bookeeper', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Bookeeper as anchor.Program<Bookeeper>;
  
  const [basePda, Bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("base_account"), provider.wallet.publicKey.toBuffer()], // Match seed used in your program
    program.programId
  );

  console.log('basePda:', basePda.toString());

  // Test: Initialize the account
  it('Initializes the account!', async () => {
    // 3 - Call initialize and send the transaction to the network
    const tx = await program.methods
    .initialize(Bump)
    .accounts({
      baseAccount: basePda, // This must match the name in your contract (base_account)
      user: provider.wallet.publicKey, // Assuming your wallet is `user`
      systemProgram: anchor.web3.SystemProgram.programId,
    }).rpc({commitment: 'confirmed'})
  

    console.log('account initialised:', tx);

    const account = await program.account.baseAccount.fetch(basePda);
    assert.strictEqual(account.trades.length, 0, 'Account should start with zero trades');
  });

  // Test: Save a trade (Happy Path)
  it('Saves a trade!', async () => {
    const item = 'BOOM Item';
    const price = '1 SOL';
    const slot = await provider.connection.getSlot();
    const blocktime = await provider.connection.getBlockTime(slot);
    const time = new anchor.BN(blocktime);

    const tx = await program.methods.saveTrade(item, price, time)
      .accounts({
        baseAccount: basePda,
        user: provider.wallet.publicKey,
      }).rpc()

    console.log('save tx:', tx);

    await sleep(3000)

    const account = await program.account.baseAccount.fetch(basePda);
    console.log('Account after saving trade:', account);

    assert.strictEqual(account.trades.length, 1, 'One trade should be saved');
    assert.strictEqual(account.trades[0].item, item, 'Item should match saved value');
    assert.strictEqual(account.trades[0].price, price, 'Price should match saved value');
  });

  // Test: Save a trade (Unhappy Path - Uninitialized Account)
  it('Fails to save a trade with an uninitialized account!', async () => {
    const keybyte = [
      144, 112,  15, 229, 213, 155, 175, 224, 10, 190,  15,
      240, 206,  31,  46,  22, 215, 223, 211, 17, 167,  73,
       70, 197, 160,  53,  84,  39,  35, 205, 53, 198,  11,
      254,  88,  27, 225,  64,   3, 167, 250, 25,  29, 110,
       16,  28, 144, 156,  83, 131, 241,  33, 48, 142,  22,
      232, 252, 119,  43, 109, 220,  57,   4, 88
    ]
    const uninitializedAccount = anchor.web3.Keypair.fromSecretKey(Uint8Array.from(keybyte))
    console.log(uninitializedAccount.publicKey.toString());

    const item = 'Invalid Trade';
    const price = '0.5 SOL';
    const time = new anchor.BN(Date.now() / 1000);

    try {
      const tx = await program.methods.saveTrade(item, price, time)
        .accounts({
          user: uninitializedAccount.publicKey
        })
        .signers([uninitializedAccount])
        .transaction();
    
      // 4 - Confirm the transaction
      const txId = await anchor.web3.sendAndConfirmTransaction(provider.connection, tx, [
      uninitializedAccount,
      ]);

    } catch (err) {
      // console.log('Expected error:', err.message);
      assert.include(err.message, 'AccountNotInitialized', 'Error should indicate uninitialized account');
    }
  });

  // Test: Get trades
  it('Fetches trades!', async () => {
    const account = await program.account.baseAccount.fetch(basePda);
    console.log('Fetched trades:', account.trades);
    assert.strictEqual(account.trades.length, 1, 'Should match the number of previously saved trades');
  });
});

async function airdrop(connection: any, address: any, amount = 200000000) {
  await connection.confirmTransaction(await connection.requestAirdrop(address, amount), "confirmed");
}

const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
