"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/LanguageContext";

interface PatientForm {
  patientName: string;
  phone: string;
}

interface AdminForm {
  adminName: string;
  password: string;
}

interface StaffForm {
  staffName: string;
  phone: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [role, setRole] = useState<"patient" | "admin" | "staff">("patient");
  const [patientForm, setPatientForm] = useState<PatientForm>({
    patientName: "",
    phone: "",
  });

  const [adminForm, setAdminForm] = useState<AdminForm>({
    adminName: "",
    password: "",
  });

  const [staffForm, setStaffForm] = useState<StaffForm>({
    staffName: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // language change
  const { language } = useLanguage();

  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStaffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStaffForm((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSendOtp = () => {
  //   const cleanedPhone = patientForm.phone.replace(/\s/g, "");
  //   if (cleanedPhone.length === 10) {
  //     setOtpSent(true);
  //     console.log("OTP sent to:", cleanedPhone);
  //     console.log("OTP:", Math.floor(Math.random() * 10000));
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "admin") {
      setLoading(true);
      const toastId = toast.loading("Logging in...", {
        description: "Please wait...",
        style: {
          background: "#42998d",
          color: "#ffffff",
        },
      });
      try {
        const res = await fetch("/api/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminForm),
        });

        const data = await res.json();

        if (res.ok) {
          console.log("Admin saved:", data);
          toast.success(data.message, {
            id: toastId,
            description: `Welcome ${data.admin.adminName}`,
            style: {
              background: "#42998d",
              color: "#ffffff",
            },
          });
          //* Redirect to dashboard
          router.push("/dashboard");
        } else {
          toast.error(`Error: ${data.message}`, {
            id: toastId,
            description: "Please check and try again.",
            style: {
              background: "#ff4d4f",
              color: "#ffffff",
            },
          });
        }
      } catch (error) {
        console.error("Error saving admin:", error);
        toast.error("Something went wrong!", {
          id: toastId,
          description: "Check network or try again.",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        });
      } finally {
        setLoading(false);
      }
    } else if (role === "patient") {
      setLoading(true);
      const toastId = toast.loading("Logging in...", {
        description: "Please wait...",
        style: {
          background: "#42998d",
          color: "#ffffff",
        },
      });
      try {
        const res = await fetch("/api/patient", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patientForm),
        });

        const data = await res.json();

        if (res.ok) {
          console.log("Patient saved:", data);
          localStorage.setItem("login_patient", JSON.stringify(data.patient));
          toast.success(data.message, {
            id: toastId,
            description: `Welcome ${data.patient.patientName}`,
            style: {
              background: "#42998d",
              color: "#ffffff",
            },
          });
          //* Redirect to dashboard
          router.push("/appointments");
        } else {
          toast.error("Login failed", {
            id: toastId,
            description: data.message,
            style: {
              background: "#ff4d4f",
              color: "#ffffff",
            },
          });
        }
      } catch (err) {
        console.error("Login error:", err);
        toast.error("Something went wrong", {
          id: toastId,
          description: "Check network or try again.",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      const toastId = toast.loading("Logging in...", {
        description: "Please wait...",
        style: {
          background: "#42998d",
          color: "#ffffff",
        },
      });
      try {
        const res = await fetch("/api/staff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(staffForm),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success(data.message, {
            id: toastId,
            description: `Welcome ${data.staff.staffName}`,
            style: {
              background: "#42998d",
              color: "#ffffff",
            },
          });
          router.push("/dashboard");
        } else {
          toast.error("Login failed", {
            id: toastId,
            description: data.message,
            style: {
              background: "#ff4d4f",
              color: "#ffffff",
            },
          });
        }
      } catch (err) {
        console.error("Staff login error:", err);
        toast.error("Something went wrong", {
          id: toastId,
          description: "Check network or try again.",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        });
      } finally {
        setLoading(false);
      }
    }

    // Reset form
    setPatientForm({
      patientName: "",
      phone: "",
    });
    setAdminForm({
      adminName: "",
      password: "",
    });
    setStaffForm({
      staffName: "",
      phone: "",
      password: "",
    });
  };

  return (
    <section
      className="relative h-screen bg-gray-50 flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: "url('/login-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[4px] z-0" />
      <div className="relative w-full max-w-md">
        <Card className="px-0 py-4 bg-white border border-[#42998d] rounded-xl">
          <CardHeader className="text-center">
            {/* Logo */}
            <Link href={"/"}>
              <div>
                <Image
                  src="/logo-2.png"
                  alt="VIC Logo"
                  width={100}
                  height={100}
                  className="mx-auto"
                  priority
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </Link>
            <CardDescription className="tracking-wide leading-1 text-gray-500">
              {language === "english"
                ? "Please enter your details to login."
                : "कृपया लॉगिन करने के लिए अपनी जानकारी दर्ज करें।"}
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-2 space-y-4 p-8 pt-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection */}
              <div>
                <RadioGroup
                  defaultValue="patient"
                  className="flex gap-6 tracking-wide"
                  onValueChange={(value: "patient" | "admin" | "staff") => {
                    setRole(value);
                    // setOtpSent(false);
                  }}>
                  {/* Patient Role */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="patient"
                      id="patient"
                      className={cn(
                        "relative w-5 h-5 border-2 border-[#42998d] rounded-full",
                        "data-[state=checked]:border-[#42998d]",
                        "data-[state=checked]:bg-white",
                        "after:content-[''] after:w-2.5 after:h-2.5 after:rounded-full",
                        "after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
                        "after:bg-[#42998d] after:opacity-0 data-[state=checked]:after:opacity-100",
                        "transition-all duration-200 cursor-pointer"
                      )}
                    />
                    <Label htmlFor="patient" className="text-sm">
                      {language === "english" ? "Patient" : "मरीज"}
                    </Label>
                  </div>

                  {/* Admin Role */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="admin"
                      id="admin"
                      className={cn(
                        "relative w-5 h-5 border-2 border-[#42998d] rounded-full",
                        "data-[state=checked]:border-[#42998d]",
                        "data-[state=checked]:bg-white",
                        "after:content-[''] after:w-2.5 after:h-2.5 after:rounded-full",
                        "after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
                        "after:bg-[#42998d] after:opacity-0 data-[state=checked]:after:opacity-100",
                        "transition-all duration-200 cursor-pointer"
                      )}
                    />
                    <Label htmlFor="admin" className="text-sm">
                      {language === "english" ? "Admin" : "एडमिन"}
                    </Label>
                  </div>

                  {/* Staff Role */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="staff"
                      id="staff"
                      className={cn(
                        "relative w-5 h-5 border-2 border-[#42998d] rounded-full",
                        "data-[state=checked]:border-[#42998d]",
                        "data-[state=checked]:bg-white",
                        "after:content-[''] after:w-2.5 after:h-2.5 after:rounded-full",
                        "after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
                        "after:bg-[#42998d] after:opacity-0 data-[state=checked]:after:opacity-100",
                        "transition-all duration-200 cursor-pointer"
                      )}
                    />
                    <Label htmlFor="staff" className="text-sm">
                      {language === "english" ? "Staff" : "स्टाफ"}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Patient Login Form */}
              {role === "patient" ? (
                <>
                  {/* Patient Name */}
                  <div>
                    <Label
                      htmlFor="patientName"
                      className="text-sm font-medium text-gray-800 tracking-wide">
                      {language === "english" ? "Patient Name" : "मरीज का नाम"}
                    </Label>
                    <Input
                      type="text"
                      id="patientName"
                      name="patientName"
                      value={patientForm.patientName}
                      onChange={handlePatientChange}
                      required
                      placeholder="Patient Name"
                      className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-800 tracking-wide">
                      {language === "english" ? "Phone Number" : "फोन नंबर"}
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={patientForm.phone}
                      onChange={handlePatientChange}
                      required
                      placeholder="Enter phone number"
                      maxLength={10}
                      className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide"
                    />
                  </div>

                  {/* {!otpSent ? (
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full bg-[#42998d] hover:bg-[#367c74] text-white text-base font-semibold shadow-sm transition cursor-pointer">
                      Send OTP
                    </Button>
                  ) : (
                    <div>
                      <Label
                        htmlFor="otp"
                        className="text-sm font-medium text-gray-800">
                        OTP
                      </Label>
                      <Input
                        id="otp"
                        name="otp"
                        value={patientForm.otp}
                        onChange={handlePatientChange}
                        required
                        placeholder="Enter 6-digit OTP"
                        className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-1 focus:ring-[#42998d] focus:outline-none transition duration-150"
                      />
                    </div>
                  )} */}
                </>
              ) : role === "admin" ? (
                <>
                  {/* Admin name */}
                  <div>
                    <Label
                      htmlFor="adminName"
                      className="text-sm font-medium text-gray-800 tracking-wide">
                      {language === "english" ? "Admin Name" : "एडमिन का नाम"}
                    </Label>
                    <Input
                      type="text"
                      id="adminName"
                      name="adminName"
                      value={adminForm.adminName}
                      onChange={handleAdminChange}
                      required
                      placeholder="Enter admin name"
                      className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide"
                    />
                  </div>

                  {/* Admin Password */}
                  <div className="relative">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-800 tracking-wide">
                      {language === "english" ? "Password" : "पासवर्ड"}
                    </Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={adminForm.password}
                      onChange={handleAdminChange}
                      required
                      placeholder="Enter your password"
                      className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide"
                    />
                    <div
                      className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Staff Login Form */}
                  {/* Staff Name */}
                  <div>
                    <Label
                      htmlFor="staffName"
                      className="text-sm font-medium text-gray-800 tracking-wide">
                      {language === "english" ? "Staff Name" : "स्टाफ का नाम"}
                    </Label>
                    <Input
                      type="text"
                      id="staffName"
                      name="staffName"
                      value={staffForm.staffName}
                      onChange={handleStaffChange}
                      required
                      placeholder="Enter staff name"
                      className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-800 tracking-wide">
                      {language === "english" ? "Phone Number" : "फोन नंबर"}
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={staffForm.phone}
                      onChange={handleStaffChange}
                      required
                      placeholder="Enter phone number"
                      maxLength={10}
                      className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-800 tracking-wide">
                      {language === "english" ? "Password" : "पासवर्ड"}
                    </Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={staffForm.password}
                      onChange={handleStaffChange}
                      required
                      placeholder="Enter your password"
                      className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide"
                    />
                    <div
                      className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </>
              )}

              {/* Login Button */}
              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  disabled={loading}
                  size="sm"
                  className="bg-[#0b968d] hover:bg-[#0b968d]/90 text-white text-base font-semibold pb-0.5 rounded-md shadow transition cursor-pointer mt-2 tracking-wide"
                  title="Login">
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : language === "english" ? (
                    "Login"
                  ) : (
                    "लॉगिन"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
