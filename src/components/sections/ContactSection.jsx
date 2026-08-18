"use client";

import { Container } from "@/components/ui";
import { Mail } from "lucide-react";
import { ArrowRight } from "lucide-react";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="
relative
overflow-hidden
bg-[var(--surface)]
py-32
lg:py-40
"
    >
      <Container className="max-w-7xl">
        <div
          className="
grid
gap-28
lg:grid-cols-[0.92fr_1.08fr]
items-start
"
        >
          {/* LEFT */}

          <div className="flex flex-col justify-center">
            {/* Icon */}

            <div
              className="
flex
h-14
w-14
items-center
justify-center
rounded-xl
border
border-[var(--outline)]
bg-[var(--surface-container-low)]
shadow-[0_12px_30px_rgba(0,0,0,.05)]
"
            >
              <Mail
                className="
h-6
w-6
text-[var(--primary)]
"
              />
            </div>

            {/* Eyebrow */}

            <p
              className="
              mt-8
              text-xs
              font-semibold
              uppercase
              tracking-[0.32em]
              text-[var(--primary)]
              "
            >
              Contact Us
            </p>

            {/* Heading */}

            <h2
              className="
              mt-6
              font-sentient
              text-[clamp(3rem,6vw,5.5rem)]
              leading-[0.92]
              tracking-[-0.07em]
              text-[var(--on-surface)]
              "
            >
              Let's build
              <br />
              something
              <span className="font-telma font-medium text-[var(--primary)]">
                {" "}
                meaningful.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
              mt-8
              max-w-xl
              text-lg
              leading-9
              text-[var(--tertiary)]
              "
            >
              Whether you're looking to partner, have a product question, or
              simply want to learn more about Viruj, we'd love to hear from you.
            </p>

            {/* Contact Links */}

            <div
              className="
mt-12
flex
flex-wrap
gap-x-6
gap-y-4
text-[15px]
text-[var(--tertiary)]
"
            >
              <a href="#">hello@viruj.health</a>

              <span>•</span>

              <a href="#">LinkedIn</a>

              <span>•</span>

              <a href="#">Greater Noida, India</a>
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
            rounded-[32px]
            shadow-[0_24px_80px_rgba(0,0,0,.06)]
            border
            border-[var(--outline-variant)]
           bg-[var(--surface-container-low)]
            p-10
lg:p-10
            "
          >
            <form className="space-y-6">
              {/* Name */}

              <div>
                <label className="mb-2 block text-[15px] font-medium text-[var(--on-surface)]">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full
rounded-2xl
focus:ring-1
focus:ring-[color:var(--primary-container)]
border
border-[var(--outline-variant)]
bg-transparent
px-5
py-4
text-[15px]
text-[var(--on-surface)]
placeholder:text-[var(--on-surface-variant)]
transition-all
duration-300
focus:border-[var(--primary)]
focus:outline-none"
                />
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-[15px] font-medium text-[var(--on-surface)]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full
                  focus:ring-1
focus:ring-[color:var(--primary-container)]
rounded-2xl
border
border-[var(--outline-variant)]
bg-transparent
px-5
py-4
text-[15px]
text-[var(--on-surface)]
placeholder:text-[var(--on-surface-variant)]
transition-all
duration-300
focus:border-[var(--primary)]
focus:outline-none"
                />
              </div>

              {/* Company */}

              <div>
                <label className="mb-2 block text-[15px] font-medium text-[var(--on-surface)]">
                  Company
                </label>

                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full
                  focus:ring-1
focus:ring-[color:var(--primary-container)]
rounded-2xl
border
border-[var(--outline-variant)]
bg-transparent
px-5
py-4
text-[15px]
text-[var(--on-surface)]
placeholder:text-[var(--on-surface-variant)]
transition-all
duration-300
focus:border-[var(--primary)]
focus:outline-none"
                />
              </div>

              {/* Message */}

              <div>
                <label className="mb-2 block text-[15px] font-medium text-[var(--on-surface)]">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="focus:ring-1
focus:ring-[color:var(--primary-container)]
w-full
resize-none
rounded-2xl
border
border-[var(--outline-variant)]
bg-transparent
px-5
py-4
text-[15px]
text-[var(--on-surface)]
placeholder:text-[var(--on-surface-variant)]
transition-all
duration-300
focus:border-[var(--primary)]
focus:outline-none
"
                />
              </div>

              {/* Button */}

              <button
type="submit"
className="
group
inline-flex
items-center
justify-center
rounded-full
bg-[var(--primary)]
px-9
py-4
text-base
font-semibold
text-[var(--on-primary)]
transition-all
duration-300
hover:scale-[1.03]
"
>
  <span>Send Message</span>

  <ArrowRight
    className="
ml-2
h-4
w-4
transition-all
duration-300
group-hover:translate-x-1.5
"
  />
</button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
