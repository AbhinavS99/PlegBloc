import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { fetchAllRequests } from "../eth_scripts/core";
import Request_Card from "./Request_Card";

function RequestsPage() {
  const { state } = useLocation();
  const { manager, campaignAddress, campaign, role } = state;

  const [visib, setVisib] = useState("visible");
  const [requestMain, setRequestMain] = useState([]);
  const [approvers, setApprovers] = useState([]);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchAllRequests(campaignAddress).then(({ requests, approvers }) => {
        if (requests.length !== 0) {
          console.log(requests);
          setApprovers(approvers);
          setVisib("hidden");
          setRequestMain(requests);
        } else {
          alert("Some Unexpected Error occured. :/");
        }
      });
    }
  }, []);

  return (
    <div>
      <div className="my-5">
        <h1 className="text-center">Requests</h1>
      </div>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row gy-4">
              {requestMain.map((val, ind) => {
                return (
                  <Request_Card
                    complete={val.complete ? "complete" : "incomplete"}
                    description={val.description}
                    ind={ind}
                    key={ind}
                    request={val}
                    role={role}
                    approvers={approvers}
                    campaignAddress={campaignAddress}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <div
          className="spinner-border"
          role="status"
          style={{ width: 5 + "rem", height: 5 + "rem", visibility: visib }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default RequestsPage;
