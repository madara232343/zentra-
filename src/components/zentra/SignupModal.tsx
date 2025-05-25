import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";

// Form validation schema
const formSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignupModal({ open, onOpenChange }: SignupModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      onOpenChange(false);
      form.reset();
    }, 1500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#0f111a] border-[#8a7fff]/20 text-[#e0e6ff]">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Join Zentra</DialogTitle>
          <DialogDescription className="text-[#e0e6ff]/70">
            Create your account and explore AI-powered solutions
          </DialogDescription>
        </DialogHeader>

        <div className="h-1 w-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] rounded-full my-2"></div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="form-group">
                  <FormLabel className="text-[#e0e6ff]">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      className="bg-[#161a2b]/60 border-[#8a7fff]/20 text-white form-input"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage className="text-[#ff5757]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="form-group">
                  <FormLabel className="text-[#e0e6ff]">Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        className="bg-[#161a2b]/60 border-[#8a7fff]/20 text-white form-input pr-10"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7fff]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[#e0e6ff]/60 mt-1">
                    At least 8 characters with uppercase letter and number
                  </p>
                  <FormMessage className="text-[#ff5757]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="form-group">
                  <FormLabel className="text-[#e0e6ff]">
                    Confirm Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        className="bg-[#161a2b]/60 border-[#8a7fff]/20 text-white form-input pr-10"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7fff]"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <FormMessage className="text-[#ff5757]" />
                </FormItem>
              )}
            />

            <div className="flex items-start mt-2">
              <label className="custom-checkbox text-sm">
                <input type="checkbox" required />
                <span className="checkmark"></span>
                <span className="text-[#e0e6ff]/80 ml-2">
                  I agree to the{" "}
                  <a href="#" className="text-[#4fc3f7] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#4fc3f7] hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] hover:opacity-90 transition-opacity zentra-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm text-[#e0e6ff]/70">
            Already have an account?{" "}
            <a href="#" className="text-[#4fc3f7] hover:underline">
              Log in
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
