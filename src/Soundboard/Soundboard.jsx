import './style.css';

import { useState, useCallback } from 'react';

import meow from './mixkit-angry-cartoon-kitty-meow-94.wav';
import pig from './mixkit-big-pig-grunt-320.wav';

import catIcon from './cat.png';
import pigIcon from './pig.png';

/*
  MVP TODO
  [] Attempt PWA
  [] upload to server, pick a domain
  [] build Voice stuff
 */


export default function PasswordGameApp() {
  let [status, setStatus] = useState('');

  const playAudio = useCallback(function(audioFile) {
    (new Audio(audioFile).play());
    setStatus(audioFile);
  });


  const playMeow = useCallback(() => {
    playAudio(meow);
  });

  return (
    <div className="Soundboard">
      <h1>Soundboard Test</h1>

      <div className="icons">
        <img onClick={() => playAudio(meow)} src={catIcon} />
        <img onClick={() => playAudio(pig)} src={pigIcon} />
      </div>
      <div>{status}</div>
    </div>
  );
}
