"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "How long does delivery take?",
    answer:
      "Most orders within Dhaka are delivered within 2-3 business days. Orders outside Dhaka typically take 4-6 business days.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash on delivery, mobile banking, and major debit/credit cards at checkout.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes, most products can be returned or exchanged within 7 days of delivery, provided they are unused and in original packaging.",
  },
  {
    question: "Do your products come with a warranty?",
    answer:
      "Most electronics and appliances come with a manufacturer warranty. Warranty terms are listed on each product page.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive updates via the phone number or email provided at checkout.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <h1 className="mb-8 font-heading text-2xl font-bold lg:text-3xl">
        Frequently Asked Questions
      </h1>

      <div className="mx-auto max-w-2xl divide-y divide-border rounded-2xl border border-border">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              {isOpen && (
                <p className="px-5 pb-5 text-sm text-muted-foreground">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
}
