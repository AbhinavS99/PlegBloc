import React, { useEffect, useState } from "react";
import Common from "./Common";
import { getAllCampaigns } from "../eth_scripts/core";
import { isAuthenticated } from "../auth/helper";

const AllContracts = () => {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    if (isAuthenticated()) {
      getAllCampaigns().then((inp_campaigns) => {
        console.log(inp_campaigns);
        setCampaigns(inp_campaigns);
      });
    }
  }, []);

  return (
    <>
      <Common title="Active Campaigns" data={campaigns} />
    </>
  );
};

export default AllContracts;
