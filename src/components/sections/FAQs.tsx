"use client";
import { Container } from "@/components/ui/Container";
import { useState } from "react";

export function FAQs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const faqs = [
    {
      question: "How is Viruj different from other healthcare apps?",
      answer: "Viruj connects your appointments, reports, prescriptions, and medical history into one continuous healthcare journey instead of scattered records."
    },
    {
      question: "Who can access my medical records?",
      answer: "Only you control access. You decide exactly who can view or share your health information."
    },
    {
      question: "Will my existing medical history be available?",
      answer: "Viruj is designed to preserve your healthcare journey so every new consultation builds on what already exists."
    },
    {
      question: "Is my health data secure?",
      answer: "Your information is protected using modern security practices with privacy built into every interaction."
    },
    {
      question: "Can I share records with another doctor?",
      answer: "Yes. Share the right information instantly without downloading files or carrying physical reports."
    },
    {
      question: "When will Viruj be available?",
      answer: "We're currently preparing for early access. Join the waitlist to be among the first to experience Viruj."
    }
  ];
  return (
    <>
      <section className="relative w-full max-w-full overflow-x-clip bg-[var(--surface)] py-32 lg:py-40">
        <Container>

          {/* Left */}
          <div className="grid min-w-0 grid-cols-12 gap-10 lg:gap-20">

            <div className="col-span-12 min-w-0 lg:col-span-5">

              <div className="sticky top-32 max-w-[420px]">

                <p
                  className="
text-xs
uppercase
tracking-[0.32em]
text-[var(--primary)]
font-semibold
"
                >
                  FAQ
                </p>

                <h2
                  className="
mt-6
font-sentient
max-w-full
break-words
text-[clamp(3rem,12vw,5rem)]
sm:text-[clamp(3rem,6vw,6rem)]
leading-[0.92]
tracking-[-0.07em]
text-[var(--on-surface)]
"
                >
                  Frequently
                  <br />
                asked
                  <br />
                 <span className="font-telma font-medium text-[var(--primary)]">questions</span>
                </h2>
              </div>

            </div>



            {/* RIGHT */}
            <div className="col-span-12 min-w-0 lg:col-span-7">

              <div className="border-t border-[var(--outline-variant)]">

                {faqs.map((faq, index) => (

                  <div key={index} className="w-full min-w-0">
                    <div
                      className={`
group
min-w-0
border-b
py-7
transition-colors
duration-300
${
  activeIndex === index
    ? "border-[var(--primary)]"
    : "border-[var(--outline-variant)]"
}
`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveIndex(
                            activeIndex === index ? null : index
                          )}
                        className="
flex
w-full
min-w-0
items-start
justify-between
gap-4
text-left
"
                      >
                       <h3
className={`
min-w-0
flex-1
font-semibold
text-[1.25rem]
sm:text-[1.4rem]
leading-[1.35]
tracking-[-0.03em]
break-words
[text-wrap:pretty]
transition-colors
duration-300
${activeIndex===index
? "text-[var(--primary)]"
: "text-[var(--on-surface)]"}
`}
>
                          {faq.question}
                        </h3>
                        <span
className={`
shrink-0
flex
h-8
w-8
items-center
justify-center
text-[26px]
transition-all
duration-500
ease-[cubic-bezier(.22,1,.36,1)]
text-[var(--primary)]
${activeIndex===index
? "rotate-45"
: "rotate-0"}
`}
>
                          +
                        </span>
                      </button>
                      <div
className={`
grid
min-w-0
transition-all
duration-500
ease-[cubic-bezier(.22,1,.36,1)]
ease-out
${activeIndex===index
? "grid-rows-[1fr] opacity-100 pt-5"
: "grid-rows-[0fr] opacity-0"}
`}
>

                        <div
className="
min-w-0
w-full
overflow-hidden
max-w-[65ch]
pb-2
text-[16px]
leading-8
text-[var(--on-surface-variant)]
[text-wrap:pretty]
break-words
"
>

                          {faq.answer}

                        </div>

                      </div>

                    </div>
                  </div>

                ))}

              </div>
            </div>


          </div>
        </Container>
      </section>
    </>
  );
}
