import { GatewayStatus, useGateway } from "@civic/solana-gateway-react";
import { useEffect, useState } from "react";
import { useCandyMachine } from "../CandyMachineProvider";

type ReturnType = {
  handleClick: () => Promise<void>;
  disabled: boolean;
  text: string;
};

export default function useMintButton(): ReturnType {
  const { onMint, candyMachine, isMinting, isActive } = useCandyMachine();
  const { requestGatewayToken, gatewayStatus } = useGateway();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (gatewayStatus === GatewayStatus.ACTIVE && clicked) {
      onMint();
      setClicked(false);
    }
  }, [gatewayStatus, clicked, setClicked, onMint]);

  function getMintButtonContent() {
    if (candyMachine?.state.isSoldOut) {
      return "SOLD OUT";
    } else if (isMinting) {
      return "Loading...";
    } else if (
      candyMachine?.state.isPresale ||
      candyMachine?.state.isWhitelistOnly
    ) {
      return "WHITELIST MINT";
    } else if (clicked && candyMachine?.state.gatekeeper) {
      return "Loading...";
    }

    return "MINT";
  }

  async function handleClick() {
    setClicked(true);
    if (candyMachine?.state.isActive && candyMachine?.state.gatekeeper) {
      if (gatewayStatus === GatewayStatus.ACTIVE) {
        setClicked(true);
      } else {
        await requestGatewayToken();
      }
    } else {
      await onMint();
      setClicked(false);
    }
  }

  const disabled = clicked || isMinting || !isActive;

  return {
    handleClick,
    disabled,
    text: getMintButtonContent(),
  };
}
