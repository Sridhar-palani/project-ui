import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { ChevronsUpDown, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const CreateForm = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([
    {
      product_description: "",
      product_length: "",
      product_width: "",
      qty: "",
      rate: "",
    },
  ]);

  const hsn_code = [
    { label: "998898", value: "998898" },
    { label: "997212", value: "997212" },
    { label: "73084000", value: "73084000" },
  ] as const;

  const productSchema = z.object({
    product_description: z
      .string({
        invalid_type_error: "Product description must be a string",
        required_error: "Product description is required",
      })
      .min(1, "Product description must be at least 1 character"),
    product_length: z
      .number({
        invalid_type_error: "Product length must be a number",
        required_error: "Product length is required",
      })
      .min(0, "Product length must be greater than or equal to 0"),
    product_width: z
      .number({
        invalid_type_error: "Product width must be a number",
        required_error: "Product width is required",
      })
      .min(0, "Product width must be greater than or equal to 0"),
    qty: z
      .number({
        invalid_type_error: "Quantity must be a number",
        required_error: "Quantity is required",
      })
      .min(0, "Quantity must be greater than or equal to 0"),
    rate: z.number({
      invalid_type_error: "Rate must be a number",
      required_error: "Rate is required",
    }),
  });

  const formSchema = z.object({
    to: z
      .string()
      .min(2, "To is required")
      .max(500, "To must be less than or equal to 500 characters"),
    e_way_no: z
      .number({
        invalid_type_error: "E-way no must be a number",
      })
      .min(2, "E-way no must be greater than or equal to 2")
      .max(30, "E-way no must be less than or equal to 30"),
    party_dc_no: z
      .number({
        invalid_type_error: "Party DC no must be a number",
        required_error: "Party DC no is required",
      })
      .min(2, "Party DC no must be greater than or equal to 2")
      .max(30, "Party DC no must be less than or equal to 30"),
    party_dc_date: z.date({
      invalid_type_error: "Party DC date must be a valid date",
      required_error: "Party DC date is required",
    }),
    party_gstin: z
      .string({
        invalid_type_error: "Party GSTIN must be a string",
        required_error: "Party GSTIN is required",
      })
      .min(1, "Party GSTIN is required"),
    our_dc_no: z
      .string({
        invalid_type_error: "Our DC no must be a string",
        required_error: "Our DC no is required",
      })
      .min(1, "Our DC no is required"),
    hsn_code: z
      .string({
        invalid_type_error: "HSN code must be a string",
        required_error: "HSN code is required",
      })
      .min(1, "HSN code is required"),
    products: z.array(productSchema).min(1, "At least one product is required"),
    material_value: z.number({
      invalid_type_error: "Material value must be a number",
      required_error: "Material value is required",
    }),
    total_weight: z
      .number({
        invalid_type_error: "Total weight must be a number",
        required_error: "Total weight is required",
      })
      .min(0, "Total weight must be greater than or equal to 0"),
    vehicle_no: z.string().min(1, "Vehicle no is required"),
    handling_charges: z
      .number({
        invalid_type_error: "Handling charges must be a number",
      })
      .min(0, "Handling charges must be greater than or equal to 0"),
    cgst: z
      .number({
        invalid_type_error: "CGST must be a number",
        required_error: "CGST is required",
      })
      .min(0, "CGST must be greater than or equal to 0"),
    sgst: z
      .number({
        invalid_type_error: "SGST must be a number",
        required_error: "SGST is required",
      })
      .min(0, "SGST must be greater than or equal to 0"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        product_description: "",
        product_length: "",
        product_width: "",
        qty: "",
        rate: "",
      },
    ]);
    form.resetField("products");
  };

  const handleRemoveProduct = (index: number) => {
    if (products.length > 1) {
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        newProducts.splice(index, 1);
        return newProducts;
      });
    }
  };

  return (
    <div style={{ minHeight: "90vh" }}>
      <div className="flex flex-col items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-[60%]"
          >
            <Tabs
              defaultValue="buyerinfo"
              className="flex flex-col p-10 mt-5 border border-grey"
              style={{ minHeight: "80vh"}}
            >
              <TabsList className="flex flex-row justify-between">
                <TabsTrigger value="buyerinfo">Order Details</TabsTrigger>
                <TabsTrigger value="productinfo">Items</TabsTrigger>
                <TabsTrigger value="additionalinfo">
                  Additional Details
                </TabsTrigger>
                <TabsTrigger value="commercialinfo">
                  Commercial Details
                </TabsTrigger>
              </TabsList>
              <TabsContent value="buyerinfo">
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Textarea
                          placeholder="Enter buyer details"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="e_way_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E way No</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input placeholder="Enter e way no" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="party_dc_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Party DC No</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input placeholder="Enter party dc no" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="party_dc_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Party DC Date</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input
                          placeholder="Enter party dc date"
                          {...field}
                          value={
                            field.value instanceof Date
                              ? field.value.toISOString()
                              : field.value
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="party_gstin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Party GSTIN</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input placeholder="Enter party gstin" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="our_dc_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Our DC No</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input placeholder="Enter our dc no" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hsn_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HSN Code</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl style={{ position: "relative" }}>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? hsn_code.find(
                                      (hsn_code) =>
                                        hsn_code.value === field.value
                                    )?.label
                                  : "Select HSN Code"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandList>
                                <CommandGroup>
                                  {hsn_code.map((hsn_code) => (
                                    <CommandItem
                                      value={hsn_code.label}
                                      key={hsn_code.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "hsn_code",
                                          hsn_code.value
                                        );
                                        setOpen(false);
                                      }}
                                    >
                                      {/* <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              hsn_code.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          /> */}
                                      {hsn_code.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="productinfo">
                {products.map((_product, index) => (
                  <div key={index}>
                    <FormField
                      control={form.control}
                      name={`products.${index}.product_description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Description</FormLabel>
                          <FormControl style={{ marginBottom: 16 }}>
                            <Input
                              placeholder="Enter product details"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`products.${index}.product_length`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Length</FormLabel>
                          <FormControl style={{ marginBottom: 16 }}>
                            <Input
                              placeholder="Enter product length"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`products.${index}.product_width`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Width</FormLabel>
                          <FormControl style={{ marginBottom: 16 }}>
                            <Input
                              placeholder="Enter product width"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`products.${index}.qty`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl style={{ marginBottom: 16 }}>
                            <Input placeholder="Enter quantity" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`products.${index}.rate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rate</FormLabel>
                          <FormControl style={{ marginBottom: 16 }}>
                            <Input placeholder="Enter rate" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="grid justify-center">
                      <Button
                        className="p-5 m-2"
                        onClick={() => handleRemoveProduct(index)}
                        style={
                          products.length <= 1 ? { display: "none" } : undefined
                        }
                      >
                        <Minus className="mr-2 h-4 w-full" /> REMOVE PRODUCT
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="grid justify-center">
                  <Button className="p-5 m-2" onClick={handleAddProduct}>
                    <Plus className="mr-2 h-4 w-full" /> ADD PRODUCT
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="additionalinfo">
                <FormField
                  control={form.control}
                  name="material_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Value</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input placeholder="Enter material value" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total_weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Weight</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input placeholder="Enter total weight" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicle_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle No</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input placeholder="Enter vehicle no" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="commercialinfo">
                <FormField
                  control={form.control}
                  name="handling_charges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Handling charges</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input
                          placeholder="Enter handling charges"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cgst"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CGST</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input placeholder="Enter cgst" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sgst"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SGST</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input placeholder="Enter sgst" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </form>
        </Form>
        <div className="mt-5">
          <Button
            type="submit"
            style={{
              display: "block",
              margin: "0 auto",
              marginBottom: "16px",
            }}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};
