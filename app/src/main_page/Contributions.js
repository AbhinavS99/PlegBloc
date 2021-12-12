import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Common from "./Common";
import { getMyContributedCampaigns } from "../eth_scripts/core";

const Contributions = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [visib, setVisib] = useState("visible");

  useEffect(() => {
    if (isAuthenticated()) {
      // need campaigns where current user is a backer (check from backers map in contract)
      // final list -> final_campaigns
      // setCampaigns(final_campaigns);
      getMyContributedCampaigns().then( (campaigns) =>{
        setVisib("hidden");
        setCampaigns(campaigns);
        console.log(campaigns);
      });
    }
  }, []);

  return (
    <div>
      <Common title="My Contributions" data={campaigns} />
      <div class="text-center">
        <div
          class="spinner-border"
          role="status"
          style={{ width: 5 + "rem", height: 5 + "rem", visibility: visib }}
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Contributions;
