import useEth from "../../contexts/EthContext/useEth";
import { useEffect } from "react";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();

  useEffect(() => {
    //smart contract's getBalance function is called at every account change for getting balance.
    const getBalance = async () => {
      try{
        const balance = await contract.methods.getBalance().call({ from: accounts[0] });
        document.getElementsByClassName("balance")[0].innerHTML = balance;
      }
      catch(error){
        console.log(error.message);
      }
    }
    
    getBalance();
  }, [accounts]);
  return    <></>;
}

export default ContractBtns;