import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  User,
  Lock,
  CreditCard,
  Bell,
  Trash2,
  Upload,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Shield,
  Globe,
  Sun,
  Moon,
  Plus,
  X,
} from "lucide-react";

// Profile form schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

// Password form schema
const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm your new password." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface LoginActivity {
  device: string;
  location: string;
  ip: string;
  time: string;
  status: "success" | "suspicious";
}

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  current: boolean;
}

interface PaymentMethod {
  id: string;
  type: "card" | "paypal";
  last4?: string;
  expiry?: string;
  brand?: string;
  email?: string;
  isDefault: boolean;
}

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export function AccountSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("english");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Form hooks
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Alex Johnson",
      email: "alex@example.com",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Mock login activity data
  const loginActivity: LoginActivity[] = [
    {
      device: "MacBook Pro",
      location: "San Francisco, CA",
      ip: "192.168.1.1",
      time: "Just now",
      status: "success",
    },
    {
      device: "iPhone 13",
      location: "San Francisco, CA",
      ip: "192.168.1.2",
      time: "Yesterday, 3:24 PM",
      status: "success",
    },
    {
      device: "Windows PC",
      location: "New York, NY",
      ip: "45.67.89.10",
      time: "May 15, 2023, 10:12 AM",
      status: "suspicious",
    },
  ];

  // Mock plans data
  const plans: Plan[] = [
    {
      id: "core",
      name: "Zentra Core",
      price: "$9/month",
      description: "Essential AI tools for personal use",
      features: [
        "Basic AI recommendations",
        "Entertainment module",
        "100 queries/day",
        "Standard support",
      ],
      current: false,
    },
    {
      id: "plus",
      name: "Zentra Plus",
      price: "$39/month",
      description: "Advanced AI for professionals",
      features: [
        "Advanced AI recommendations",
        "Entertainment + Healthcare + Fashion modules",
        "Unlimited queries",
        "Priority support",
        "Basic API access",
      ],
      current: true,
    },
    {
      id: "elite",
      name: "Zentra Elite",
      price: "$149/month",
      description: "Complete AI ecosystem for enterprises",
      features: [
        "Enterprise AI capabilities",
        "All modules included",
        "Unlimited queries",
        "Dedicated account manager",
        "Full API access",
        "Custom integrations",
      ],
      current: false,
    },
  ];

  // Mock payment methods data
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card-1",
      type: "card",
      last4: "4242",
      expiry: "04/25",
      brand: "Visa",
      isDefault: true,
    },
    {
      id: "paypal-1",
      type: "paypal",
      email: "alex@example.com",
      isDefault: false,
    },
  ]);

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSetting[]
  >([
    {
      id: "updates",
      title: "Product Updates",
      description: "Receive notifications about new features and improvements",
      enabled: true,
    },
    {
      id: "ai-insights",
      title: "AI Insights",
      description: "Get personalized AI recommendations and insights",
      enabled: true,
    },
    {
      id: "security",
      title: "Security Alerts",
      description: "Be notified about important security events",
      enabled: true,
    },
    {
      id: "marketing",
      title: "Marketing",
      description: "Receive promotional offers and marketing emails",
      enabled: false,
    },
  ]);

  // Handle profile form submission
  const onProfileSubmit = (data: z.infer<typeof profileFormSchema>) => {
    console.log(data);
    showSuccessToast("Profile updated successfully");
  };

  // Handle password form submission
  const onPasswordSubmit = (data: z.infer<typeof passwordFormSchema>) => {
    console.log(data);
    showSuccessToast("Password changed successfully");
    passwordForm.reset();
  };

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
          showSuccessToast("Profile picture updated");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle password strength check
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  // Make a payment method default
  const makeDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
    showSuccessToast("Default payment method updated");
  };

  // Remove a payment method
  const removePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    showSuccessToast("Payment method removed");
  };

  // Toggle notification setting
  const toggleNotification = (id: string) => {
    setNotificationSettings(
      notificationSettings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting,
      ),
    );
  };

  // Show success toast
  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setToastType("success");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Show error toast
  const showErrorToast = (message: string) => {
    setToastMessage(message);
    setToastType("error");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        <p className="text-[#e0e6ff]/70 mt-2">
          Manage your profile, security, and preferences
        </p>
      </div>

      <div className="bg-[#161a2b]/40 backdrop-blur-sm border border-[#8a7fff]/20 rounded-xl overflow-hidden">
        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b border-[#8a7fff]/20">
            <TabsList className="bg-[#0f111a]/50 w-full justify-start p-0 h-auto overflow-x-auto">
              <TabsTrigger
                value="profile"
                className="px-6 py-4 data-[state=active]:bg-[#161a2b] data-[state=active]:text-[#4fc3f7] data-[state=active]:border-b-2 data-[state=active]:border-[#4fc3f7] rounded-none"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="px-6 py-4 data-[state=active]:bg-[#161a2b] data-[state=active]:text-[#4fc3f7] data-[state=active]:border-b-2 data-[state=active]:border-[#4fc3f7] rounded-none"
              >
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="px-6 py-4 data-[state=active]:bg-[#161a2b] data-[state=active]:text-[#4fc3f7] data-[state=active]:border-b-2 data-[state=active]:border-[#4fc3f7] rounded-none"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Subscription & Billing
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="px-6 py-4 data-[state=active]:bg-[#161a2b] data-[state=active]:text-[#4fc3f7] data-[state=active]:border-b-2 data-[state=active]:border-[#4fc3f7] rounded-none"
              >
                <Bell className="h-4 w-4 mr-2" />
                Preferences
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Profile Tab */}
          <TabsContent value="profile" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="h-32 w-32 rounded-full bg-[#161a2b] border-2 border-[#4fc3f7]/50 overflow-hidden flex items-center justify-center relative">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-16 w-16 text-[#4fc3f7]/50" />
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label
                          htmlFor="profile-image"
                          className="cursor-pointer bg-[#4fc3f7] hover:bg-[#4fc3f7]/80 transition-colors rounded-full p-2"
                        >
                          <Upload className="h-5 w-5 text-white" />
                        </label>
                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {profileForm.getValues().name}
                  </h3>
                  <p className="text-[#e0e6ff]/70">Zentra Plus Member</p>
                  <div className="mt-4 w-full bg-[#161a2b] rounded-lg p-4">
                    <h4 className="text-[#e0e6ff] font-medium mb-2">
                      Account Info
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#e0e6ff]/70">Member since</span>
                        <span className="text-[#e0e6ff]">Jan 15, 2023</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#e0e6ff]/70">Plan</span>
                        <span className="text-[#4fc3f7]">Zentra Plus</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#e0e6ff]/70">Next billing</span>
                        <span className="text-[#e0e6ff]">Jun 15, 2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-[#161a2b] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Profile Information
                  </h3>
                  <Form {...profileForm}>
                    <form
                      onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#e0e6ff]">
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-[#0f111a]/70 border-[#8a7fff]/20 text-[#e0e6ff] focus:border-[#4fc3f7] focus:ring-1 focus:ring-[#4fc3f7]"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#e0e6ff]">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-[#0f111a]/70 border-[#8a7fff]/20 text-[#e0e6ff] focus:border-[#4fc3f7] focus:ring-1 focus:ring-[#4fc3f7]"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] text-white w-full zentra-button transition-all duration-300"
                        >
                          Save Changes
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-[#161a2b] rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Change Password
                  </h3>
                  <Form {...passwordForm}>
                    <form
                      onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#e0e6ff]">
                              Current Password
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  type={
                                    showCurrentPassword ? "text" : "password"
                                  }
                                  className="bg-[#0f111a]/70 border-[#8a7fff]/20 text-[#e0e6ff] focus:border-[#4fc3f7] focus:ring-1 focus:ring-[#4fc3f7] pr-10"
                                />
                              </FormControl>
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e0e6ff]/50 hover:text-[#e0e6ff]"
                                onClick={() =>
                                  setShowCurrentPassword(!showCurrentPassword)
                                }
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#e0e6ff]">
                              New Password
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  type={showNewPassword ? "text" : "password"}
                                  className="bg-[#0f111a]/70 border-[#8a7fff]/20 text-[#e0e6ff] focus:border-[#4fc3f7] focus:ring-1 focus:ring-[#4fc3f7] pr-10"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    checkPasswordStrength(e.target.value);
                                  }}
                                />
                              </FormControl>
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e0e6ff]/50 hover:text-[#e0e6ff]"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                              >
                                {showNewPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>

                            {/* Password strength indicator */}
                            {field.value && (
                              <div className="mt-2">
                                <div className="flex space-x-1 h-1">
                                  <div
                                    className={`flex-1 rounded-full ${passwordStrength >= 1 ? "bg-red-500" : "bg-[#161a2b]"}`}
                                  ></div>
                                  <div
                                    className={`flex-1 rounded-full ${passwordStrength >= 2 ? "bg-yellow-500" : "bg-[#161a2b]"}`}
                                  ></div>
                                  <div
                                    className={`flex-1 rounded-full ${passwordStrength >= 3 ? "bg-green-400" : "bg-[#161a2b]"}`}
                                  ></div>
                                  <div
                                    className={`flex-1 rounded-full ${passwordStrength >= 4 ? "bg-green-500" : "bg-[#161a2b]"}`}
                                  ></div>
                                </div>
                                <p className="text-xs mt-1 text-[#e0e6ff]/70">
                                  {passwordStrength === 0 && "Very weak"}
                                  {passwordStrength === 1 && "Weak"}
                                  {passwordStrength === 2 && "Fair"}
                                  {passwordStrength === 3 && "Good"}
                                  {passwordStrength === 4 && "Strong"}
                                </p>
                              </div>
                            )}

                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#e0e6ff]">
                              Confirm New Password
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  className="bg-[#0f111a]/70 border-[#8a7fff]/20 text-[#e0e6ff] focus:border-[#4fc3f7] focus:ring-1 focus:ring-[#4fc3f7] pr-10"
                                />
                              </FormControl>
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e0e6ff]/50 hover:text-[#e0e6ff]"
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
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] text-white w-full zentra-button transition-all duration-300"
                        >
                          Update Password
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </div>

                <div className="bg-[#161a2b] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Recent Login Activity
                  </h3>
                  <div className="space-y-4">
                    {loginActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3 rounded-lg bg-[#0f111a]/50 border border-[#8a7fff]/10"
                      >
                        <div
                          className={`mt-1 mr-3 rounded-full p-1 ${activity.status === "success" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                        >
                          {activity.status === "success" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-[#e0e6ff] font-medium">
                              {activity.device}
                            </p>
                            <span className="text-[#e0e6ff]/60 text-sm">
                              {activity.time}
                            </span>
                          </div>
                          <p className="text-[#e0e6ff]/70 text-sm">
                            {activity.location} • {activity.ip}
                          </p>
                          {activity.status === "suspicious" && (
                            <p className="text-red-400 text-xs mt-1">
                              Suspicious login detected
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-[#161a2b] rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Two-Factor Authentication
                    </h3>
                    <div className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        id="toggle-2fa"
                        className="opacity-0 w-0 h-0"
                        checked={twoFactorEnabled}
                        onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      />
                      <label
                        htmlFor="toggle-2fa"
                        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                          twoFactorEnabled
                            ? "bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]"
                            : "bg-[#0f111a]"
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                            twoFactorEnabled ? "translate-x-6" : ""
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  <p className="text-[#e0e6ff]/70 text-sm">
                    Add an extra layer of security to your account by requiring
                    a verification code in addition to your password.
                  </p>
                  {twoFactorEnabled && (
                    <div className="mt-4 p-3 bg-[#4fc3f7]/10 border border-[#4fc3f7]/20 rounded-lg flex items-center gap-2">
                      <Shield className="h-4 w-4 text-[#4fc3f7]" />
                      <p className="text-[#e0e6ff] text-sm">
                        Your account is secured with 2FA
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-[#161a2b] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Danger Zone
                  </h3>
                  <p className="text-[#e0e6ff]/70 text-sm mb-4">
                    Once you delete your account, all your data will be
                    permanently removed. This action cannot be undone.
                  </p>
                  <Button
                    variant="destructive"
                    className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Subscription & Billing Tab */}
          <TabsContent value="billing" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-[#161a2b] rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Your Subscription
                  </h3>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="text-[#e0e6ff] font-medium">
                          Current Plan
                        </h4>
                        <p className="text-[#4fc3f7] font-semibold">
                          Zentra Plus
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#e0e6ff]/70 text-sm">
                          Next billing date
                        </p>
                        <p className="text-[#e0e6ff]">June 15, 2023</p>
                      </div>
                    </div>

                    {/* Progress bar for subscription period */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#e0e6ff]/70">
                          Billing period
                        </span>
                        <span className="text-[#e0e6ff]/70">15 days left</span>
                      </div>
                      <div className="h-2 bg-[#0f111a] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]"
                          initial={{ width: 0 }}
                          animate={{ width: "50%" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          plan.current
                            ? "bg-[#4fc3f7]/10 border-[#4fc3f7]/40"
                            : "bg-[#0f111a]/50 border-[#8a7fff]/20 hover:border-[#8a7fff]/40"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h4 className="text-white font-medium">
                                {plan.name}
                              </h4>
                              {plan.current && (
                                <span className="ml-2 text-xs bg-[#4fc3f7] text-white px-2 py-0.5 rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-[#e0e6ff]/70 text-sm mt-1">
                              {plan.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">
                              {plan.price}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-[#4fc3f7] mt-0.5" />
                              <span className="text-[#e0e6ff]/80 text-sm">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4">
                          {plan.current ? (
                            <Button
                              variant="outline"
                              className="w-full border-[#8a7fff]/20 text-[#e0e6ff] hover:bg-[#0f111a]"
                            >
                              Current Plan
                            </Button>
                          ) : (
                            <Button
                              className={`w-full ${
                                plan.id === "elite"
                                  ? "bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] text-white"
                                  : "bg-[#161a2b] border border-[#8a7fff]/20 text-[#e0e6ff] hover:bg-[#0f111a]"
                              }`}
                            >
                              {plan.id === "core" ? "Downgrade" : "Upgrade"}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-[#161a2b] rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Payment Methods
                  </h3>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="p-3 rounded-lg bg-[#0f111a]/50 border border-[#8a7fff]/20"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            {method.type === "card" ? (
                              <div className="h-8 w-12 bg-[#161a2b] rounded flex items-center justify-center">
                                {method.brand === "Visa" ? (
                                  <span className="text-blue-500 font-bold text-xs">
                                    VISA
                                  </span>
                                ) : (
                                  <span className="text-red-500 font-bold text-xs">
                                    MC
                                  </span>
                                )}
                              </div>
                            ) : (
                              <div className="h-8 w-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                                PP
                              </div>
                            )}
                            <div>
                              {method.type === "card" ? (
                                <p className="text-[#e0e6ff]">
                                  •••• {method.last4}
                                </p>
                              ) : (
                                <p className="text-[#e0e6ff]">PayPal</p>
                              )}
                              <p className="text-[#e0e6ff]/60 text-xs">
                                {method.type === "card"
                                  ? `Expires ${method.expiry}`
                                  : method.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {method.isDefault ? (
                              <span className="text-xs bg-[#4fc3f7]/20 text-[#4fc3f7] px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            ) : (
                              <button
                                onClick={() => makeDefault(method.id)}
                                className="text-[#e0e6ff]/50 hover:text-[#e0e6ff] text-xs"
                              >
                                Make default
                              </button>
                            )}
                            <button
                              onClick={() => removePaymentMethod(method.id)}
                              className="text-[#e0e6ff]/50 hover:text-red-400 ml-2"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-4 bg-[#0f111a] border border-[#8a7fff]/20 text-[#e0e6ff] hover:bg-[#161a2b]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>

                <div className="bg-[#161a2b] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Billing History
                  </h3>

                  <div className="space-y-3">
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="flex justify-between p-3 rounded-lg bg-[#0f111a]/50 border border-[#8a7fff]/20"
                      >
                        <div>
                          <p className="text-[#e0e6ff]">Zentra Plus</p>
                          <p className="text-[#e0e6ff]/60 text-xs">
                            {new Date(2023, 4 - index, 15).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#e0e6ff]">$39.00</p>
                          <p className="text-green-400 text-xs">Paid</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-4 bg-[#0f111a] border border-[#8a7fff]/20 text-[#e0e6ff] hover:bg-[#161a2b]">
                    View All Invoices
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-[#161a2b] rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Notifications
                  </h3>

                  <div className="space-y-6">
                    {notificationSettings.map((setting) => (
                      <div
                        key={setting.id}
                        className="flex justify-between items-start"
                      >
                        <div>
                          <h4 className="text-[#e0e6ff] font-medium">
                            {setting.title}
                          </h4>
                          <p className="text-[#e0e6ff]/70 text-sm mt-1">
                            {setting.description}
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6 flex-shrink-0">
                          <input
                            type="checkbox"
                            id={`toggle-${setting.id}`}
                            className="opacity-0 w-0 h-0"
                            checked={setting.enabled}
                            onChange={() => toggleNotification(setting.id)}
                          />
                          <label
                            htmlFor={`toggle-${setting.id}`}
                            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                              setting.enabled
                                ? "bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]"
                                : "bg-[#0f111a]"
                            }`}
                          >
                            <span
                              className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                                setting.enabled ? "translate-x-6" : ""
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-[#161a2b] rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Appearance
                  </h3>

                  <div className="mb-6">
                    <h4 className="text-[#e0e6ff] font-medium mb-3">Theme</h4>
                    <div className="flex space-x-4">
                      <div
                        className={`flex-1 cursor-pointer rounded-lg p-4 border transition-all ${
                          !darkMode
                            ? "border-[#4fc3f7] bg-white"
                            : "border-[#8a7fff]/20 bg-[#0f111a]/50 hover:border-[#8a7fff]/40"
                        }`}
                        onClick={() => setDarkMode(false)}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span
                            className={
                              darkMode ? "text-[#e0e6ff]" : "text-gray-800"
                            }
                          >
                            Light
                          </span>
                          <Sun
                            className={`h-5 w-5 ${darkMode ? "text-[#e0e6ff]/60" : "text-yellow-500"}`}
                          />
                        </div>
                        <div className="h-12 rounded-md bg-gray-100 border border-gray-200"></div>
                      </div>

                      <div
                        className={`flex-1 cursor-pointer rounded-lg p-4 border transition-all ${
                          darkMode
                            ? "border-[#4fc3f7] bg-[#161a2b]"
                            : "border-[#8a7fff]/20 bg-gray-800 hover:border-[#8a7fff]/40"
                        }`}
                        onClick={() => setDarkMode(true)}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[#e0e6ff]">Dark</span>
                          <Moon className="h-5 w-5 text-[#4fc3f7]" />
                        </div>
                        <div className="h-12 rounded-md bg-[#0f111a] border border-[#8a7fff]/20"></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#e0e6ff] font-medium mb-3">
                      Language
                    </h4>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-[#0f111a]/70 border border-[#8a7fff]/20 rounded-lg p-3 text-[#e0e6ff] appearance-none pr-10"
                      >
                        <option value="english">English (US)</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="japanese">Japanese</option>
                      </select>
                      <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
                        <Globe className="h-5 w-5 text-[#e0e6ff]/60" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#161a2b] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Privacy
                  </h3>

                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[#e0e6ff] font-medium">
                          Data Collection
                        </h4>
                        <p className="text-[#e0e6ff]/70 text-sm mt-1">
                          Allow Zentra to collect usage data to improve your
                          experience
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 flex-shrink-0">
                        <input
                          type="checkbox"
                          id="toggle-data"
                          className="opacity-0 w-0 h-0"
                          defaultChecked
                        />
                        <label
                          htmlFor="toggle-data"
                          className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]"
                        >
                          <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all duration-300 translate-x-6"></span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[#e0e6ff] font-medium">
                          Third-party Integrations
                        </h4>
                        <p className="text-[#e0e6ff]/70 text-sm mt-1">
                          Allow Zentra to connect with third-party services
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 flex-shrink-0">
                        <input
                          type="checkbox"
                          id="toggle-integrations"
                          className="opacity-0 w-0 h-0"
                          defaultChecked
                        />
                        <label
                          htmlFor="toggle-integrations"
                          className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]"
                        >
                          <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all duration-300 translate-x-6"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[#161a2b] border border-red-500/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#e0e6ff]/70">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#0f111a] border-[#8a7fff]/20 text-[#e0e6ff] hover:bg-[#161a2b]">
              Cancel
            </AlertDialogCancel>
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: 3, repeatType: "reverse" }}
            >
              <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white">
                Delete Account
              </AlertDialogAction>
            </motion.div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-4 right-4 py-3 px-4 rounded-lg shadow-lg max-w-sm z-50 flex items-center gap-3 ${
              toastType === "success"
                ? "bg-green-500/20 border border-green-500/30 text-green-500"
                : "bg-red-500/20 border border-red-500/30 text-red-500"
            }`}
          >
            {toastType === "success" ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <p>{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
