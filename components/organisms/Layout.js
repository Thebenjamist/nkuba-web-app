import Head from "next/head";
import AppBar from "./AppBarTop";
import ContainerMain from "../atoms/ContainerMain";
import Body from "../atoms/Body";
import { UserContext } from "../../services/contexts/userContext";
import React from "react";
import Loading from "./Loading";

const Layout = ({ children }) => {
  const { session } = React.useContext(UserContext);

  return (
    <>
      <Head>
        <title>Nkuba Logistics</title>
        <link rel="shortcut icon" href="images/icons/bolt.png" />
      </Head>

      <Body>
        <AppBar />
        <ContainerMain>
          {session === "loading" ? <Loading /> : children}
        </ContainerMain>
      </Body>
    </>
  );
};

export default Layout;
