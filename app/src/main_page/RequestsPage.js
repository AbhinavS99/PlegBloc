import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { fetchAllRequests } from "../eth_scripts/core";

function RequestsPage() {
  const { state } = useLocation();
  const { manager, campaignAddress, campaign, role } = state;

  const [visib, setVisib] = useState("visible");

  useEffect(() => {
    if (isAuthenticated()) {
      fetchAllRequests(campaignAddress).then((requests) => {
        if (requests.length != 0) {
          console.log(requests);
          setVisib("hidden");
        } else {
          alert("boom");
        }
      });
    }
  }, []);

  return (
    <div>
      <div className="my-5">
        <h1 className="text-center">Requests</h1>
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
