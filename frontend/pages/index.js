import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Stack } from "react-bootstrap";

import NavbarInd from "../components/index/navbar";
import Base from "../components/index/base";

export default function Home() {
  return (
    <div>
      <Stack gap={3}>
        <NavbarInd />
        <Base />
      </Stack>
    </div>
  );
}
