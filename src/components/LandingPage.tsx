"use client";

import {
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  ClipboardList,
  Copy,
  Hospital,
  Mail,
  Menu,
  Search,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import { destinations } from "@/data/destinations";
import { contactDraft } from "@/lib/contact-draft";

type Feature = {
  name: string;
  icon: typeof Search;
  title: string;
  text: string;
  image: string;
  alt: string;
};

const features: Feature[] = [
  {
    name: "Find care",
    icon: Search,
    title: "Find the right place to start.",
    text: "Browse doctors, hospitals, clinics, and labs. See specialty, practice, and fee before you book.",
    image: "doctors",
    alt: "Viruj mobile app showing nearby doctors",
  },
  {
    name: "Book a visit",
    icon: CalendarDays,
    title: "Book without the back-and-forth.",
    text: "Choose a doctor and practice, add your details, and request a time. Your care team reviews the request.",
    image: "booking",
    alt: "Viruj mobile app appointment request form",
  },
  {
    name: "My Health",
    icon: ClipboardList,
    title: "Know where your visit stands.",
    text: "See current and past appointments, check their status, and book again from your history.",
    image: "health",
    alt: "Viruj mobile app showing current and past appointments",
  },
  {
    name: "Ask AI",
    icon: Sparkles,
    title: "Make sense of health questions.",
    text: "Ask in your own words. Viruj AI helps explain topics and prepare questions for your doctor.",
    image: "ai",
    alt: "Viruj mobile AI assistant with example health questions",
  },
];

const faqs: Array<[string, string]> = [
  [
    "What is Viruj?",
    "Viruj connects a patient app with a workspace for care teams. Patients find care and request visits. Providers manage those requests and their daily work.",
  ],
  [
    "How do I get the app?",
    "Request app access below. Our team will share the current access options, and we’ll add store links when they are available.",
  ],
  [
    "Is my appointment confirmed as soon as I book?",
    "No. You send a request first. The provider reviews it, and you can check the status in My Health.",
  ],
  [
    "Can AI replace my doctor?",
    "No. Viruj AI offers general health information. It can be wrong and does not diagnose, prescribe, or replace a doctor. For urgent care, contact local emergency services.",
  ],
];

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and lifts content into view as it enters the viewport.
 */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.9, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function Action({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`action ${secondary ? "action-secondary" : "action-primary"} ${className}`}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

function Phone({
  screen,
  alt,
  className = "",
  priority = false,
}: {
  screen: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`phone ${className}`}>
      <Image
        src={`/screens/mobile/${screen}.jpg?v=2`}
        alt={alt}
        width={390}
        height={844}
        sizes="(max-width: 600px) 65vw, 300px"
        priority={priority}
      />
      <span className="phone-camera" aria-hidden="true" />
    </div>
  );
}

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Viruj Health home">
      <Image src="/brand/logo.png" alt="" width={34} height={34} />
      <span>
        viruj<span className="brand-dot">.</span>
        <span className="brand-health"> health</span>
      </span>
    </Link>
  );
}

