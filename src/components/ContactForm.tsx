"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);

    // Handle submit logic (API, email etc.)

    // Reset form
    setForm({
      name: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
        Get in Touch
      </h2>
      <p className="text-center text-gray-600 text-sm md:text-base mb-6">
        Have questions or want to schedule an appointment? We’re here to help.
      </p>

      <Card className="shadow-sm border border-gray-200 p-0">
        <CardContent className="p-5 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-800 mb-1">
                Patient Name
              </label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Patient Name"
                className="text-sm p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-1 focus:ring-[#42998d] focus:outline-none transition duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-md font-medium text-gray-800 mb-1">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. +91 9876543210"
                className="text-sm p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-1 focus:ring-[#42998d] focus:outline-none transition duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-md font-medium text-gray-800 mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                className="resize-none overflow-hidden text-sm p-5 pt-2 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-1 focus:ring-[#42998d] focus:outline-none transition duration-150"
                rows={3}
                style={{ minHeight: "90px" }}
                onInput={(e) => {
                  const target = e.currentTarget;
                  target.style.height = "auto";
                  target.style.height = target.scrollHeight + "px";
                }}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full bg-[#42998d] hover:bg-[#367c74] text-white text-base font-medium cursor-pointer p-6">
                Send Message
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
