import React from "react";
import useEth from "../../contexts/EthContext/useEth";
import ContractBtns from "./ContractBtns";
import NoticeNoArtifact from "../NoticeNoArtifact";
import NoticeWrongNetwork from "../NoticeWrongNetwork";

function TransferCoin() {
  const { state } =  useEth();

  const transfer =
    <div className="contract-container">
      <ContractBtns />
    </div>
  ;

  return (
    <div className="send-rewards">
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
          transfer
      }
    </div>
  );
}

export default TransferCoin;