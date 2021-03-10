import './App.css';
import { Button } from "@material-ui/core";
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return (
    <Button variant="contained" color="primary" onClick={() => setCount(count + 1)}>
      Clicked {count} times!
    </Button>
  );
}

export default App;
