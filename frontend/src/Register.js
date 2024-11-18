import React, { useEffect, useState } from 'react';
import RegistrationForm from './Components/RegistrationForm';

function Register() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/register')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data); // Use the data here
      })
      .catch((error) => console.error('Error: ', error));
  }, []);

  return (
    <div>
      <h1>Welcome to the app test</h1>
      <RegistrationForm />
    </div>
  );
}

export default Register;
