import * as anchor from "@project-serum/anchor";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export type HeadlessMintConfig = {
  network: WalletAdapterNetwork;
  candyMachineId: anchor.web3.PublicKey;
  rpcHost: string;
  txTimeoutInMilliseconds: number;
};
