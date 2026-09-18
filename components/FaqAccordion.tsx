"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Faq = {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
};

export default function FaqAccordion({
  faqs,
}: {
  faqs: Faq[];
}) {
  const [openFaqId, setOpenFaqId] = useState<number | null>(
    faqs[0]?.id ?? null,
  );

  if (faqs.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-500">
        Belum ada pertanyaan yang tersedia.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => {
        const isOpen = openFaqId === faq.id;

        return (
          <article
            key={faq.id}
            className={`overflow-hidden rounded-2xl border transition ${
              isOpen
                ? "border-[#ff671d] bg-orange-50/50"
                : "border-gray-200 bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() =>
                setOpenFaqId(isOpen ? null : faq.id)
              }
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-5 p-5 text-left sm:p-6"
            >
              <span className="text-lg font-extrabold text-[#0d1728]">
                {faq.question}
              </span>

              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                  isOpen
                    ? "bg-[#ff671d] text-white"
                    : "bg-gray-100 text-[#0d1728]"
                }`}
              >
                <ChevronDown
                  size={21}
                  className={`transition duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ${
                isOpen
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 leading-7 text-gray-600 sm:px-6 sm:pb-6">
                  {faq.answer}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}