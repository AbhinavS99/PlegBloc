import React, { useEffect, useState } from "react";
import Common from "./Common";
import { injectMetaMask } from "../eth_scripts/core";

const AllContracts = () => {
  useEffect( () => {injectMetaMask()}, [])
  return (
    <>
      <Common title="Active Campaigns" data={[]} />
    </>
  );
};

export default AllContracts;
