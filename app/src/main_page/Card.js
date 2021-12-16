import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  const onDetailClick = (e) => {
    e.preventDefault();
    navigate("/campaignDetail", {
      state: {
        manager: props.manager,
        campaignAddress: props.campaignAddress,
        campaign: props.campaign,
      },
    });
  };

  return (
    <>
      <div
        className="col-md-4 col-12 mx-auto"
        style={{
          width: 15 + "rem",
          height: 15 + "rem",
          marginBottom: 6 + "rem",
        }}
      >
        <div className="card">
          <img
            src={props.imgsrc}
            className="card-img-top img-fluid"
            alt={props.imgsrc}
          />
          <div className="card-body">
            <h5 className="card-title font-weight-bold">{props.title}</h5>
            <p className="card-text">{props.des}</p>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => onDetailClick(e)}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
