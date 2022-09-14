import Head from "next/head";
import AppBar from "./AppBarTop";
import ContainerMain from "../atoms/ContainerMain";
import Body from "../atoms/Body";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Nkuba Logistics</title>
      <link rel="shortcut icon" href="images/icons/bolt.png" />
    </Head>

    <Body>
      <AppBar />
      <ContainerMain>{children}</ContainerMain>
    </Body>
  </>
);

export default Layout;
