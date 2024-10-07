import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Command,
  CommandEmpty,
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
import { Check, ChevronsUpDown, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePostOrder } from "@/hooks/usePostOrder";

export const CreateForm = () => {
  const { mutate, isLoading, error } = usePostOrder();
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

  const formSchema = z.object({
    to: z.string().min(2).max(500),
    e_way_no: z.number().min(2).max(30),
    party_dc_no: z.number().min(2).max(30),
    party_dc_date: z.string(),
    party_gstin: z.string(),
    our_dc_no: z.string(),
    hsn_code: z.string(),
    products: z.array(
      z.object({
        product_description: z.string(),
        product_length: z.number(),
        product_width: z.number(),
        qty: z.number(),
        rate: z.number(),
      })
    ),
    material_value: z.number(),
    total_weight: z.number(),
    vehicle_no: z.string(),
    handling_charges: z.number(),
    cgst: z.number(),
    sgst: z.number(),
  });

  function zodResolver(
    _formSchema: z.ZodObject<
      { to: z.ZodString; e_way_no: z.ZodNumber; party_dc_no: z.ZodNumber },
      "strip",
      z.ZodTypeAny,
      { to: string; e_way_no: number; party_dc_no: number },
      { to: string; e_way_no: number; party_dc_no: number }
    >
  ):
    | import("react-hook-form").Resolver<
        { to: string; e_way_no: number; party_dc_no: number },
        any
      >
    | undefined {
    // throw new Error("Function not implemented.");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
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
      <div className="grid grid-cols-3 ">
        <div className="col-span-1 w-36"></div>
        <div className="col-span-1 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Buyer info</AccordionTrigger>
                  <AccordionContent>
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
                            <Input  placeholder="Enter e way no" {...field} />
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
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Product info</AccordionTrigger>
                  <AccordionContent>
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
                                <Input
                                  placeholder="Enter quantity"
                                  {...field}
                                />
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
                      </div>
                    ))}
                    <div className="grid justify-center">
                      <Button className="p-5 m-2" onClick={handleAddProduct}>
                        <Plus className="mr-2 h-4 w-full" /> ADD PRODUCT
                      </Button>
                      <Button
                        className="p-5 m-2"
                        onClick={handleRemoveProduct}
                        disabled={products.length <= 1}
                      >
                        <Minus className="mr-2 h-4 w-full" /> REMOVE PRODUCT
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Additional info</AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="material_value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Material Value</FormLabel>
                          <FormControl style={{ marginBottom: 16 }}>
                            <Input
                              placeholder="Enter material value"
                              {...field}
                            />
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
                            <Input
                              placeholder="Enter total weight"
                              {...field}
                            />
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
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Commercial info</AccordionTrigger>
                  <AccordionContent>
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
    </div>
  );
};
