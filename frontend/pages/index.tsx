import React from 'react';
import Footer from '../components/Footer';
import { useHelloQuery } from '../generated/graphql';

export default function Home() {
  const [result, reexecuteQuery] = useHelloQuery();

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>No data found...</p>;

  return (
    <>
      <div>Home Page</div>
      <p>{data.hello}</p>
      <div className={'waves'} />
    </>
  );
}
