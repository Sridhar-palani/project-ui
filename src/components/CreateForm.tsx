import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import { CalendarIcon, ChevronsUpDown, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { usePostOrder } from "@/hooks/user/postorder/usePostOrder";
import { useAppContext } from "@/contexts/AppContext";

export type Product = {
  length: number;
  width: number;
  quantity: number;
  rate: number;
};

export type FormValues = {
  to: string;
  e_way_no: number;
  party_dc_no: number;
  date: Date;
  party_dc_date: Date;
  party_gstin: string;
  our_dc_no: number;
  hsn_code: string;
  product_description: string;
  items: Product[];
  material_value: number;
  total_weight: number;
  vehicle_no: string;
  handling_charges?: number;
  cgst: number;
  sgst: number;
};

export const CreateForm = () => {
  const { showToast } = useAppContext();
  const { mutate, isSuccess,isError,message,errorMessage } = usePostOrder();
  const [open, setOpen] = useState(false);

  const hsn_code = [
    { label: "998898", value: "998898" },
    { label: "997212", value: "997212" },
    { label: "73084000", value: "73084000" },
  ] as const;
  
  useEffect(() => {
    if (isSuccess) {
      showToast({ message: "Order Created!", type: "SUCCESS" });
    }
    if (isError) {
      showToast({ message: "Order Creation Failed!", type: "ERROR" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const form = useForm<FormValues>({
    defaultValues: {
      to: "",
      e_way_no: 0,
      party_dc_no: 0,
      date:new Date(),
      party_dc_date: new Date(),
      party_gstin: "",
      hsn_code: "",
      product_description: "",
      items: [
        {
          length: 0,
          width: 0,
          quantity: 0,
          rate: 0,
        },
      ],
      material_value: 0,
      total_weight: 0,
      vehicle_no: "",
      handling_charges: 0,
      cgst: 0,
      sgst: 0,
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = form;

  const validateNumber = (minValue = 0) => {
    return (value: number | undefined) => {
      if (value === undefined) {
        return "Value is required";
      }
      if (isNaN(value)) {
        return "Must be a number";
      }
      if (value < minValue) {
        return `Must be greater than or equal to ${minValue}`;
      }
      return true;
    };
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const onSubmit = (values: FormValues) => {
    console.log(values);
    mutate(values);
  };
  return (
    <div style={{ minHeight: "90vh" }}>
      <div className="flex flex-col items-center">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-[60%]">
            <Tabs
              defaultValue="buyerinfo"
              className="flex flex-col p-10 mt-5 border border-grey"
              style={{ minHeight: "80vh" }}
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
                  name="date"
                  render={() => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl style={{ marginBottom: 16 }}>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !form.watch("date") &&
                                  "text-muted-foreground"
                              )}
                            >
                              {form.watch("date") ? (
                                format(form.watch("date"), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={form.watch("date")}
                            onSelect={(date) => {
                              if (date) {
                                setValue("date", date, {
                                  shouldValidate: true,
                                });
                              }
                              setOpen(false);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.date && (
                        <p className="text-red-500 text-right">
                          {errors.date.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to"
                  render={() => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Textarea
                          placeholder="Enter buyer details"
                          {...register("to", {
                            required: "To is required",
                            minLength: {
                              value: 2,
                              message: "To must be at least 2 characters",
                            },
                            maxLength: {
                              value: 500,
                              message:
                                "To must be less than or equal to 500 characters",
                            },
                          })}
                        />
                      </FormControl>
                      {errors.to && (
                        <p className="text-red-500 text-right">
                          {errors.to.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="e_way_no"
                  render={() => (
                    <FormItem>
                      <FormLabel>E way No</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input
                          placeholder="Enter e way no"
                          {...register("e_way_no", {
                            required: "E-way no is required",
                            valueAsNumber: true,
                            validate: validateNumber(1),
                          })}
                        />
                      </FormControl>
                      {errors.e_way_no && (
                        <p className="text-red-500 text-right">
                          {errors.e_way_no.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="party_dc_no"
                  render={() => (
                    <FormItem>
                      <FormLabel>Party DC No</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input
                          placeholder="Enter party dc no"
                          {...register("party_dc_no", {
                            required: "Party DC no is required",
                            valueAsNumber: true,
                            validate: validateNumber(1),
                          })}
                        />
                      </FormControl>
                      {errors.party_dc_no && (
                        <p className="text-red-500 text-right">
                          {errors.party_dc_no.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="party_dc_date"
                  render={() => (
                    <FormItem>
                      <FormLabel>Party DC Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl style={{ marginBottom: 16 }}>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !form.watch("party_dc_date") &&
                                  "text-muted-foreground"
                              )}
                            >
                              {form.watch("party_dc_date") ? (
                                format(form.watch("party_dc_date"), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={form.watch("party_dc_date")}
                            onSelect={(date) => {
                              if (date) {
                                setValue("party_dc_date", date, {
                                  shouldValidate: true,
                                });
                              }
                              setOpen(false);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.party_dc_date && (
                        <p className="text-red-500 text-right">
                          {errors.party_dc_date.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="party_gstin"
                  render={() => (
                    <FormItem>
                      <FormLabel>Party GSTIN</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input
                          placeholder="Enter party gstin"
                          {...register("party_gstin", {
                            required: "Party GSTIN is required",
                            minLength: {
                              value: 1,
                              message: "Party GSTIN is required",
                            },
                          })}
                        />
                      </FormControl>
                      {errors.party_gstin && (
                        <p className="text-red-500 text-right">
                          {errors.party_gstin.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="hsn_code"
                  render={() => (
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
                                  !form.watch("hsn_code") &&
                                    "text-muted-foreground"
                                )}
                              >
                                {form.watch("hsn_code")
                                  ? hsn_code.find(
                                      (hc) =>
                                        hc.value === form.watch("hsn_code")
                                    )?.label
                                  : "Select HSN Code"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <Command>
                              <CommandList>
                                <CommandGroup>
                                  {hsn_code.map((hc) => (
                                    <CommandItem
                                      value={hc.label}
                                      key={hc.value}
                                      onSelect={() => {
                                        setValue("hsn_code", hc.value);
                                        setOpen(false);
                                      }}
                                    >
                                      {hc.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      {errors.hsn_code && (
                        <p className="text-red-500 text-right">
                          {errors.hsn_code.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="productinfo">
                <FormField
                  control={form.control}
                  name={`product_description`}
                  render={() => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input
                          placeholder="Enter product details"
                          {...register("product_description", {
                            required: "Product description is required",
                            minLength: {
                              value: 1,
                              message:
                                "Product description must be at least 1 character",
                            },
                          })}
                        />
                      </FormControl>
                      {errors.product_description && (
                        <p className="text-red-500 text-right">
                          {errors.product_description?.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                {fields.map((field, index) => (
                  <div key={field.id} className="border p-4 mb-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.length`}
                      render={() => (
                        <FormItem>
                          <FormLabel>Product Length</FormLabel>
                          <FormControl style={{ marginBottom: 16 }}>
                            <Input
                              placeholder="Enter product length"
                              {...register(
                                `items.${index}.length` as const,
                                {
                                  required: "Product length is required",
                                  valueAsNumber: true,
                                  validate: validateNumber(1),
                                }
                              )}
                            />
                          </FormControl>
                          {errors.items?.[index]?.length && (
                            <p className="text-red-500 text-right">
                              {errors.items[index]?.length?.message}
                            </p>
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.width`}
                      render={() => (
                        <FormItem>
                          <FormLabel>Product Width</FormLabel>
                          <FormControl style={{ marginBottom: 16 }}>
                            <Input
                              placeholder="Enter product width"
                              {...register(
                                `items.${index}.width` as const,
                                {
                                  required: "Product width is required",
                                  valueAsNumber: true,
                                  validate: validateNumber(1),
                                }
                              )}
                            />
                          </FormControl>
                          {errors.items?.[index]?.width && (
                            <p className="text-red-500 text-right">
                              {errors.items[index]?.width?.message}
                            </p>
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={() => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl style={{ marginBottom: 16 }}>
                            <Input
                              placeholder="Enter quantity"
                              {...register(`items.${index}.quantity` as const, {
                                required: "Quantity is required",
                                valueAsNumber: true,
                                validate: validateNumber(1),
                              })}
                            />
                          </FormControl>
                          {errors.items?.[index]?.quantity && (
                            <p className="text-red-500 text-right">
                              {errors.items[index]?.quantity?.message}
                            </p>
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.rate`}
                      render={() => (
                        <FormItem>
                          <FormLabel>Rate</FormLabel>
                          <FormControl style={{ marginBottom: 16 }}>
                            <Input
                              placeholder="Enter rate"
                              {...register(`items.${index}.rate` as const, {
                                required: "Rate is required",
                                valueAsNumber: true,
                                validate: validateNumber(0),
                              })}
                            />
                          </FormControl>
                          {errors.items?.[index]?.rate && (
                            <p className="text-red-500 text-right">
                              {errors.items[index]?.rate?.message}
                            </p>
                          )}
                        </FormItem>
                      )}
                    />
                    <div className="grid justify-center">
                      <Button
                        className="p-5 m-2"
                        onClick={() => remove(index)}
                        style={
                          fields.length <= 1 ? { display: "none" } : undefined
                        }
                        type="button"
                        variant="destructive"
                      >
                        <Minus className="mr-2 h-4 w-full" /> REMOVE PRODUCT
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="grid justify-center">
                  <Button
                    className="p-5 m-2"
                    onClick={() =>
                      append({
                        length: 0,
                        width: 0,
                        quantity: 0,
                        rate: 0,
                      })
                    }
                    type="button"
                    variant="default"
                  >
                    <Plus className="mr-2 h-4 w-full" /> ADD PRODUCT
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="additionalinfo">
                <FormField
                  control={form.control}
                  name="material_value"
                  render={() => (
                    <FormItem>
                      <FormLabel>Material Value</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input
                          placeholder="Enter material value"
                          {...register("material_value", {
                            required: "Material value is required",
                            valueAsNumber: true,
                            validate: validateNumber(0),
                          })}
                        />
                      </FormControl>
                      {errors.material_value && (
                        <p className="text-red-500 text-right">
                          {errors.material_value.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total_weight"
                  render={() => (
                    <FormItem>
                      <FormLabel>Total Weight</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input
                          placeholder="Enter total weight"
                          {...register("total_weight", {
                            required: "Total weight is required",
                            valueAsNumber: true,
                            validate: validateNumber(0),
                          })}
                        />
                      </FormControl>
                      {errors.total_weight && (
                        <p className="text-red-500 text-right">
                          {errors.total_weight.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicle_no"
                  render={() => (
                    <FormItem>
                      <FormLabel>Vehicle No</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input
                          placeholder="Enter vehicle no"
                          {...register(
                            "vehicle_no",

                            {
                              required: "Vehicle no is required",
                              minLength: {
                                value: 1,
                                message: "Vehicle no is required",
                              },
                            }
                          )}
                        />
                      </FormControl>
                      {errors.vehicle_no && (
                        <p className="text-red-500 text-right">
                          {errors.vehicle_no.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="commercialinfo">
                <FormField
                  control={form.control}
                  name="handling_charges"
                  render={() => (
                    <FormItem>
                      <FormLabel>Handling charges</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input
                          placeholder="Enter handling charges"
                          {...register("handling_charges", {
                            valueAsNumber: true,
                            validate: validateNumber(0),
                          })}
                        />
                      </FormControl>
                      {errors.handling_charges && (
                        <p className="text-red-500 text-right">
                          {errors.handling_charges.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cgst"
                  render={() => (
                    <FormItem>
                      <FormLabel>CGST</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input
                          placeholder="Enter cgst"
                          {...register("cgst", {
                            required: "CGST is required",
                            valueAsNumber: true,
                            validate: validateNumber(1),
                          })}
                        />
                      </FormControl>
                      {errors.cgst && (
                        <p className="text-red-500 text-right">
                          {errors.cgst.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sgst"
                  render={() => (
                    <FormItem>
                      <FormLabel>SGST</FormLabel>
                      <FormControl style={{ marginBottom: 16 }}>
                        <Input
                          placeholder="Enter sgst"
                          {...register("sgst", {
                            required: "SGST is required",
                            valueAsNumber: true,
                            validate: validateNumber(1),
                          })}
                        />
                      </FormControl>
                      {errors.sgst && (
                        <p className="text-red-500 text-right">
                          {errors.sgst.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
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
          </form>
        </Form>
      </div>
    </div>
  );
};
