
import {useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import axios from "axios";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    //smart contract's isOwner function is called at every account change for authentication.
    const fetchNFTs = async () => {
      const isOwner = await contract.methods.isOwner().call({ from: accounts[0] });
      setIsOwner(isOwner)
    }

    if(accounts && contract)
      fetchNFTs();
  }, [accounts, contract]);

  const sendRewards = () => {

    //After getting datas, here smart contract function is called and if no error occurred, confirmed requests are deleted.
    const sendCoinRewards = async (addresses: string[], points: number[]) => {
      try{
        await contract.methods.sendCoinRewards( addresses, points ).send({ from: accounts[0]});
        axios.get("http://localhost:3000/front/delete-confirmed-requests")
        .then((resp) => {
          if(!resp.data.status){
            alert(resp.data.message);
            console.log(resp.data.error);
          }
          return;
        });
      }
      catch(error){
        alert(error.message);
        return;
      }
    }

    try{
      //Getting waiting ShilaCoin requests.
      axios.get("http://localhost:3000/front/get-waiting-rewards")
      .then((resp) => {
        if(!resp.data.status){
          alert(resp.data.message);
          console.log(resp.data.error);
        }
        else{
          if(resp.data.users && resp.data.users.length){
            var addresses: string[] = [];
            var points: number[] = [];
            const users = resp.data.users;
            const len = users.length;

            for(var i=0; i<len; i++){
              addresses.push(users[i].address);
              points.push(users[i].shilaPoint);
            }
            sendCoinRewards(addresses, points);
          }
          else
            alert(resp.data.message);
        }
      });
    }catch(error){
      alert(error.message);
    }
    return;
  };

  const RewardButton = isOwner ? <button onClick={sendRewards} className="btn btn-send-NFT-rewards"> Send Rewards</button> : <></>
  return (
    <div className="btns send-NFT-rewards">
      {RewardButton}
    </div>
  );
}

export default ContractBtns;