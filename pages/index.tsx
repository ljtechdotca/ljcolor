import type { NextPage } from "next";
import Head from "next/head";
import ColorPicker from "../components/ColorPicker";
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

      <main className={styles.main}>
        <ColorPicker height={240} />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
