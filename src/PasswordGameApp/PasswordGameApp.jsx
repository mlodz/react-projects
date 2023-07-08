import './style.css';

import { useState, useCallback } from 'react';
import RULES from './Rules';

export default function PasswordGameApp() {

  let [password, setPassword] = useState('');
  let [currentAlias, setCurrentAlias] = useState();
  let [passing, setPassing] = useState(new Set([]));
  let [shown, setShown] = useState(new Set([]));
  const messageKey = m => `${m.alias} + ${passing.has(m.alias)}`;

  const handlePassword = useCallback(e => {
    let newPassword = e.target.value;
    let currentAliasIndex = RULES.findIndex(r => r.alias === currentAlias);
    let firstFailingIndex = RULES.findIndex(r => r.fails(newPassword));

    console.log('handlePassword:', {newPassword, currentAliasIndex, firstFailingIndex});

    // update the password
    setPassword(p => newPassword);

    // update set of all passing
    let newPassing = RULES
        .filter(r => !r.fails(newPassword))
        .map(r => r.alias);
    setPassing(new Set(newPassing));

    let newAlias;
    // Update the currentAlias is appropriate
    if (firstFailingIndex > currentAliasIndex) {
      newAlias = RULES[firstFailingIndex].alias;
    } else if (firstFailingIndex === -1) {
      newAlias = RULES[RULES.length - 1].alias;
    }
    if (newAlias) {
      setCurrentAlias(newAlias);
    }

  }, [password, currentAlias]);

  // Get all messages up to and including the currentAlias
  let messages = [];
  if (currentAlias) {
    for (let i = 0; i < RULES.length; i++) {
      let rule = RULES[i];
      messages.push(rule);
      if (rule.alias === currentAlias) {
        break;
      }
    }
  }

  let allPass = passing.size === RULES.length;

  return (
    <div className="PasswordGameApp">
      <div className="page">
        <h1>* Another Password Game</h1>

        <input
          className="password"
          type=""
          value={password}
          key="1"
          placeholder="Enter Password..."
          onChange={handlePassword} />

        {allPass
         ? <h2 className="win">You set your password!</h2>
         : null
        }

        {messages.map(m => <Message key={messageKey(m)} message={m} success={passing.has(m.alias)} />)}

      </div>

    </div>
  );
}


function Message({message, success}) {
  return (
    <div
      className={success ? "message pass" : "message fail"}
    >
      <h3 className="title">{message.title}</h3>
      <div className="body">{message.message}</div>
    </div>
  );
}
