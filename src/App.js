import logo from './logo.svg';
import { Octokit } from "@octokit/core";
import './App.css';
import React, { useState, useEffect } from 'react';
import { FaHistory } from 'react-icons/fa';
const octokit = new Octokit({ auth: `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` });
const countInitialValue = 10;

function FetchData(callback) {
  octokit.request("/repos/georgekuttyjosephgkj/git_history_app/commits", { sha: "master" })
    .then((data) => {
      callback(data.data)
    })
}

function App() {
  const [commitData, setCommitData] = useState([])
  const [count, setCount] = useState(countInitialValue)
  useEffect(() => {
    FetchData((res) => {
      setCommitData(res)
    })
  }, [])
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count - 1)
      if (count <= 0) {
        FetchData((res) => {
          setCommitData(res)
        })
        setCount(countInitialValue)
      }
    }, 1000);
    return () => clearInterval(timer);
  })
  return (
    <div className="App">
      <div className="header">
        <div className="headingContainer">
          <div className="headingContainer_left">
            <div className="heading">GitCommitHistoryApp</div>
            <div className="quote">designedAndDevelopedByGeorge</div>
          </div>
          <div className="headingContainer_right">
            <div className="counter animate__animated animate__bounce">{count}</div>
            <div className="iconDiv"><FaHistory /></div>
          </div>
        </div>
      </div>
      <div className="Content">
        {commitData.map((item) => {
          return (<div>{item["commit"]["message"]}</div>)
        })}
      </div>
    </div>
  );
}

export default App;
