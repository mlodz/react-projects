import {useState, useRef, useEffect} from 'react';


function useTimeout(callback, ms) {
  let timeout = useRef();
  console.log('init useTimeout');
  const set = () => {
    console.log('set timeout, existing:', timeout.current);
    if (!timeout.current) {
      timeout.current = setTimeout(callback, ms);
    }
  };

  const clear = () => {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = null;
  };
  const reset = () => {
    clear();
    set();
  };

  set();

  return {
    clear, reset,
  };
}

function useDebounce(callback, ms, deps) {
  let {reset, clear} = useTimeout(callback, ms);
  console.log('useDebounce init');
  useEffect(() => {
    console.log('useDebounce reset');
    reset();
  }, deps);

  return {cancel: clear};
}

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function mockSearchQuery(url, query) {
  await sleep(1000);
  return `${query}:${Math.floor(100*Math.random())}`;
}

function useDebouncedSearchQuery(url, ms, query) {

  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let firstRender = useRef(true);

  // TODO: race condition bug, earlier but slower result will
  // override later result

  useDebounce(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setLoading(true);
    mockSearchQuery(url, query)
      .then(result => {
        setLoading(false);
        setData(result);
      })
      .catch(error => {
        console.error('Error in useDebounceSearchQuery', error);
      });

  }, ms, [query]);

  return {data, loading};

}


export {
  useTimeout,
  useDebounce,
  useDebouncedSearchQuery,
}
