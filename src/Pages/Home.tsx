import "../App.css";
import { Hero } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";


export const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <div className="flex justify-center">
      
      </div>
      <div className="absolute w-full top-[95%]">
        <Footer />
      </div>
    </>
  );
};
