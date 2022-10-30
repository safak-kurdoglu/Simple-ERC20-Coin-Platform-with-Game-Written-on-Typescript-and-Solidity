import useEth from "../../contexts/EthContext/useEth";
import ContractBtns from "./ContractBtns";
import NoticeNoArtifact from "../NoticeNoArtifact";
import NoticeWrongNetwork from "../NoticeWrongNetwork";

function Balance() {
  const { state } =  useEth();

  const balance =
   <>
    <div className="contract-container">
      <ContractBtns  />
    </div>
  </>;

  return (
    <div className="balance">
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
          balance
      }
    </div>
  );
}

export default Balance;
