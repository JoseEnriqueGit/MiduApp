import { useState } from 'react';
// Component
import { Main } from './components/main';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <main className='flex justify-center w-full'>
      <Main />
    </main>
  );
};

export default App;
