import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Notes from './components/Notes';
import MyEditor from './components/Editor';

function App() {
  return (
    <div className='flex flex-row flex-wrap w-full h-full bg-primary'>
      <Sidebar />
      <Notes />
      <MyEditor />

      <Outlet />
    </div>
  );
}

export default App; 