import styles from "./page.module.css"
import logo from "../assets/images/logo.png"
import Image from "next/image";
import Menu from "./components/Menu";

export default function Home() {

  return (
    <main className={styles.main}>

      <div>
        <Image
          src={logo}
          alt="Who wants-to be a millonaire logo"
          width={300}
          height={300}
          className={styles.logo}
          quality={50}
        />
      </div>

      <Menu />

    </main>
  );
}
