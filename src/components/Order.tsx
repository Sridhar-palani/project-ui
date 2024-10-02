import React, { useEffect } from "react";
import { CreateForm } from "./CreateForm";
import { usePostOrder } from "@/hooks/usePostOrder";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { Details } from "@/Pages/details";

type OrderProps = {
  type: "Create" | "Update" | "View";
  order?: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Order = ({ order, type }: OrderProps) => {
  const { mutate, isSuccess } = usePostOrder();

  const handleFormCreation = () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Order created successfully");
    }
  }, [isSuccess]);

  return (
    <div>
      {type === "View" && (
        <>
          <Details/>
        </>
      )}
      {type === "Create" && (
        <div>
          {/* <button onClick={handleFormCreation}>Create</button>
          <button>Cancel</button> */}
          <NavBar />
          <CreateForm />
          <Footer />
        </div>
      )}

      {/* {type === "Update" && (
        <div>
          <button>Update</button>
          <button>Cancel</button>
        </div>
      )} */}

      {/* <input readOnly={type === "View"} />
      <button></button> */}
    </div>
  );
};
