import { useMutation } from "@tanstack/react-query";

export const usePostOrder = () => {
  const postJobs = async () => {
    const response = await fetch(`http://localhost:5000/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: 100,
        e_way_no: 300,
        date: "2024-09-18",
        party_dc_no: "asdf",
        party_dc_date: "2024-09-18",
        party_gstin: "22ABCDE1234F2Z5",
        hsn_code: "998898666",
        product_description: "345",
        items: [
          {
            quantity: "45",
            meta_data: {
              length: "5",
              width: 235,
            },
            material_value: "45000",
            rate: 0.15,
            image: "jhvjb,j",
          },
          {
            quantity: 123,
            meta_data: {
              length: 15,
              width: 35,
            },
            material_value: 5000,
            total_weight: 100,
            rate: 1,
            image: "hgcjhgcjhyc",
          },
        ],
        vehicle_no: 455,
        total_weight: 333,
        handling_charges: 0.5,
        cgst: 6,
        sgst: 6,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }
    return response.json();
  };

  return useMutation({
    mutationKey: ["jobs"],
    mutationFn: postJobs,
  });
};
