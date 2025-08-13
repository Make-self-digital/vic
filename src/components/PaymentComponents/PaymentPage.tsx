"use client";

import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CheckCircle2, XCircle } from "lucide-react";

const upiIcons = [
  "/upiLogo/GooglePay.svg",
  "/upiLogo/paytm.png",
  "/upiLogo/phonepay.png",
  "/upiLogo/bhim.png",
];

const paymentMethods = [
  {
    id: "upi",
    name: "UPI",
    icons: upiIcons,
  },
  {
    id: "card",
    name: "Credit / Debit / ATM Card",
  },
  {
    id: "netbanking",
    name: "Net Banking",
  },
  {
    id: "cash",
    name: "Cash at Clinic",
  },
];

export default function PaymentPage() {
  const [selected, setSelected] = useState<string>("upi");
  const [iconIndex, setIconIndex] = useState<number>(0);
  const [upiId, setUpiId] = useState<string>("");
  const [isVerified, setIsVerified] = useState<null | boolean>(null);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % upiIcons.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    if (upiId.trim().endsWith("@ybl")) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-2 bg-white rounded-md p-4 border border-gray-300">
        <h2 className="text-md uppercase font-bold text-[#3b5757]">
          Payment Options
        </h2>
      </div>

      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="space-y-0">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelected(method.id)}
            className={cn(
              "border rounded-lg px-4 py-4 flex flex-col gap-2 cursor-pointer",
              selected === method.id
                ? "border-[#42998d] bg-[#fafafa]"
                : "border-gray-300 bg-white"
            )}>
            <div className="flex items-center gap-4">
              <RadioGroupItem
                value={method.id}
                id={method.id}
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
              <Label
                htmlFor={method.id}
                className="text-sm font-medium text-gray-800 cursor-pointer">
                {method.name}
              </Label>

              {method.id === "upi" && (
                <div className="w-7 h-7 relative ml-auto">
                  <Image
                    src={upiIcons[iconIndex]}
                    alt="upi logo"
                    fill
                    sizes="(max-width: 768px) 40px, 48px"
                    className="object-contain transition-opacity duration-300"
                  />
                </div>
              )}
            </div>

            {/* UPI Section */}
            {selected === "upi" && method.id === "upi" && (
              <div className="mt-2">
                <div className="flex flex-col gap-2">
                  {/* Center aligned group */}
                  <div className="flex justify-center">
                    {/* Fixed width box to center the whole block */}
                    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-start px-4">
                      {/* Label: Left aligned */}
                      <Label
                        htmlFor="upiId"
                        className="font-medium text-black mb-2">
                        Enter UPI ID
                      </Label>

                      {/* Input + VERIFY */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Input wrapper with icon inside */}
                        <div className="relative">
                          <Input
                            id="upiId"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Your UPI ID"
                            autoComplete="off"
                            className="w-[250px] h-9 pr-8 text-sm p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-1 focus:ring-[#42998d] focus:outline-none transition duration-150"
                          />
                          {isVerified === true && (
                            <CheckCircle2 className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                          {isVerified === false && (
                            <XCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
                          )}
                        </div>

                        <Button
                          type="button"
                          onClick={handleVerify}
                          variant="outline"
                          className="h-9 px-3 text-sm text-[#42998d] border-[#42998d] hover:bg-[#e6f4f3] cursor-pointer">
                          VERIFY
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* PAY button: right aligned */}
                  <div className="flex justify-end">
                    <Button className="h-9 px-4 text-sm bg-[#42998d] hover:bg-[#357e73] text-white font-semibold cursor-pointer">
                      PAY ₹800
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Credit Card, Debit Card, ATM Card section */}
            {selected === "card" && method.id === "card" && (
              <div className="mt-6 flex flex-col gap-3">
                {/* Cardholder Name */}
                <div className="flex flex-col mb-4">
                  <Label
                    htmlFor="cardName"
                    className="text-medium text-black mb-2">
                    Cardholder Name
                  </Label>
                  <Input
                    id="cardName"
                    placeholder="Enter Cardholder Name"
                    autoComplete="off"
                    required
                    className="text-sm p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-1 focus:ring-[#42998d] focus:outline-none transition duration-150"
                  />
                </div>

                {/* Card Number */}
                <div className="flex flex-col mb-4">
                  <Label
                    htmlFor="cardNumber"
                    className="text-medium text-black mb-2">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9101 1213"
                    autoComplete="off"
                    required
                    value={cardNumber}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      const trimmed = rawValue.slice(0, 16);
                      const formatted = trimmed
                        .replace(/(.{4})/g, "$1 ")
                        .trim();
                      setCardNumber(formatted);
                    }}
                    inputMode="numeric"
                    className="h-9 text-sm p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-1 focus:ring-[#42998d] focus:outline-none transition duration-150"
                  />
                </div>

                {/* Expiry */}
                <div className="flex gap-4">
                  <div className="flex flex-col flex-1 ">
                    <Label
                      htmlFor="expiry"
                      className="text-medium text-black mb-2">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      autoComplete="off"
                      required
                      value={expiry}
                      onChange={(e) => {
                        let input = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4); // Only numbers, max 4 digits
                        if (input.length >= 3) {
                          input = input.slice(0, 2) + "/" + input.slice(2); // Add slash after MM
                        }
                        setExpiry(input);
                      }}
                      inputMode="numeric"
                      className="h-9 text-sm p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-1 focus:ring-[#42998d] focus:outline-none transition duration-150"
                    />
                  </div>

                  {/* CVV */}
                  <div className="flex flex-col flex-1">
                    <Label
                      htmlFor="cvv"
                      className="text-black text-medium mb-2">
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      placeholder="CVV"
                      autoComplete="off"
                      required
                      className="h-9 text-sm p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-1 focus:ring-[#42998d] focus:outline-none transition duration-150"
                      inputMode="numeric"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-4">
                  <Button className="h-9 px-4 text-sm bg-[#42998d] hover:bg-[#357e73] text-white font-semibold cursor-pointer">
                    PAY ₹800
                  </Button>
                </div>
              </div>
            )}

            {/* Netbanking section */}
            {selected === "netbanking" && method.id === "netbanking" && (
              <div className="mt-4 flex flex-col gap-3">
                {/* Bank Selection */}
                <div className="flex flex-col">
                  <Label htmlFor="bank" className="text-medium text-black mb-2">
                    Select Your Bank
                  </Label>
                  <select
                    id="bank"
                    className="h-10 text-sm border border-gray-300 rounded px-3 py-2 focus:border-[#42998d] focus:outline-none focus:ring-1 focus:ring-[#42998d] transition cursor-pointer text-gray-800">
                    <option value="">Choose a Bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="federal">Federal Bank</option>
                    <option value="iob">Indian Overseas Bank</option>
                    <option value="indian-bank">Indian Bank</option>
                    <option value="airtel">Airtel Payments Bank</option>
                    <option value="au">AU Small Finance Bank</option>
                    <option value="bassien">
                      Bassien Catholic Co-Operative Bank
                    </option>
                    <option value="bnp">BNP Paribas</option>
                    <option value="bahrain">Bank of Bahrain and Kuwait</option>
                    <option value="bobcard">BOBCARD</option>
                    <option value="baroda-corp">
                      Bank of Baroda Corporate
                    </option>
                    <option value="baroda-retail">Bank of Baroda Retail</option>
                    <option value="boi">Bank of India</option>
                    <option value="bom">Bank of Maharashtra</option>
                    <option value="canara">Canara Bank</option>
                    <option value="catholic">Catholic Syrian Bank</option>
                    <option value="central">Central Bank</option>
                    <option value="city-union">City Union Bank</option>
                    <option value="corp-bank">Corporation Bank</option>
                    <option value="cosmos">Cosmos Co-op Bank</option>
                    <option value="dbs">DBS Bank</option>
                    <option value="dcb">DCB BANK LTD</option>
                    <option value="dena">Dena Bank</option>
                    <option value="deutsche">Deutsche Bank</option>
                    <option value="dhanalakshmi">Dhanalakshmi Bank</option>
                    <option value="hsbc">HSBC</option>
                    <option value="idbi">IDBI Bank</option>
                    <option value="idfc">IDFC FIRST Bank</option>
                    <option value="indusind">IndusInd Bank</option>
                    <option value="janata">
                      JANATA SAHAKARI BANK LTD PUNE
                    </option>
                    <option value="jk">J&K Bank</option>
                    <option value="karnataka">Karnataka Bank</option>
                    <option value="karur">Karur Vysya Bank</option>
                    <option value="lakshmi-retail">
                      Lakshmi Vilas Bank - Retail
                    </option>
                    <option value="lakshmi-corp">
                      Lakshmi Vilas Bank - Corporate
                    </option>
                    <option value="pnb">Punjab National Bank</option>
                    <option value="pnb-corp">
                      Punjab National Bank Corporate
                    </option>
                    <option value="pnsb">Punjab & Sind Bank</option>
                    <option value="pmc">Punjab & Maharashtra Co-op Bank</option>
                    <option value="rbl">RBL Bank Limited</option>
                    <option value="rbs">RBS</option>
                    <option value="saraswat">Saraswat Co-op Bank</option>
                    <option value="shamrao">Shamrao Vithal Co-op Bank</option>
                    <option value="shivalik">
                      Shivalik Mercantile Co-op Bank
                    </option>
                    <option value="south-indian">The South Indian Bank</option>
                    <option value="standard">Standard Chartered Bank</option>
                    <option value="tmb-ltd">
                      Tamilnad Mercantile Bank Limited
                    </option>
                    <option value="tmb">Tamil Nadu Merchantile Bank</option>
                    <option value="tnsc">TNSC Bank</option>
                    <option value="uco">UCO Bank</option>
                    <option value="union">Union Bank of India</option>
                    <option value="yes">YES BANK</option>
                    <option value="zoroastrian">
                      The Zoroastrian Co-Operative Bank
                    </option>
                  </select>
                </div>

                {/* Pay Button */}
                <div className="flex justify-end mt-4">
                  <Button className="h-9 px-4 text-sm bg-[#42998d] hover:bg-[#357e73] text-white font-semibold cursor-pointer">
                    PAY ₹800
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
