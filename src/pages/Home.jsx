import React from "react";
import Layout from "../component/Layout";
import Navbar from "../component/nav/Navbar";
import TaskList from "../component/task/TaskList";

function Home() {
  return (
    <>
    
      <Layout>
        <Navbar />
        <hr />
        <TaskList />
      </Layout>
    </>
  );
}
export default Home;
