import { useEffect, useState } from 'react'
import './App.css'
import LoginButton from './assets/components/LoginButton';
import LogoutButton from './assets/components/LogoutButton';
import Profile from './assets/components/Profile';
import {useAuth0} from '@auth0/auth0-react'

function App() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const {isLoading} = useAuth0();

  if(isLoading) return <div>is loading ...</div>;

  useEffect(()=>{
    fetch('https://wger.de/api/v2/exerciseinfo/')
    .then((response) => {
      if(!response.ok){
        throw new Error(
          `This is an HTTP error: the status is ${response.status}`
        );
      }
      return response.json()})
    .then((actualData) => {
      setData(actualData.results)
      setError(null);
    })
    .catch((err) => {
      console.log(err.message);
    })
  },[])

  return (
    <div className="App">
    <h1>Exercise App</h1>
    <LoginButton />
    <LogoutButton />
    <Profile />
    {error && (
      <div>{`There is a problem fetching your data - ${error} `}</div>
    )}
    <ul>
      {data && data.map( data => {
        return <li key={data.id}>
          <h3>{data.name}</h3>
        </li>
      })}
    </ul>
      
    </div>
  )
}

export default App
