import Image from "next/image";
import DynamicMap from "./components/DynamicMap";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
     <DynamicMap />
    </main>
  );
}
