
import {TonConnectButton} from '@tonconnect/ui-react';
import './App.css'
import {useMainContract} from "./hooks/useMainContract.ts";
import {useTonconnect} from "./hooks/useTonconnect.ts";
import {fromNano} from "@ton/core";

//EQCGIK5ZxjV4687u06yjidSbsZWZWXSXQHLKAQ4__Y6SycHo
function App() {
  const {contact_address,  contract_balance, counter_value,
    sendIncrement, sendDeposit, sendWithdrawRequest} = useMainContract();
  const {connected} = useTonconnect();
  return (
    <>
      <div>
        <TonConnectButton/>
      </div>
      <div className="Card">
        <div>Contract Address:</div>
        <div className="Hint">{contact_address?.slice(0, 30) + '...'}</div>
        {contract_balance && (
          <>
            <div>Contract Balance:</div>
            <div className="Hint">{fromNano(contract_balance)}</div>
          </>
        )}
      </div>

      <div className="Card">
        <div>Counter Value:</div>
        <div className="Hint">{counter_value ?? 'Loading...'}</div>
      </div>

      {connected && (
        <div className="card">
          <a onClick={() => sendIncrement()}>Increment By 5</a>
        </div>
      )}

      {connected && (
        <div className="card">
          <a onClick={() => sendDeposit()}>Deposit</a>
        </div>
      )}

      {connected && (
        <div className="card">
          <a onClick={() => sendWithdrawRequest()}>Withdraw</a>
        </div>
      )}

    </>
  )
}

export default App
