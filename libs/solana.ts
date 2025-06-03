import { irysStorage, keypairIdentity, Metaplex, toMetaplexFile } from '@metaplex-foundation/js';
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  type Connection,
  Keypair,
  type PublicKey,
  SystemProgram,
  Transaction,
  type VersionedTransaction,
} from '@solana/web3.js';

import type { ITokenForm } from '@/interfaces';

export const createSolanaToken =
  (
    connection: Connection,
    publicKey: PublicKey,
    signTransaction: <T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>
  ) =>
  async (tokenForm: ITokenForm) => {
    const {
      decimals,
      description,
      freezeAuthority,
      logo,
      mintAuthority,
      name,
      supply,
      symbol,
      updateAuthority,
    } = tokenForm;

    const mintKeypair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const tokenAccount = await getAssociatedTokenAddress(mintKeypair.publicKey, publicKey);

    const createMintTx = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mintKeypair.publicKey,
        Number(decimals),
        publicKey,
        freezeAuthority ? publicKey : null
      ),
      createAssociatedTokenAccountInstruction(
        publicKey,
        tokenAccount,
        publicKey,
        mintKeypair.publicKey
      ),
      createMintToInstruction(mintKeypair.publicKey, tokenAccount, publicKey, Number(supply))
    );

    createMintTx.feePayer = publicKey;
    const blockhash = await connection.getLatestBlockhash();
    createMintTx.recentBlockhash = blockhash.blockhash;

    const signedTx = await signTransaction(createMintTx);
    signedTx.partialSign(mintKeypair);
    await connection.sendRawTransaction(signedTx.serialize());

    const metaplex = Metaplex.make(connection).use(keypairIdentity(mintKeypair)).use(irysStorage());
    const file = toMetaplexFile(Buffer.from(await logo!.data.arrayBuffer()), logo!.name);
    const imageUri = await metaplex.storage().upload(file);

    const { uri } = await metaplex.nfts().uploadMetadata({
      name,
      symbol,
      description,
      image: imageUri,
    });

    await metaplex.nfts().create({
      uri,
      name,
      symbol,
      sellerFeeBasisPoints: 0,
      mintAuthority: mintKeypair,
      updateAuthority: updateAuthority ? mintKeypair : undefined,
    });

    return mintKeypair.publicKey.toBase58();
  };
