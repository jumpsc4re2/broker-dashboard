import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const LoginForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const schema = z.object({
    id: z.string().min(1, "ID is required"),
    password: z.string().min(8, "Password must be at least 8 characters").max(100),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  type FormValues = z.infer<typeof schema>;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your name below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="id">Admin ID</FieldLabel>
          <Input
            {...register("id")}
            id="id"
            type="string"
            placeholder="Enter ID"
            required
          />
          <p className="text-destructive">{errors.id?.message}</p>
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Admin Password</FieldLabel>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input
            placeholder="Enter Password"
            {...register("password")}
            id="password"
            type="password"
            required
          />
          <p className="text-destructive">{errors.password?.message}</p>
        </Field>
        <Field>
          <Button disabled={isSubmitting} type="submit">
            {!isSubmitting ? "Login" : "Logging in..."}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
export default LoginForm;
