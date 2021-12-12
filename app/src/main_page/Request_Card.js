import React, { useState } from "react";
import web from "../../src/images/img2.svg";
import { isAuthenticated } from "../auth/helper";
import { approveRequest, finalizeRequest } from "../eth_scripts/core";

function Request_Card(props) {
  const [isLoading, setLoading] = useState(false);

  const approveVoteClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isAuthenticated()) {
      const obj = await approveRequest(props.campaignAddress, props.ind);

      if (obj.approval_flag == 0) {
        alert("Request Already Approved");
      } else {
        alert("Request Approved Successfully. :)");
        window.location.reload(true);
      }
    }

    setLoading(false);
  };

  const finalizeClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isAuthenticated()) {
      if (2 * props.request.yes_count >= props.approvers) {
        let finalize_flag = await finalizeRequest(
          props.campaignAddress,
          props.ind
        );
        if (finalize_flag == 0) {
          alert("Some error occured.");
        } else {
          alert("Request Approved Successfully. :)");
          window.location.reload(true);
        }
      } else {
        alert("Majority should approve the request for it to be finalized.");
      }
    }
    setLoading(false);
  };
  return (
    <div
      class="card mb-3 ms-5 border-primary"
      style={{ maxWidth: 540 + "px", margin: 0 + "px", padding: 0 + "px" }}
      disabled={props.complete === "complete"}
    >
      {props.complete === "complete" && (
        <div
          className="card-header alert-danger"
          style={{ margin: 0 + "px", padding: 0 + "px" }}
        >
          Request #{props.ind} {" (Complete)"}
        </div>
      )}
      {props.complete === "incomplete" && (
        <div className="card-header alert-success">Request #{props.ind}</div>
      )}
      <div class="row g-0">
        <div class="col-md-4">
          <img src={web} class="img-fluid rounded-star mb-1" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <strong class="card-text">{props.request.description}</strong>
            <p class="card-text">
              <small class="text-muted">
                No. of Backers : {props.approvers}
              </small>
              <br />
              <small class="text-muted">
                No. of Votes : {props.request.yes_count}
              </small>
              <br />
              <small class="text-muted">
                Amount Requested: {props.request.value} Wei
              </small>
            </p>
            {props.role === "manager" && (
              <button
                className="btn btn-primary text-center"
                disabled={isLoading}
                onClick={finalizeClick}
              >
                <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  style={isLoading ? {} : { display: "none" }}
                  aria-hidden="true"
                ></span>
                {isLoading ? (
                  <span>Finalizing Request...</span>
                ) : (
                  <span>Finalize Request</span>
                )}
              </button>
            )}

            {props.role === "contributor" && (
              <button
                className="btn btn-primary text-center"
                disabled={isLoading}
                onClick={approveVoteClick}
              >
                <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  style={isLoading ? {} : { display: "none" }}
                  aria-hidden="true"
                ></span>
                {isLoading ? (
                  <span>Approving Request...</span>
                ) : (
                  <span>Approve Request</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Request_Card;
