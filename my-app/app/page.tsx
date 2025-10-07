import Image from "next/image";
import styles from "./page.module.css";
import MapComponent from '@/components/MapComponent';
import { TaxAssessors } from '@/components/TestQuery';


export default function Home() {
  return (
    <div>
        <h1>This is the real estate project</h1>
        <MapComponent/>

        <h2>Tax Assessors Data</h2>
        <TaxAssessors />
    </div>
  );
}
