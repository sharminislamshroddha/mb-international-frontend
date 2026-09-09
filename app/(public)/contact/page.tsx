"use client";

import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { FormEvent, useState } from "react";

import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE } from "@/constants/site";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <h1 className="mb-8 font-heading text-2xl font-bold lg:text-3xl">
        Contact Us
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-border p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" htmlFor="name">
                Name
              </label>
              <Input id="name" name="name" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input id="email" name="email" type="email" required />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="subject">
              Subject
            </label>
            <Input id="subject" name="subject" required />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          <Button type="submit" size="lg" className="w-fit">
            Send Message
          </Button>

          {submitted && (
            <p className="flex items-center gap-2 text-sm text-success">
              <CheckCircle2 className="h-4 w-4" />
              Thanks! We&apos;ll get back to you shortly.
            </p>
          )}
        </form>

        <div className="flex flex-col gap-5 rounded-2xl border border-border p-6 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-primary" />
            <span>{SITE.address}</span>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 shrink-0 text-primary" />
            <span>{SITE.phone}</span>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 shrink-0 text-primary" />
            <span>{SITE.email}</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
