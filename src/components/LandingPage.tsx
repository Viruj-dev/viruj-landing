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
  ChevronDown,
  ClipboardList,
  Hospital,
  Info,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Search,
  Smartphone,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { destinations } from "@/data/destinations";

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
    text: "Browse doctors, hospitals, clinics, and labs. See department, practice, and fee before you book.",
    image: "doctors",
    alt: "Viruj mobile app showing nearby doctors and departments",
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
    "Viruj connects a patient app with a workspace for care teams. Patients find care and request visits across departments and clinics. Providers manage those requests and their daily work seamlessly.",
  ],
  [
    "How do I get the app?",
    "Join our early access waitlist below with your name and email. We'll notify you as soon as the app is ready for your device and available in your city.",
  ],
  [
    "Is my appointment confirmed as soon as I book?",
    "No. You send a request first. The provider reviews it, and you can check the status in My Health.",
  ],
  [
    "Can AI replace my doctor?",
    "No. Viruj AI offers general health information and visit preparation. It does not diagnose, prescribe, or replace a doctor. For urgent care, contact local emergency services.",
  ],
  [
    "Which cities are currently supported?",
    "Viruj is currently operational in Noida, Greater Noida, and Ghaziabad, with regional provider expansion in progress across Delhi NCR and beyond.",
  ],
  [
    "Can I view my past medical records in Viruj?",
    "Yes. You can upload previous prescriptions, lab reports, and doctor notes to your personal My Health timeline. New appointments and diagnostics booked via Viruj automatically sync to your timeline.",
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
  onClick,
  children,
  secondary = false,
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`action ${secondary ? "action-secondary" : "action-primary"} ${className}`}
      >
        {children}
        <ArrowUpRight size={17} aria-hidden="true" />
      </button>
    );
  }

  return (
    <a
      href={href || "#"}
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
      <Image src="/brand/logo.png" alt="Viruj Logo" width={34} height={34} />
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

  // Dialog view state: "select" | "waitlist" | "waitlist-success"
  const [dialogView, setDialogView] = useState<"select" | "waitlist" | "waitlist-success">("select");
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistError, setWaitlistError] = useState("");
  const [waitlistEmailSubmitted, setWaitlistEmailSubmitted] = useState("");

  // Contact form submission state
  const [contactKind, setContactKind] = useState("App access");
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [contactError, setContactError] = useState("");

  const feature = features[activeFeature];

  function openGetStarted(view: "select" | "waitlist" = "select") {
    setDialogView(view);
    setWaitlistError("");
    startDialog.current?.showModal();
  }

  /**
   * Submits early access waitlist form asynchronously to API
   */
  async function handleWaitlistSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWaitlistLoading(true);
    setWaitlistError("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const city = String(formData.get("city") || "Delhi NCR").trim();

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, city, role: "patient" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to join waitlist.");
      }

      setWaitlistEmailSubmitted(email);
      setDialogView("waitlist-success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to submit. Please try again.";
      setWaitlistError(message);
    } finally {
      setWaitlistLoading(false);
    }
  }

  /**
   * Submits contact form asynchronously to API
   */
  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactStatus("submitting");
    setContactError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest: contactKind, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setContactStatus("success");
      form.reset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      setContactError(message);
      setContactStatus("error");
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
            <a href="#about">
              <Info size={15} aria-hidden="true" />
              About &amp; Coverage
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
              className="action action-primary header-get-started-btn"
              type="button"
              aria-label="Get started"
              aria-haspopup="dialog"
              onClick={() => {
                setMenuOpen(false);
                openGetStarted("select");
              }}
            >
              <span className="header-btn-text">Get started</span>
              <ArrowUpRight size={17} aria-hidden="true" />
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
                ["About & Coverage", "#about"],
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

      {/* Interactive Get Started / Waitlist Dialog */}
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
            aria-label="Close dialog"
            onClick={() => startDialog.current?.close()}
          >
            <X size={20} />
          </button>

          {dialogView === "select" && (
            <>
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
                      <strong>I’m a patient / user</strong>
                      <small>Get the app on Google Play</small>
                    </span>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    className="start-dialog-choice"
                    onClick={() => setDialogView("waitlist")}
                  >
                    <span className="choice-icon">
                      <Smartphone size={24} />
                    </span>
                    <span>
                      <strong>I’m a patient / user</strong>
                      <small>Join early access waitlist</small>
                    </span>
                    <ArrowRight size={20} aria-hidden="true" />
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
            </>
          )}

          {dialogView === "waitlist" && (
            <div className="waitlist-flow">
              <button
                type="button"
                className="waitlist-back-btn"
                onClick={() => setDialogView("select")}
              >
                ← Back to options
              </button>
              <p className="eyebrow">EARLY ACCESS WAITLIST</p>
              <h2 id="start-dialog-title">Join the Patient App Waitlist</h2>
              <p className="waitlist-desc">
                Be the first to access Viruj in your city. We&apos;ll notify you as soon as early access opens.
              </p>

              <form onSubmit={handleWaitlistSubmit} className="waitlist-form">
                <label>
                  Full Name
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    maxLength={80}
                  />
                </label>

                <label>
                  Email Address
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    maxLength={100}
                  />
                </label>

                <label>
                  Your City / Area
                  <input
                    name="city"
                    type="text"
                    placeholder="e.g. Noida, Greater Noida, Ghaziabad"
                    defaultValue="Noida"
                    maxLength={60}
                  />
                </label>

                {waitlistError && (
                  <p className="form-error-alert" role="alert">
                    {waitlistError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={waitlistLoading}
                  className="action action-primary waitlist-submit-btn"
                >
                  {waitlistLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={17} />
                      Joining waitlist...
                    </>
                  ) : (
                    <>
                      Get Early Access <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {dialogView === "waitlist-success" && (
            <div className="waitlist-success-panel">
              <div className="success-badge-icon">
                <Check size={28} />
              </div>
              <p className="eyebrow">YOU&apos;RE ON THE LIST!</p>
              <h2>Thank you for joining.</h2>
              <p>
                We&apos;ve reserved your early access spot. An invitation will be sent to{" "}
                <strong>{waitlistEmailSubmitted}</strong> as soon as rollouts begin.
              </p>
              <div className="actions" style={{ marginTop: 24, justifyContent: "center" }}>
                <button
                  type="button"
                  className="action action-primary"
                  onClick={() => startDialog.current?.close()}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>

      <main id="main">
        {/* HERO SECTION */}
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
              <span className="hero-title-lead">Your care.</span>
              <br />
              <em>All together.</em>
            </h1>
            <p className="hero-description">
              Find a doctor. Request a visit. Stay in the loop.
              <br /> One app for you. One workspace for your care team.
            </p>
            <div className="actions hero-actions">
              <Action onClick={() => openGetStarted("waitlist")} className="hero-waitlist-btn">
                Join early access waitlist
              </Action>
              <Action href="#organizations" secondary className="hero-care-teams-btn">
                For care teams
              </Action>
            </div>
          </motion.div>
          <div className="hero-visual">
            {[
              {
                label: "01 / FIND CARE",
                screen: "doctors",
                alt: "Viruj mobile app showing doctors and departments",
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

        {/* PATIENT SECTION */}
        <section
          className="patient-section"
          id="patients"
          aria-labelledby="patient-title"
        >
          <div className="wrap section">
            <Reveal className="section-heading heading-row">
              <div>
                <p className="eyebrow">FOR YOU &amp; YOUR FAMILY</p>
                <h2 id="patient-title">
                  Your next step,
                  <br />
                  <em>made simpler.</em>
                </h2>
              </div>
              <p>
                A familiar app for finding care across departments,
                <br className="desktop-break" /> following visits, and asking questions.
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
                    <div className="feature-perks">
                      <span>✓ Real-time clinic &amp; doctor availability</span>
                      <span>✓ Upfront consultation fee transparency</span>
                    </div>
                    <Action onClick={() => openGetStarted("waitlist")}>
                      Join early access waitlist
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

        {/* ABOUT & COVERAGE SECTION */}
        <section
          className="section wrap about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <Reveal className="section-heading">
            <p className="eyebrow">TRANSPARENCY &amp; COVERAGE</p>
            <h2 id="about-title">
              Who runs Viruj,
              <br />
              <em>and where we operate.</em>
            </h2>
            <p>
              Healthcare should be clear from day one. Here is who is building Viruj and which cities we actively cover.
            </p>
          </Reveal>

          <div className="about-grid">
            <Reveal className="about-card" delay={0.06}>
              <div className="about-card-icon">
                <Users size={24} />
              </div>
              <h3>Who runs Viruj</h3>
              <p>
                Viruj Health is built by our founding and engineering team to eliminate fragmented patient portals, disjointed appointment inboxes, and scattered medical paperwork.
              </p>

              <div className="founders-list">
                <div className="founder-item">
                  <div className="founder-avatar">VP</div>
                  <div className="founder-info">
                    <strong>Vasu Pandey</strong>
                    <span>Founder</span>
                  </div>
                </div>
                <div className="founder-item">
                  <div className="founder-avatar">AN</div>
                  <div className="founder-info">
                    <strong>Abhishek Negi</strong>
                    <span>Chief Technology Officer (CTO)</span>
                  </div>
                </div>
              </div>

              <ul className="about-list">
                <li>
                  <Check size={16} /> Privacy-first healthcare architecture
                </li>
                <li>
                  <Check size={16} /> Clinically-grounded doctor workflows
                </li>
                <li>
                  <Check size={16} /> Built around DPDP Act (2023) privacy principles
                </li>
              </ul>
              <Link href="/privacy-policy" className="about-policy-link">
                Read our App Privacy Policy &amp; Data Protections →
              </Link>
            </Reveal>

            <Reveal className="about-card" delay={0.12}>
              <div>
                <div className="about-card-icon">
                  <MapPin size={24} />
                </div>
                <h3>Where we operate</h3>
                <p>
                  <strong>Current In-Person Care Coverage:</strong>
                </p>
                <div className="coverage-tags">
                  <span className="coverage-tag active">
                    <span className="status-dot-live" /> Noida
                  </span>
                  <span className="coverage-tag active">
                    <span className="status-dot-live" /> Greater Noida
                  </span>
                  <span className="coverage-tag active">
                    <span className="status-dot-live" /> Ghaziabad
                  </span>
                </div>
                <p className="coverage-subtext">
                  Direct appointment booking and check-in are live across clinics and hospitals in these cities.
                </p>

                <div className="expansion-box">
                  <div className="expansion-header">
                    <strong>Expanding Next:</strong>
                    <span>Delhi, Gurugram, Faridabad, Bengaluru, Mumbai &amp; Pune</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openGetStarted("waitlist")}
                    className="city-request-btn"
                  >
                    Request Viruj in your city →
                  </button>
                </div>
              </div>

              {/* Visually separated box for Nationwide Access */}
              <div className="nationwide-callout-card">
                <div className="nationwide-card-header">
                  <Sparkles size={16} className="text-wine" />
                  <strong>Nationwide Digital Access</strong>
                </div>
                <p>
                  AI symptom guidance, doctor visit preparation, and your personal uploaded health records timeline are accessible anywhere across India.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
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
          <div className="steps-container">
            <ol className="steps">
              {[
                [
                  "Find your doctor",
                  "Choose a doctor, department, and the clinic or hospital practice you want to visit.",
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
                  className="step-item"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: easeOut }}
                >
                  <div className="step-header">
                    <span className="step-number">0{index + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ORGANIZATIONS SECTION */}
        <section
          className="organization-section"
          id="organizations"
          aria-labelledby="org-title"
        >
          <div className="wrap section org-grid">
            <Reveal className="org-copy">
              <p className="eyebrow">FOR DOCTORS &amp; CARE TEAMS</p>
              <h2 id="org-title">
                Less chasing.
                <br />
                <em>More time for patients.</em>
              </h2>
              <p>
                Give your team one workspace for appointment requests, patient
                visits, and everyday clinical tasks.
              </p>
              <ul className="check-list">
                <li>
                  <Check size={18} />
                  Requests land in one queue
                </li>
                <li>
                  <Check size={18} />
                  Approve, reschedule, or decline in a tap
                </li>
                <li>
                  <Check size={18} />
                  Staff see only what their role allows
                </li>
              </ul>
              <div className="actions">
                <Action href="#contact">Ask for a demo</Action>
                <a
                  className="action action-provider-outline"
                  href={destinations.provider}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open provider portal <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="provider-showcase-container">
              <div className="provider-showcase-wrapper">
                <div className="provider-window-frame">
                  <div className="window-frame-header">
                    <div className="window-dots">
                      <span className="window-dot red" />
                      <span className="window-dot yellow" />
                      <span className="window-dot green" />
                    </div>
                    <span className="window-title">erp.virujhealth.com — Appointment Requests</span>
                  </div>
                  <div className="window-content">
                    <Image
                      src="/screens/erp-workspace.svg"
                      alt="Viruj Provider Workspace appointment requests queue"
                      width={720}
                      height={456}
                      className="erp-window-image"
                    />
                  </div>
                </div>

                {/* Floating card on bottom-left corner */}
                <div className="floating-request-card">
                  <div className="floating-card-status">
                    <span className="floating-status-dot" />
                    <span>Pending request · Dr. Meera Sethi · 4:30 PM</span>
                  </div>
                  <div className="floating-card-patient">
                    <strong>Asha Sharma</strong>
                    <span>Cardiology · In-Person OPD</span>
                  </div>
                  <div className="floating-card-actions">
                    <button type="button" className="floating-btn-approve">
                      Approve
                    </button>
                    <button type="button" className="floating-btn-reschedule">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ SECTION */}
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

        {/* CONTACT SECTION WITH REAL ASYNC FORM SUBMISSION */}
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
              Early app access, a provider team demo, or questions about coverage.
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
            <form onSubmit={handleContactSubmit} className="contact-form">
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
                        onChange={() => setContactKind(kind)}
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
                />
              </label>
              <p className="form-note">
                Please leave out medical records and private health details.
              </p>

              {contactError && (
                <div className="form-error-alert" role="alert">
                  <p>{contactError}</p>
                </div>
              )}

              {contactStatus === "success" ? (
                <div className="form-success-alert" role="status">
                  <Check size={20} />
                  <div>
                    <strong>Message sent successfully!</strong>
                    <p>Thank you for reaching out. Our team will get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={contactStatus === "submitting"}
                  className="action action-primary"
                >
                  {contactStatus === "submitting" ? (
                    <>
                      <Loader2 className="animate-spin" size={17} />
                      Sending message...
                    </>
                  ) : (
                    <>
                      Send message <ArrowRight size={17} />
                    </>
                  )}
                </button>
              )}
            </form>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="wrap footer-main">
          <div>
            <Brand />
            <p>
              Connected healthcare for patients, clinics, and doctors.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <div>
              <strong>Explore</strong>
              <a href="#patients">Patient app</a>
              <a href="#organizations">For care teams</a>
              <a href="#about">About &amp; Coverage</a>
              <a href="#how-it-works">How it works</a>
            </div>
            <div>
              <strong>Get started</strong>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => openGetStarted("waitlist")}
              >
                Join waitlist
              </button>
              <a href="#contact">Ask for a demo</a>
              <a href={destinations.provider}>Provider workspace</a>
            </div>
            <div>
              <strong>Trust &amp; Legal</strong>
              <Link href="/privacy-policy">App Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
              <Link href="/privacy">Website Privacy</Link>
              <a href="#faq">Questions</a>
            </div>
          </nav>
        </div>
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} Viruj Health · Built for care in Noida, Greater Noida &amp; Ghaziabad.</span>
        </div>
      </footer>
    </>
  );
}