export default function LandingPage() {
  const startDialog = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [contactKind, setContactKind] = useState("App access");
  const [draft, setDraft] = useState<{ href: string; text: string } | null>(
    null,
  );
  const [copyStatus, setCopyStatus] = useState("");
  const feature = features[activeFeature];

  /**
   * Builds a mailto draft from the contact form without sending data to a server.
   */
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") || "").trim();
    const email = String(values.get("email") || "").trim();
    const message = String(values.get("message") || "").trim();
    setDraft(
      contactDraft(destinations.email, contactKind, name, email, message),
    );
    setCopyStatus("");
  }

  /**
   * Copies the prepared email draft to the clipboard when available.
   */
  async function copyDraft() {
    if (!draft) {
      return;
    }

    try {
      await navigator.clipboard.writeText(draft.text);
      setCopyStatus("Copied. Paste it into an email to help@virujhealth.com.");
    } catch {
      setCopyStatus("Copy is unavailable. Select and copy the draft below.");
    }
  }

  /**
   * Moves feature selection with keyboard arrows, Home, and End.
   */
  function handleFeatureKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? (index + 1) % features.length
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? (index + features.length - 1) % features.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? features.length - 1
              : null;

    if (next === null) {
      return;
    }

    event.preventDefault();
    setActiveFeature(next);
    document.getElementById(`feature-tab-${next}`)?.focus();
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setMenuOpen(false);
            document.getElementById("navigation-toggle")?.focus();
          }
        }}
      >
        <div className="wrap header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#patients">
              <Smartphone size={15} aria-hidden="true" />
              For you
            </a>
            <a href="#organizations">
              <Hospital size={15} aria-hidden="true" />
              For care teams
            </a>
            <a href="#how-it-works">
              <CalendarDays size={15} aria-hidden="true" />
              How it works
            </a>
            <a href="#faq">
              <Sparkles size={15} aria-hidden="true" />
              Questions
            </a>
          </nav>
          <div className="header-actions">
            <button
              className="action action-primary"
              type="button"
              aria-haspopup="dialog"
              onClick={() => {
                setMenuOpen(false);
                startDialog.current?.showModal();
              }}
            >
              Get started <ArrowUpRight size={17} aria-hidden="true" />
            </button>
            <button
              className="menu-button"
              id="navigation-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="mobile-nav wrap"
              id="mobile-menu"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              {[
                ["For you", "#patients"],
                ["For care teams", "#organizations"],
                ["How it works", "#how-it-works"],
                ["Questions", "#faq"],
                ["Provider login", destinations.provider],
              ].map(([text, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                  {text}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <dialog
        ref={startDialog}
        className="start-dialog"
        aria-labelledby="start-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            startDialog.current?.close();
          }
        }}
      >
        <div className="start-dialog-panel">
          <button
            type="button"
            className="dialog-close"
            aria-label="Close get started"
            onClick={() => startDialog.current?.close()}
          >
            <X size={20} />
          </button>
          <p className="eyebrow">GET STARTED WITH VIRUJ</p>
          <h2 id="start-dialog-title">Which one are you?</h2>
          <p>Choose where you’d like to go.</p>
          <div className="start-dialog-choices">
            {destinations.playStore ? (
              <a href={destinations.playStore} className="start-dialog-choice">
                <span className="choice-icon">
                  <Smartphone size={24} />
                </span>
                <span>
                  <strong>I’m a user</strong>
                  <small>Get the app on Google Play</small>
                </span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            ) : (
              <button type="button" className="start-dialog-choice" disabled>
                <span className="choice-icon">
                  <Smartphone size={24} />
                </span>
                <span>
                  <strong>I’m a user</strong>
                  <small>Play Store link coming soon</small>
                </span>
              </button>
            )}
            <a href={destinations.provider} className="start-dialog-choice">
              <span className="choice-icon">
                <Hospital size={24} />
              </span>
              <span>
                <strong>I’m a healthcare provider</strong>
                <small>Open the provider workspace</small>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </dialog>

      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut }}
          >
            <p className="eyebrow">
              <span className="small-dot" />
              ONE APP. ONE CONNECTED CARE JOURNEY.
            </p>
            <h1 id="hero-title">
              Your care.
              <br />
              <em>All together.</em>
            </h1>
            <p className="hero-description">
              Find a doctor. Request a visit. Stay in the loop.
              <br /> One app for you. One workspace for your care team.
            </p>
            <div className="actions">
              <Action href="#patients">Explore the app</Action>
              <Action href="#organizations" secondary>
                For organizations
              </Action>
            </div>
          </motion.div>
          <div className="hero-visual">
            {[
              {
                label: "01 / FIND CARE",
                screen: "home",
                alt: "Viruj mobile home screen with specialties and care search",
                className: "",
                delay: 0.2,
              },
              {
                label: "02 / FOLLOW YOUR VISIT",
                screen: "health",
                alt: "Viruj mobile app showing appointment status and history",
                className: "hero-screen-main",
                delay: 0.35,
              },
              {
                label: "03 / ASK A QUESTION",
                screen: "ai",
                alt: "Viruj mobile AI assistant showing example health questions",
                className: "",
                delay: 0.5,
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                className={`hero-screen ${item.className}`}
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: item.delay, ease: easeOut }}
              >
                <span>{item.label}</span>
                <Phone screen={item.screen} alt={item.alt} priority />
              </motion.div>
            ))}
          </div>
        </section>

        <section
          className="patient-section"
          id="patients"
          aria-labelledby="patient-title"
        >
          <div className="wrap section">
            <Reveal className="section-heading heading-row">
              <div>
                <p className="eyebrow">FOR YOU & YOUR FAMILY</p>
                <h2 id="patient-title">
                  Your next step,
                  <br />
                  <em>made simpler.</em>
                </h2>
              </div>
              <p>
                A familiar app for finding care,
                <br className="desktop-break" /> following visits, and asking
                questions.
              </p>
            </Reveal>
            <Reveal className="patient-showcase" delay={0.08}>
              <div
                className="feature-picker"
                role="tablist"
                aria-label="Explore the patient app"
              >
                {features.map(({ name, icon: Icon }, index) => (
                  <button
                    key={name}
                    role="tab"
                    id={`feature-tab-${index}`}
                    aria-selected={activeFeature === index}
                    aria-controls="feature-panel"
                    tabIndex={activeFeature === index ? 0 : -1}
                    onClick={() => setActiveFeature(index)}
                    onKeyDown={(event) => handleFeatureKey(event, index)}
                  >
                    <Icon size={19} aria-hidden="true" />
                    <span>{name}</span>
                    <ArrowRight size={17} aria-hidden="true" />
                  </button>
                ))}
              </div>
              <div
                className="feature-panel"
                id="feature-panel"
                role="tabpanel"
                aria-labelledby={`feature-tab-${activeFeature}`}
                tabIndex={0}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    className="feature-copy"
                    key={feature.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: easeOut }}
                  >
                    <span className="feature-number">
                      0{activeFeature + 1} / 0{features.length}
                    </span>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                    <Action href={destinations.appAccess}>
                      Request app access
                    </Action>
                  </motion.div>
                </AnimatePresence>
                <div className="feature-image">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={feature.image}
                      initial={{ opacity: 0, scale: 0.96, y: 18 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -10 }}
                      transition={{ duration: 0.5, ease: easeOut }}
                    >
                      <Phone screen={feature.image} alt={feature.alt} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          className="section wrap how-section"
          id="how-it-works"
          aria-labelledby="how-title"
        >
          <Reveal className="section-heading">
            <p className="eyebrow">HOW A VISIT WORKS</p>
            <h2 id="how-title">
              From finding care
              <br />
              <em>to showing up.</em>
            </h2>
          </Reveal>
          <ol className="steps">
            {[
              [
                "Find your doctor",
                "Choose a doctor and the practice you want to visit.",
              ],
              [
                "Request a time",
                "Add your patient details and send your appointment request.",
              ],
              [
                "Check the update",
                "Your care team reviews it. My Health shows the current status.",
              ],
              [
                "Arrive for your visit",
                "After approval, follow your practice’s check-in instructions.",
              ],
            ].map(([title, text], index) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: easeOut }}
              >
                <span className="step-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.li>
            ))}
          </ol>
        </section>

        <section
          className="organization-section"
          id="organizations"
          aria-labelledby="org-title"
        >
          <div className="wrap section org-grid">
            <Reveal className="org-copy">
              <p className="eyebrow">FOR DOCTORS & ORGANIZATIONS</p>
              <h2 id="org-title">
                Less chasing.
                <br />
                <em>More time for patients.</em>
              </h2>
              <p>
                Give your team one workspace for appointment requests, patient
                visits, and everyday tasks.
              </p>
              <ul className="check-list">
                <li>
                  <Check />
                  Review and approve appointment requests.
                </li>
                <li>
                  <Check />
                  Manage schedules and patient visits.
                </li>
                <li>
                  <Check />
                  Give staff access based on their role.
                </li>
              </ul>
              <div className="actions">
                <Action href={destinations.demo}>Ask for a demo</Action>
                <a className="text-link" href={destinations.provider}>
                  Open provider portal <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="workflow-board">
                <div className="board-header">
                  <span className="board-mark">
                    <Hospital size={21} />
                  </span>
                  <div>
                    <strong>One visit. Both sides connected.</strong>
                    <span>Patient app ↔ Care team workspace</span>
                  </div>
                </div>
                <div className="workflow-lane">
                  <span className="lane-label">PATIENT</span>
                  <div className="workflow-item">
                    <Smartphone />
                    <div>
                      <strong>Request a visit</strong>
                      <span>Doctor, practice, patient details, time</span>
                    </div>
                  </div>
                </div>
                <div className="workflow-connector" aria-hidden="true">
                  <ArrowRight />
                </div>
                <div className="workflow-lane">
                  <span className="lane-label">CARE TEAM</span>
                  <div className="workflow-item">
                    <CalendarDays />
                    <div>
                      <strong>Review the request</strong>
                      <span>Approve, reschedule, or decline</span>
                    </div>
                  </div>
                  <div className="workflow-item">
                    <CheckCheck />
                    <div>
                      <strong>Check in the patient</strong>
                      <span>Verify arrival for an approved visit</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          className="faq-section wrap"
          id="faq"
          aria-labelledby="faq-title"
        >
          <Reveal>
            <p className="eyebrow">A FEW THINGS TO KNOW</p>
            <h2 id="faq-title">
              Good questions.
              <br />
              <em>Simple answers.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <ChevronDown size={19} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </Reveal>
        </section>

        <section
          className="wrap contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <Reveal>
            <p className="eyebrow">TALK TO US</p>
            <h2 id="contact-title">
              Let’s make it
              <br />
              <em>work for you.</em>
            </h2>
            <p>
              App access, a team demo, or a question.
              <br />
              Tell us what you need.
            </p>
            <a href={`mailto:${destinations.email}`} className="contact-link">
              <Mail size={18} />
              {destinations.email}
            </a>
            <a href={`tel:${destinations.phone}`} className="text-link">
              +91 79829 58828 <ArrowUpRight size={15} />
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={prepareEmail} className="contact-form">
              <fieldset>
                <legend>I’m interested in</legend>
                <div className="contact-choices">
                  {["App access", "Provider demo", "A question"].map((kind) => (
                    <label key={kind}>
                      <input
                        type="radio"
                        name="interest"
                        value={kind}
                        checked={contactKind === kind}
                        onChange={() => {
                          setContactKind(kind);
                          setDraft(null);
                        }}
                      />
                      <span>{kind}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Full name"
                    required
                    maxLength={100}
                    onChange={() => setDraft(null)}
                  />
                </label>
                <label>
                  Your email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    maxLength={254}
                    onChange={() => setDraft(null)}
                  />
                </label>
              </div>
              <label>
                How can we help?
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us a little about what you need."
                  required
                  maxLength={1500}
                  onChange={() => setDraft(null)}
                />
              </label>
              <p className="form-note">
                Please leave out medical records and private health details.
              </p>
              <button type="submit" className="action action-primary">
                Prepare email <ArrowRight size={17} />
              </button>
              {draft && (
                <div className="email-draft" aria-live="polite">
                  <strong>Your draft is ready.</strong>
                  <div className="actions">
                    <Action href={draft.href}>Open email draft</Action>
                    <button
                      type="button"
                      onClick={() => void copyDraft()}
                      className="copy-button"
                    >
                      <Copy size={16} />
                      Copy message
                    </button>
                  </div>
                  <details>
                    <summary>
                      View message <ChevronDown size={16} />
                    </summary>
                    <pre>{draft.text}</pre>
                  </details>
                  <p role="status">{copyStatus}</p>
                </div>
              )}
            </form>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-main">
          <div>
            <Brand />
            <p>
              You and your care team.
              <br />A little more connected.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <div>
              <strong>Explore</strong>
              <a href="#patients">Patient app</a>
              <a href="#organizations">For care teams</a>
              <a href="#how-it-works">How it works</a>
            </div>
            <div>
              <strong>Get connected</strong>
              <a href={destinations.appAccess}>Request app access</a>
              <a href={destinations.demo}>Ask for a demo</a>
            </div>
            <div>
              <strong>Help</strong>
              <a href="#faq">Common questions</a>
              <a href="#contact">Contact us</a>
              <Link href="/privacy">Website privacy</Link>
            </div>
          </nav>
        </div>
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} Viruj Health</span>
          <span>Built for people. Built for care.</span>
        </div>
      </footer>
    </>
  );
}
