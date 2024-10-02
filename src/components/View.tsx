import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "../App.css";

type MetaData = {
  length: number;
  width: number;
};

type Item = {
  meta_data: MetaData;
  quantity: number;
  material_value: number;
  total_weight: number;
  rate: number;
  amount: number;
  image: string;
};

type OrderType = {
  to: string;
  e_way_no: string;
  dc_no: number;
  invoice_no: number;
  date: string;
  party_dc_no: number;
  party_dc_date: string;
  party_gstin: string;
  hsn_code: number;
  product_description: string;
  items: Item[];
  vehicle_no: string;
  handling_charges: number;
  cgst: number;
  sgst: number;
  net_total: number;
  gross_total: number;
  total_weight?: number;
};

export const View = ({ data }: { data: OrderType }) => {
  return (
    <Tabs defaultValue="info" className="w-[50%]">
      <TabsList className="w-[100%] bg-indigo-300 flex justify-around ">
        <TabsTrigger className="hover:bg-white  text-black " value="info">
          ORDER INFO
        </TabsTrigger>
        <TabsTrigger className="hover:bg-white  text-black " value="items">
          ITEMS
        </TabsTrigger>
        <TabsTrigger className="hover:bg-white text-black " value="Amount">
          COMMERCIAL INFO
        </TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <Orderinfo data={data} />
      </TabsContent>
      <TabsContent value="items">
        <Items data={data} />
      </TabsContent>
      <TabsContent value="Amount">
        <Commercial data={data} />
      </TabsContent>
    </Tabs>
  );
};

const Items = ({ data }: { data: OrderType }) => {
  return (
    <>
      {data.items?.length > 0 ? (
        data.items.map((orders, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value="items">
              <AccordionTrigger>
                <h4 className="font-semibold">Item No: {index + 1}</h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="lables">
                  <label className=" font-semibold p-2 flex-1 ">
                    Quantity:
                    <input
                      className="border rounded w-full p-2 font-normal bg-transparent"
                      type="text"
                      value={orders.quantity}
                      typeof="readOnly"
                    />
                  </label>
                </div>
                <div className="lables">
                  <label className="  font-semibold flex-1 p-2">
                    Length:
                    <input
                      type="text"
                      className="border rounded p-2 w-full font-normal bg-transparent"
                      value={orders.meta_data?.length || "N/A"}
                      typeof="readOnly"
                    />
                  </label>
                </div>
                <div className="lables">
                  <label className="  font-semibold flex-1 p-2">
                    Width:
                    <input
                      type="text"
                      className="border rounded p-2 w-full font-normal bg-transparent"
                      value={orders.meta_data?.width || "N/A"}
                      typeof="readOnly"
                    />
                  </label>
                </div>
                <div className="lables">
                  <label className="  font-semibold flex-1 p-2">
                    Material_Value:
                    <input
                      type="text"
                      className="border rounded p-2 w-full font-normal bg-transparent"
                      value={orders.material_value}
                      typeof="readOnly"
                    />
                  </label>
                </div>
                <div className="lables">
                  <label className="  font-semibold flex-1 p-2">
                    Rate:
                    <input
                      type="text"
                      className="border rounded p-2 w-full font-normal bg-transparent"
                      value={orders.rate}
                      typeof="readOnly"
                    />
                  </label>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium">Image:</span>
                  <span className="font-bold">{orders.image}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))
      ) : (
        <span>No items available</span>
      )}
    </>
  );
};
const Orderinfo = ({ data }: { data: OrderType }) => {
  const date = new Date(data.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <div>
        <div className="lables">
          <label className=" font-semibold flex-1 p-2">
            To:
            <textarea
              rows={3}
              className="border rounded w-full p-2 font-normal bg-transparent"
              value={data.to}
              typeof="readOnly"
            />
          </label>
        </div>
        <div className="lables">
          <label className=" font-semibold p-2 flex-1 ">
            E-way No:
            <input
              className="border rounded w-full p-2 font-normal bg-transparent"
              type="text"
              value={data.e_way_no}
              typeof="readOnly"
            />
          </label>
        </div>
        <div className="lables">
          <label className=" font-semibold flex-1 p-2">
            Date:
            <input
              type="text"
              className="border rounded p-2 w-full font-normal bg-transparent"
              value={formattedDate}
              typeof="readOnly"
            />
          </label>
        </div>
        <div className="lables">
          <label className="font-semibold flex-1 p-2">
            Party DC No:
            <input
              type="text"
              className="border rounded p-2 w-full font-normal bg-transparent"
              value={data.dc_no}
              typeof="readOnly"
            />
          </label>
        </div>
        <div className="lables">
          <label className="font-semibold flex-1 p-2">
            Party GSTIN:
            <input
              type="text"
              className="border rounded p-2 w-full font-normal bg-transparent"
              value={data.party_gstin}
              typeof="readOnly"
            />
          </label>
        </div>
        <div className="lables">
          <label className="font-semibold flex-1 p-2">
            HSN Code:
            <input
              type="text"
              className="border rounded p-2 w-full font-normal bg-transparent"
              value={data.hsn_code}
              typeof="readOnly"
            />
          </label>
        </div>
        <div className="lables">
          <label className="font-semibold flex-1 p-2">
            Product Description:
            <input
              type="text"
              className="border rounded p-2  w-full font-normal bg-transparent"
              value={data.product_description}
              typeof="readOnly"
            />
          </label>
        </div>
        <div className="lables">
          <label className="font-semibold flex-1 p-2">
            Vehicle No:
            <input
              type="text"
              className="border rounded p-2 w-full font-normal bg-transparent"
              value={data.vehicle_no}
              typeof="readOnly"
            />
          </label>
        </div>
      </div>
    </>
  );
};

const Commercial = ({ data }: { data: OrderType }) => {
  return (
    <>
      <div className="lables">
        <label className=" font-semibold p-2 flex-1 ">
          Handling Charges:
          <input
            className="border rounded w-full p-2 font-normal bg-transparent"
            type="text"
            value={data.handling_charges}
            typeof="readOnly"
          />
        </label>
      </div>
      <div className="lables">
        <label className="  font-semibold flex-1 p-2">
          Net Total:
          <input
            type="text"
            className="border rounded p-2 w-full font-normal bg-transparent"
            value={data.net_total}
            typeof="readOnly"
          />
        </label>
      </div>
      <div className="lables">
        <label className="  font-semibold flex-1 p-2">
          CGST:
          <input
            type="text"
            className="border rounded p-2 w-full font-normal bg-transparent"
            value={data.cgst}
            typeof="readOnly"
          />
        </label>
      </div>
      <div className="lables">
        <label className="  font-semibold flex-1 p-2">
          SGST:
          <input
            type="text"
            className="border rounded p-2 w-full font-normal bg-transparent"
            value={data.sgst}
            typeof="readOnly"
          />
        </label>
      </div>
      <div className="lables">
        <label className="  font-semibold flex-1 p-2">
          Total Weight:
          <input
            type="text"
            className="border rounded p-2 w-full font-normal bg-transparent"
            value={data.total_weight}
            typeof="readOnly"
          />
        </label>
      </div>
      <div className="flex justify-between py-1 border-t m-5 text-lg">
        <span className="font-medium">Gross Total:</span>
        <span className="font-bold">{data.gross_total}</span>
      </div>
    </>
  );
};
