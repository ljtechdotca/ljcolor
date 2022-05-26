import type { NextPage } from "next";
import Head from "next/head";
import ColorPicker from "../components/ColorPicker";
import Container from "../components/Container";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.root}>
      <Head>
        <title>ljcolor | Color Picker</title>
        <meta
          name="description"
          content="An easy-to-use tool for picking colors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <ColorPicker />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
