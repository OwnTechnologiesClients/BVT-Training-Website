"use client";

import {
  ContactHero,
  ContactForm,
  ContactInfo,
  ContactMap,
  ContactFAQ
} from "@/components/contact";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
      <ContactFAQ />
    </>
  );
}
