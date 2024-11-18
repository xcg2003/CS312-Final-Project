import React, {useEffect, useState} from 'react';
import RegistrationForm from './Components/RegistrationForm';

function App(){
  const [data, setdata] = useState(null);

  useEffect(() => {
    fetch('https://localhost:5000/register')
    .then((response) => response.data)
    .then((data) => setdata(data))
    .catch((error) => console.error('Error: ',error));
      
  }, []);
  return(
    <div>
      <h1>Welcome to the app test</h1>
      <RegistrationForm />
    </div>
  );
};

export default App;
