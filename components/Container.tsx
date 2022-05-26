import { FC, ReactNode } from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <header className={styles.base}>https://ljcolor.vercel.app</header>
      {children}
    </div>
  );
};

export default Container;
