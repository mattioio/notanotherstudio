"use client";

import { useState } from "react";

export const contactChips = [
  { label: "Web Package", value: "Web Package" },
  { label: "Print Package", value: "Print Package" },
  { label: "Brand Package", value: "Brand Package" },
  { label: "Not sure yet", value: "Not sure yet" },
];

export function useContactForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleChip(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      interests: selected,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please email us directly.");
    }
  }

  return { selected, submitted, loading, error, toggleChip, handleSubmit };
}
