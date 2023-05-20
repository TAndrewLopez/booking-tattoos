import HomeContent from "@/components/Home/HomeContent";
import HomeFooter from "@/components/Home/HomeFooter";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main className="absolute inset-0 overflow-x-hidden bg-shop bg-cover bg-center bg-no-repeat p-4">
      <div className="absolute inset-0 bg-black/60"></div>
      <HomeContent />
      <HomeFooter />
    </main>
  );
};

export default Home;
