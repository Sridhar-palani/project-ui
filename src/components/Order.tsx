import { useEffect } from "react";
import { CreateForm } from "./CreateForm";
import { View } from "./View";
import { useParams } from "react-router-dom";
import { useGetJobsById } from "@/hooks/useGetorder";
import { usePostOrder } from "@/hooks/usePostOrder";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

type OrderProps = {
  type: "Create" | "Update" | "View";
  order?: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Order = ({ order, type }: OrderProps) => {
  const { id } = useParams();
  console.log(id);
  const { data, isLoading, isError, error } = useGetJobsById(id);
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
        <div>
          <button>Generate Invoice</button>
          <button>Generate DC</button>
          <button>Update Order</button>

          <View data={data} />
        </div>
      )}
      {/* {type === "Create" && (
        <div>
          <NavBar/>
          <CreateForm />
          <Footer/>
        </div>
      )} */}

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