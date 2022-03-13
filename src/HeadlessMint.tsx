import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { PropsWithChildren, useMemo } from "react";
import { CandyMachineProvider } from "./CandyMachineProvider";
import { HeadlessMintConfig } from "./HeadlessMintConfig";

export default function HeadlessMint({
  children,
  ...props
}: PropsWithChildren<HeadlessMintConfig>): JSX.Element {
  const { network } = props;
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          <CandyMachineProvider {...props}>{children}</CandyMachineProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
