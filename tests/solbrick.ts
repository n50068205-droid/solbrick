import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solbrick } from "../target/types/solbrick";
import { Keypair, SystemProgram } from "@solana/web3.js";
import assert from "assert";

describe("solbrick", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Solbrick as Program<Solbrick>;

  it("Creates an asset", async () => {
    const assetKeypair = Keypair.generate();
    await program.methods
      .createAsset("ЖК Алтын Орда", new anchor.BN(1000), new anchor.BN(50))
      .accounts({
        asset: assetKeypair.publicKey,
        owner: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([assetKeypair])
      .rpc();

    const asset = await program.account.asset.fetch(assetKeypair.publicKey);
    assert.equal(asset.name, "ЖК Алтын Орда");
    assert.equal(asset.totalShares.toNumber(), 1000);
    console.log("✅ Asset created:", asset.name);
  });

  it("Buys shares", async () => {
    const assetKeypair = Keypair.generate();
    const holdingKeypair = Keypair.generate();

    await program.methods
      .createAsset("Бизнес-центр Нур Плаза", new anchor.BN(500), new anchor.BN(100))
      .accounts({
        asset: assetKeypair.publicKey,
        owner: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([assetKeypair])
      .rpc();

    await program.methods
      .buyShares(new anchor.BN(10))
      .accounts({
        asset: assetKeypair.publicKey,
        holding: holdingKeypair.publicKey,
        investor: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([holdingKeypair])
      .rpc();

    const holding = await program.account.holding.fetch(holdingKeypair.publicKey);
    assert.equal(holding.shares.toNumber(), 10);
    console.log("✅ Bought shares:", holding.shares.toNumber());
  });
});
