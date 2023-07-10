//import logo from './logo.svg';
import './DeferredApp.css';

import { Suspense, useState, useEffect, useRef, useCallback } from 'react';

const wait = ms => new Promise(r => setTimeout(() => r(), ms));


export default function DeferredApp() {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    await wait(1000);
    setData(data => [...data, Math.floor(100 * Math.random())]);
    setLoading(false);
  }, []);


  return (
    <>
      <label>
        <p>I am trying to practice with the <i>useDeferredValue</i> hook, but then I got distracted on useEffect vs useCallback, and on how to prevent useEffect from calling the first render.</p>

        <div>Loading: {loading ? "yes" : "no"}</div>
        <input type="button" value={counter} onClick={fetchData} />
      </label>
      <div className="results">
        <Suspense fallback={<h2>Loading...</h2>}>
          <SearchResults counter={counter} data={data} />
        </Suspense>
      </div>
    </>
  );
}


function SearchResults({data, counter}) {
    return (
        <div className="SearchResults">
          <div>counter: {counter}</div>
          <div>data: {data.join(", ")}</div>
        </div>
    );
}
