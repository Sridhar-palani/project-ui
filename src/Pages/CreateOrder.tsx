import { CreateForm } from "@/components/CreateForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";

export const CreateOrder = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <CreateForm />
      <Footer />
    </>
  );
};
