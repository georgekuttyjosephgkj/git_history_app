import logo from './logo.svg';
import { Octokit } from "@octokit/core";
import './App.css';
import React, { useState, useEffect } from 'react';
import { FaHistory } from 'react-icons/fa';
const octokit = new Octokit({ auth: `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` });
const countInitialValue = 50;

function FetchData(callback) {
  octokit.request("/repos/georgekuttyjosephgkj/git_history_app/commits", { sha: "master" })
    .then((data) => {
      callback(data.data)
    })
}

function App() {
  const [commitData, setCommitData] = useState([])
  const [count, setCount] = useState(countInitialValue)
  const [refreshIconClass, setRefreshIconClass] = useState("headingContainer_right")
  useEffect(() => {
    FetchData((res) => {
      setCommitData(res)
    })
  }, [])
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count - 1)
      if (count <= 0) {
        setRefreshIconClass("headingContainer_right headingContainer_right_active")
        FetchData((res) => {
          setCommitData(res)
          setRefreshIconClass("headingContainer_right")
        })
        setCount(countInitialValue)
      }
    }, 1000);
    return () => clearInterval(timer);
  })
  const refreshIconClicked = () => {
    FetchData((res) => {
      setCount(countInitialValue)
      setCommitData(res)
    })
  }
  return (
    <div className="App">
      <div className="header">
        <div className="headingContainer">
          <div className="headingContainer_left">
            <div className="heading">GitCommitHistoryApp</div>
            <div className="quote">designedAndDevelopedByGeorge</div>
          </div>
          <div className={refreshIconClass} onClick={() => { refreshIconClicked() }}>
            <div className="counter">{count}</div>
            <div className="iconDiv" ><FaHistory /></div>
          </div>
        </div>
      </div>
      <div className="Content">
        {commitData.map((item) => {
          return (
            <div className="listItem">
              <div className="listItem_left">{item["commit"]["message"]}</div>
              <div className="listItem_right">
                <div className="listItem_right_author">{item["commit"]["author"]["name"]}</div>
                <div className="listItem_right_date">{item["commit"]["author"]["date"]}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
