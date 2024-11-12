import {useEffect, useState}  from "react";
import {Address, OpenedContract, toNano} from "@ton/core";

import {MainContract} from "../contacts/MainContract.ts";
import {useTonClient} from "./useTonClient.ts";
import {useAsyncInitialize} from "./useAsyncInitialize.ts";
import {useTonconnect} from "./useTonconnect.ts";

export function useMainContract() {
  const client = useTonClient();
  const {sender} =  useTonconnect();

  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const [contractData, setContractData] = useState<null
    | {counter_value: number, recent_address: Address, owner_address: Address}>(null);

  const [balance, setBalance] = useState<number>(0);


  const mainContact = useAsyncInitialize( async () => {
    if (!client) return;
    const contract = new MainContract(Address.parse('EQCGIK5ZxjV4687u06yjidSbsZWZWXSXQHLKAQ4__Y6SycHo'));
    return client?.open(contract) as OpenedContract<MainContract>;
  }, [client]);

  useEffect(() => {
    async function getValue(){
      if (!mainContact) return;
      setContractData(null);
      const val = await  mainContact.getData();
      const {balance} = await mainContact.getBalance();
      setBalance(balance);

      setContractData(({
        counter_value: val.number,
        recent_address: val.recent_sender,
        owner_address: val.owner_address
      }))

      await sleep(10000);
      getValue();
    }

    getValue();
  }, [mainContact]);

  return {
    contact_address: mainContact?.address.toString(),
    contract_balance: balance,
    ...contractData,
    sendIncrement: async () => {
      return mainContact?.sendIncrement(sender, toNano("0.05"), 5);
    },
    sendDeposit: async () => {
      return mainContact?.sendDeposit(sender, toNano("0.077"));
    },
    sendWithdrawRequest: async () => {
      return mainContact?.sendWithdrawRequest(sender, toNano("0.03"), toNano("0.1"));
    }

  }
}
