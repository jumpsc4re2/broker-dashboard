import { zodResolver } from "@hookform/resolvers/zod";
import { countries } from "countries-list";
import React, { useMemo } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Separator } from "@/components/ui/separator";
import { useCurrencies } from "@/hooks/useCurrencies";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  country: z.string().min(2).max(100),
  currency: z.string().min(2).max(100),
  balance: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

type DialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreateAccountDialog = ({ open, setOpen }: DialogProps) => {
  const { currencies } = useCurrencies();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      country: "",
      currency: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setOpen(false);
  };

  const countryOptions = useMemo(() => {
    return Object.entries(countries)
      .map(([code, data]) => ({
        code,
        name: data.name,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <Dialog open={open} modal onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg">Create a new trading account.</DialogTitle>
          <DialogDescription>Add info of the new trading account.</DialogDescription>
          <Separator />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-lg mb-2">Personal Details</p>
          <div className="flex gap-2">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...register("name")}
                id="name"
                type="text"
                placeholder="Enter username"
              />
              <p className="text-destructive">{errors.name?.message}</p>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter email"
              />
              <p className="text-destructive">{errors.email?.message}</p>
            </Field>
          </div>

          <div className="flex gap-2 mt-2">
            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input
                {...register("phone")}
                id="phone"
                type="tel"
                placeholder="Enter phone"
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
          </div>
          <div className="flex flex-row gap-2 my-2">
            <Field>
              <FieldLabel htmlFor="balance">Balance</FieldLabel>
              <Input
                inputMode="numeric"
                {...register("balance")}
                id="balance"
                type="number"
                placeholder="Enter balance"
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
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full mt-2">
            {!isSubmitting ? "Create" : "Creating..."}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountDialog;
