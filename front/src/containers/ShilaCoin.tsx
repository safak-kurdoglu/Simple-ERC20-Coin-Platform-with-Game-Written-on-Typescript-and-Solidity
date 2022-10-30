import ContractBalance from "../contract/components/Balance";
import ContractSendRewards from "../contract/components/SendRewards";
import ContractTransfer from "../contract/components/TransferCoin";
import ShilaPoint from "./ShilaPoint";
import ReqShilaCoin from "./ReqShilaCoin";


const ShilaCoin = () => {

  return  (
    <div className="shila-coin-menu">
      <h2>Shila Coin</h2>
      <p>You have <strong className="balance">loading...</strong> Shila Coin</p>
      <p>You have <strong className="point">loading...</strong> Shila Point &nbsp;&nbsp;<ReqShilaCoin/></p>
     
      <ContractSendRewards/>
      <ContractBalance/> 
      <ShilaPoint/>
      <ContractTransfer/> 
    </div>
  )
};

export default ShilaCoin;