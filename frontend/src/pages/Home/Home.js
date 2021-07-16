import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>Home</h1>
      <h2>This is public page, anyone can be here</h2>
    </div>
  );
};

export default Home;
