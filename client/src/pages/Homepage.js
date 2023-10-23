import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const Homepage = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"Home"}>
      <pre>{JSON.stringify(auth, null, 1)}</pre>
      <h1>homepage</h1>
    </Layout>
  );
};

export default Homepage;
