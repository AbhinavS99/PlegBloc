import React, { useEffect, useState } from "react";
import { getUserInfo, isAuthenticated } from "../auth/helper";
import { getAllCampaigns } from "../eth_scripts/core";
import Common from "./Common";

const PersonalCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (isAuthenticated()) {
      const curr_user = getUserInfo();
      const curr_email = curr_user.email;
      getAllCampaigns().then((inp_campaigns) => {
        console.log(inp_campaigns);
        console.log(inp_campaigns.length);
        let final_camps = [];
        inp_campaigns.forEach((camp) => {
          if (camp.creator_email === curr_email) {
            final_camps.push(camp);
          }
        });
        console.log(final_camps);
        setCampaigns(final_camps);
      });
    }
  }, []);

  return (
    <div>
      <Common title="My Campaigns" data={campaigns} />
    </div>
  );
};

export default PersonalCampaigns;
