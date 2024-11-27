import './App.css';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';


function App() {
  return (
      <div className="flex">
        <div>
          <Sidebar/>
        </div>
        <div className='basis-[100%]'>
          <div>
            <Outlet>
            </Outlet>
          </div>
        </div>
      </div>
  );
}

export default App;