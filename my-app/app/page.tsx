import Image from "next/image";
import styles from "./page.module.css";
import MapComponent from '@/components/MapComponent';


export default function Home() {
  return (
    <div>
        <h1>This is the real estate project</h1>
        <MapComponent/>
    </div>
  );
}
