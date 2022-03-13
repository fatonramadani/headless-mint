# Headless Mint

Headless mint is a headless wrapper around the Candy Machine from Metaplex.

It exposes a React component, and two useful hooks that expose all the props needed to build a fully custom Minting website.

Used on my NFT project: [The french president](https://thefrenchpresident.com).

## HeadlessMint Component

HeadlessMint is a React component that encapsulates all the minting logic. You just need to wrap your app around it, and pass the following props:

| Prop           | Type                  | Comment                                              |
| -------------- | :-------------------- | :--------------------------------------------------- |
| network        | WalletAdapterNetwork  | See @solana/wallet-adapter-base                      |
| candyMachineId | anchor.web3.PublicKey | See: @project-serum/anchor                           |
| rpcHost        | String                | Highly recommended to use a custom one in production |

## useCandyMachine

| Prop              | Type                |
| ----------------- | :------------------ |
| isActive          | boolean             |
| isMinting         | boolean             |
| onMint            | () => Promise<void> |
| itemsRemaining    | number              |
| isWhitelistUser   | boolean             |
| discountPrice?    | anchor.BN           |
| candyMachine?     | CandyMachineAccount |
| toggleMintButton? | () => void          |
| endDate           | Date                |
| isPresale         | boolean             |
| rpcUrl            | string              |
| alertState?       | AlertType           |

## useMintButton

| Prop        | Type                |
| ----------- | :------------------ |
| disabled    | boolean             |
| handleClick | () => Promise<void> |
| text        | string              |
