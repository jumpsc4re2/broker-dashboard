import { zodResolver } from "@hookform/resolvers/zod";
import { countries } from "countries-list";
import { Copy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "sonner";
import z from "zod";

import { DataTable } from "@/components/data-table/DataTableComponent";
import Flex from "@/components/flex/Flex";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrencies } from "@/hooks/useCurrencies";

import { columns, type Position } from "../../positions/columns";

const AccountProfile = () => {
  const { currencies } = useCurrencies();
  const [positions, setPositions] = useState<Position[]>([]);
  const [isPositionsLoading, setIsPositionsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const copyId = () => {
    if (!id) {
      toast.error("No ID to copy");
      return;
    }
    navigator.clipboard.writeText(id);
    toast.success("ID Copied Successfully!");
  };
  const schema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    country: z.string().min(2).max(100),
    currency: z.string().min(2).max(100),
    balance: z.string().min(1),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const countryOptions = useMemo(() => {
    return Object.entries(countries)
      .map(([code, data]) => ({
        code,
        name: data.name,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };
  useEffect(() => {
    setTimeout(() => setIsPositionsLoading(true), 0);
    const ws = new WebSocket("ws://localhost:3000");
    ws.onopen = () => {
      console.log("Connection Opened");
      setIsPositionsLoading(false);
      setError(false);
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "positions:update") {
        setPositions(message.payload.filter((p: Position) => p.accountId === Number(id)));
      }
    };
    ws.onerror = (event) => {
      console.log("web socket error", event);
      setError(true);
      setIsPositionsLoading(false);
    };
    ws.onclose = () => {
      console.log("The connection has been closed successfully.");
    };
    return () => ws.close();
  }, [id]);

  return (
    <div>
      <p className="text-lg mb-2 font-bold">Account Profile</p>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account Info</TabsTrigger>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Flex className="my-3">
            <p className="text-lg">Account ID: {id}</p>
            <Button size="sm" className="w-7" onClick={copyId} variant="outline">
              <Copy />
            </Button>
          </Flex>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            <div className="border-2 p-3 rounded-xl">
              <Flex className="justify-between">
                <p>
                  <span className="font-bold">Name</span>: Omar Farag
                </p>
                <p>
                  <span className="font-bold">Email</span>: omar@omar.com
                </p>
              </Flex>
            </div>
            <div className="border-2 p-3 rounded-xl">
              <Flex className="justify-between">
                <p>
                  <span className="font-bold">Balance</span>: 2000$
                </p>
                <p>
                  <span className="font-bold">Currency</span>: USD
                </p>
              </Flex>
            </div>
            <div className="border-2 p-3 rounded-xl">
              <Flex className="justify-between">
                <p>
                  <span className="font-bold">Symbol</span>: USDGBP
                </p>
                <p>
                  <span className="font-bold">Country</span>: UAE
                </p>
              </Flex>
            </div>
          </div>
          <DataTable
            className="mt-5"
            title="Account Positions"
            error={error}
            isLoading={isPositionsLoading}
            columns={columns}
            data={positions}
          />
        </TabsContent>
        <TabsContent value="update">
          <div className="border p-3 rounded-xl  mt-4 ">
            <p className="text-lg mb-2">Update account info</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...register("name")} value="Name" id="name" type="text" />
                  <p className="text-destructive">{errors.name?.message}</p>
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...register("email")}
                    defaultValue="Email"
                    id="email"
                    type="email"
                  />
                  <p className="text-destructive">{errors.email?.message}</p>
                </Field>
              </Flex>
              <Flex>
                <Field>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    {...register("phone")}
                    defaultValue="+201140769565"
                    id="phone"
                    type="tel"
                  />
                  <p className="text-destructive">{errors.phone?.message}</p>
                </Field>
                <Field>
                  <FieldLabel>Country</FieldLabel>
                  <Controller
                    control={control}
                    name="country"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {countryOptions.map((c) => (
                              <SelectItem key={c.code} value={c.code}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <p className="text-destructive">{errors.country?.message}</p>
                </Field>
              </Flex>

              <Flex>
                <Field>
                  <FieldLabel htmlFor="balance">Balance</FieldLabel>
                  <Input
                    inputMode="numeric"
                    {...register("balance")}
                    id="balance"
                    type="number"
                    defaultValue="999"
                  />
                  <p className="text-destructive">{errors.balance?.message}</p>
                </Field>
                <Field>
                  <FieldLabel>Currency</FieldLabel>
                  <Controller
                    control={control}
                    name="currency"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {currencies.map((c) => (
                              <SelectItem key={c.id} value={c.name}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <p className="text-destructive">{errors.currency?.message}</p>
                </Field>
              </Flex>
              <Button className="mt-2">Update</Button>
            </form>
          </div>
        </TabsContent>
        <TabsContent value="delete">
          <div className="rounded-xl border p-3 xs:w-full sm:w-[50%] mt-4 flex flex-col gap-4">
            <p className="text-xl">Delete this account</p>
            <p className="text-lg">
              this account will be permanently deleted and this action cannot be undone.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default AccountProfile;
