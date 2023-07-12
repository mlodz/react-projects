import './style.css';

import { useMemo, useRef, useState, useEffect, useCallback, memo } from 'react';
import { useTimeout, useDebounce, useDebouncedSearchQuery } from '../hooks/hooks';

/*
  How do you avoid re-rendering a dynamic list of children?

  1. wrap the component definition with React.memo (see def of Fruit)
  2. Use useCallback for the function inside. If you don't pass a
  dependency, it won't work, and the callback will be different every
  time causing a re-render. Don't include "selected" as a dependency, because
  then every time we click, they all re-render. Use the old-new value
  version of setSelected so it doesn't need to be a dep.

 */


export default function RenderChildrenApp() {
  let renderCount = useRef(0);
  let [counter, setCounter] = useState(0);
  let [selected, setSelected] = useState(new Set(["Peach"]));
  let [query, setQuery] = useState('');

  let {data, loading} = useDebouncedSearchQuery('example.com', 500, query);

  renderCount.current = renderCount.current + 1;

  const handleSelected = useCallback((name) => {
    setSelected(p => {
      let newSelected = new Set([...p]);
      if (newSelected.has(name)) {
        newSelected.delete(name);
      } else {
        newSelected.add(name);
      }
      return newSelected;
    });
  }, []);


  /*
  let {clear, reset} = useTimeout(() => {
    console.log('my timeout is done');
  }, 3000);
  */

  let {cancel} = useDebounce(() => {
    console.log('################ renderCount was changed');
  }, 1000, [counter]);


  let fruits = [
    "Strawberry",
    "Blueberry",
    "Peach",
    "Apple",
    "Banana",
    "Grape",
    "Raspberry",
  ];

  console.log({selected});


  let selectedMessage = [...selected].sort().join(":");

  return (
    <div className="RenderChildren box1">
      Counter: {renderCount.current}
      <br />
      RenderCount: {counter}
      <br />
      Selected: {[...selected].join(", ")}
      <br />
      <button onClick={e => setCounter(p => p+1)} >Count++</button>

      <Message message={selectedMessage}/>

      {fruits.map(f =>
        <Fruit key={f}
               isSelected={selected.has(f)}
               name={f}
               onClick={handleSelected} />
      )}

      <hr />
      {/*
      <button onClick={clear}>clear timeout</button>
      <button onClick={reset}>reset timeout</button>
       */}
      <button onClick={cancel}>cancel debounce</button>

      <hr />
      <input onChange={e => setQuery(e.target.value)}/>
      <div>Query: {query}</div>
      <div>Data: {data}</div>
      <div>Loading: {loading ? 'yes' : 'no'}</div>
    </div>
  );
}

const Message = memo(function({message}) {
  let renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;



  return (
    <div className="box1">
      <h4>Message: {message}</h4>
      <div>Render Count: {renderCount.current}</div>
    </div>
  );
});

const Fruit = memo(function({name, onClick, isSelected}) {
  let renderCount = useRef(0);
  let classes = ['fruit', 'box1'];
  if (isSelected) {
    classes.push('selected');
  }

  renderCount.current = renderCount.current + 1;
  console.log('RENDER ', name);
  return (
    <div className={classes.join(" ")} onClick={e => onClick && onClick(name)}>
      <ul>
        <li>Name: {name}</li>
        <li>Render Count: {renderCount.current}</li>
      </ul>
    </div>
  );
});
