import logo from './logo.svg';
import './App.css';
import DeferredApp from './DeferredApp/DeferredApp';
import PasswordGameApp from './PasswordGameApp/PasswordGameApp';
import TimerApp from './TimerApp/TimerApp';
import RenderChildrenApp from './RenderChildrenApp/RenderChildrenApp';
import CssApp from './CssApp/CssApp';
import Soundboard from './Soundboard/Soundboard';

function App() {
  return (
    <div className="App">
      {/* <DeferredApp /> */}
    {/* <PasswordGameApp /> */}
    {/* <TimerApp /> */}

    {/* <RenderChildrenApp /> */}
      <Soundboard  />

    </div>
  );
}

export default App;
