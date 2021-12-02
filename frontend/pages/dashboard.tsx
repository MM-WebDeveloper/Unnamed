import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context';

interface dashboardProps {}

const dashboard: React.FC<dashboardProps> = ({}) => {

  const {state, setState} = useContext(UserContext)

  return <div><h1>Dashboard Page</h1><p>{state.accessToken}</p><button onClick={() => setState({accessToken: 'hello'})}>Set</button></div>;
};
export default dashboard;
