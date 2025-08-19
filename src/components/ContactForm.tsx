"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/LanguageContext";

export default function ContactForm() {
  // ? Form state:-
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // ? Language:-
  const { language } = useLanguage();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Show loading toast
    const toastId = toast.loading(
      language === "english" ? "Sending message..." : "संदेश भेजा जा रहा है...",
      {
        description:
          language === "english" ? "Please wait..." : "कृपया प्रतीक्षा करें...",
        style: {
          background: "#42998d",
          color: "#ffffff",
        },
      }
    );

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Success: update toast
        toast.success(
          language === "english" ? data.message : "संदेश सफलतापूर्वक भेजा गया",
          {
            id: toastId, // Replace loading toast
            description: language === "english" ? "Done" : "संपन्न",
            style: {
              background: "#42998d",
              color: "#ffffff",
            },
          }
        );

        // Reset form
        setForm({ name: "", phone: "", message: "" });
      } else {
        // Error: update toast
        toast.error(
          language === "english" ? data.message : "कृपया पुनः प्रयास करें।",
          {
            id: toastId,
            description:
              language === "english"
                ? "Please try again."
                : "कृपया पुनः प्रयास करें।",
            style: {
              background: "#ff4d4f",
              color: "#ffffff",
            },
          }
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(
        language === "english"
          ? "Server error. Please try again."
          : "सर्वर त्रुटि। कृपया पुनः प्रयास करें।",
        {
          id: toastId,
          description:
            language === "english"
              ? "Please try again."
              : "कृपया पुनः प्रयास करें।",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        }
      );
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold tracking-wide text-[#1e4d4f] text-center mb-2">
        {language === "english" ? "Get in Touch" : "संपर्क करें"}
      </h2>
      <p className="text-center text-gray-600 text-sm md:text-base mb-6 tracking-wide">
        {language === "english"
          ? "Have questions or want to schedule an appointment? We’re here to help."
          : "क्या आपके पास सवाल हैं या अपॉइंटमेंट शेड्यूल करना चाहते हैं? हम मदद के लिए यहाँ हैं।"}
      </p>

      <Card className="border border-[#42998d] p-0">
        <CardContent className="p-5 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Patient Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-md tracking-wide font-medium text-gray-800 mb-1">
                {language === "english" ? "Patient Name" : "मरीज का नाम"}
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder={
                  language === "english" ? "Patient Name" : "मरीज का नाम"
                }
                autoComplete="off"
                className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide"
              />
            </div>

            {/* Patient Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-md font-medium text-gray-800 mb-1 tracking-wide">
                {language === "english" ? "Phone" : "फोन नंबर"}
              </label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={
                  language === "english" ? "Patient Phone" : "मरीज का फोन नंबर"
                }
                autoComplete="off"
                maxLength={10}
                className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide"
              />
            </div>

            {/* Patient Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-md font-medium text-gray-800 mb-1 tracking-wide">
                {language === "english" ? "Message" : "संदेश"}
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder={
                  language === "english"
                    ? "Write your message here..."
                    : "अपना संदेश यहाँ लिखें..."
                }
                value={form.message}
                onChange={handleChange}
                autoComplete="off"
                className="resize-none overflow-hidden text-sm p-5 pt-2 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide"
                rows={3}
                style={{ minHeight: "90px" }}
                onInput={(e) => {
                  const target = e.currentTarget;
                  target.style.height = "auto";
                  target.style.height = target.scrollHeight + "px";
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#0b968d] hover:bg-[#02998d]/90 text-white text-base font-medium cursor-pointer tracking-wide px-4 py-2 rounded-md">
                {loading
                  ? language === "english"
                    ? "Sending..."
                    : "भेजा जा रहा है..."
                  : language === "english"
                  ? "Send Message"
                  : "संदेश भेजें"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
