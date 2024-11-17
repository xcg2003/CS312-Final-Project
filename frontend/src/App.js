import React, {useEffect, useState} from 'react';

function App(){
  const [data, setdata] = useState(null);

  useEffect(() => {
    fetch('https://localhost:3000/register')
    .then((response) => response.data)
    .then((data) => setdata(data))
    .catch((error) => console.error('Error: ',error));
      
  }, []);
  return(
    <div>
      <h1>TESTING</h1>
    </div>
  );
};

export default App;
