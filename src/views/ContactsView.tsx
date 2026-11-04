import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactsData } from "../data/contacts";
import {
  Mail,
  MapPin,
  FileDown,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Clock,
  ArrowDown,
  Send,
  Loader2,
  Calendar,
} from "lucide-react";
import { LinkedinIcon, GithubIcon, TelegramIcon } from "../components/Icons";
import { useLanguage } from "../i18n/LanguageContext";

type FormState = "idle" | "sending" | "sent" | "error";

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Job offer");
  const [message, setMessage] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setState("sending");
    setErrorText(null);
    try {
      const res = await fetch(
        `https://formspree.io/f/${contactsData.formspreeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            topic,
            message: message.trim(),
            _subject: `[Portfolio] ${topic} — ${name.trim()}`,
            _gotcha: gotcha,
          }),
        },
      );
      if (res.ok) {
        setState("sent");
        setName("");
        setEmail("");
        setMessage("");
        setGotcha("");
        return;
      }
      let detail: { errors?: { field?: string; message?: string }[] } = {};
      try {
        detail = await res.json();
      } catch {
        detail = {};
      }
      const fields = (detail.errors ?? [])
        .map((er) => er.field)
        .filter(Boolean)
        .join(", ");
      if (fields.includes("email")) {
        setErrorText(t.contacts.formErrInvalidEmail);
      } else if (res.status === 422) {
        setErrorText(t.contacts.formErrCheckFields);
      } else if (res.status === 403) {
        setErrorText(t.contacts.formErrBlocked);
      } else {
        setErrorText(t.contacts.formErrGeneric);
      }
      setState("error");
    } catch {
      setState("error");
      setErrorText(t.contacts.formErrNoConnection);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-control text-base sm:text-sm bg-canvas/70 border border-stroke text-bone placeholder:text-granite focus:outline-none focus:border-signal transition-colors";

  if (state === "sent") {
    return (
      <div className="p-6 rounded-control border border-signal/30 bg-signal/10 text-center space-y-2">
        <Check className="w-6 h-6 mx-auto text-signal" />
        <p className="text-sm text-bone font-medium">
          {t.contacts.formSentSuccess}
        </p>
        <button
          onClick={() => setState("idle")}
          className="text-xs font-mono text-granite hover:text-bone transition-colors"
        >
          {t.contacts.formSendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          id="contact-name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.contacts.formName}
          aria-label={t.contacts.formName}
          autoComplete="name"
          required
          maxLength={100}
          className={inputClass}
        />
        <input
          id="contact-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.contacts.formEmail}
          aria-label={t.contacts.formEmail}
          autoComplete="email"
          required
          maxLength={200}
          className={inputClass}
        />
        <select
          id="contact-topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          aria-label={t.contacts.formTopic}
          className={`${inputClass} [color-scheme:dark]`}
        >
          <option value="Job offer">{t.contacts.formTopicJob}</option>
          <option value="Internship">{t.contacts.formTopicInternship}</option>
          <option value="Collaboration">{t.contacts.formTopicCollab}</option>
          <option value="Question">{t.contacts.formTopicQuestion}</option>
        </select>
      </div>
      <textarea
        id="contact-message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t.contacts.formMessage}
        aria-label={t.contacts.formMessage}
        required
        rows={4}
        maxLength={2000}
        className={`${inputClass} resize-y`}
      />
      {/* Honeypot: invisible to humans, bots fill it and get rejected */}
      <input
        id="contact-gotcha"
        name="_gotcha"
        type="text"
        value={gotcha}
        onChange={(e) => setGotcha(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      {state === "error" && errorText && (
        <p className="text-xs text-signal">
          {errorText}{" "}
          <a href={`mailto:${contactsData.email}`} className="underline">
            {contactsData.email}
          </a>
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-control bg-bone text-canvas font-mono text-xs sm:text-sm font-semibold hover:bg-chalk transition-colors disabled:opacity-60"
      >
        {state === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{t.contacts.formSending}</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>{t.contacts.formSend}</span>
          </>
        )}
      </button>
    </form>
  );
};

interface ContactsViewProps {
  onOpenCvPreview?: () => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  onOpenCvPreview,
}) => {
  const { t } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = (key: string, value: string, label: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopiedKey(key);
        setToastMessage(`${t.contacts.toastCopiedPrefix} ${label}`);

        setTimeout(() => {
          setCopiedKey(null);
        }, 2000);

        setTimeout(() => {
          setToastMessage((current) =>
            current?.includes(label) ? null : current,
          );
        }, 3000);
      })
      .catch(() => {});
  };

  const channelCards = [
    {
      id: "email",
      indexTag: t.contacts.channels.email.indexTag,
      title: t.contacts.channels.email.title,
      value: contactsData.email,
      displayValue: contactsData.email,
      status: t.contacts.channels.email.status,
      statusType: "online",
      description: t.contacts.channels.email.description,
      href: `mailto:${contactsData.email}`,
      actionLabel: t.contacts.channels.email.actionLabel,
      icon: <Mail className="w-5 h-5 text-bone" />,
    },
    {
      id: "telegram",
      indexTag: t.contacts.channels.telegram.indexTag,
      title: t.contacts.channels.telegram.title,
      value: contactsData.telegramDisplay,
      displayValue: contactsData.telegramDisplay,
      status: t.contacts.channels.telegram.status,
      statusType: "priority",
      description: t.contacts.channels.telegram.description,
      href: contactsData.telegram,
      actionLabel: t.contacts.channels.telegram.actionLabel,
      isExternal: true,
      icon: <TelegramIcon className="w-5 h-5 text-bone" />,
    },
    {
      id: "linkedin",
      indexTag: t.contacts.channels.linkedin.indexTag,
      title: t.contacts.channels.linkedin.title,
      value: contactsData.linkedin,
      displayValue: contactsData.linkedinDisplay,
      status: t.contacts.channels.linkedin.status,
      statusType: "verified",
      description: t.contacts.channels.linkedin.description,
      href: contactsData.linkedin,
      actionLabel: t.contacts.channels.linkedin.actionLabel,
      isExternal: true,
      rel: "me noopener noreferrer",
      icon: <LinkedinIcon className="w-5 h-5 text-bone" />,
    },
    {
      id: "github",
      indexTag: t.contacts.channels.github.indexTag,
      title: t.contacts.channels.github.title,
      value: contactsData.github,
      displayValue: contactsData.githubDisplay,
      status: t.contacts.channels.github.status,
      statusType: "source",
      description: t.contacts.channels.github.description,
      href: contactsData.github,
      actionLabel: t.contacts.channels.github.actionLabel,
      isExternal: true,
      rel: "me noopener noreferrer",
      icon: <GithubIcon className="w-5 h-5 text-bone" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-14"
    >
      {/* Dossier Header */}
      <section data-assemble="1" className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control border border-signal/25 bg-signal/10 text-[11px] font-mono text-signal">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-signal" />
            <span>{t.contacts.badge}</span>
          </div>

          <span className="text-xs font-mono text-granite">
            {t.contacts.subtitle}
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-chalk mb-4">
            {t.contacts.title}
          </h1>
          <p className="text-base sm:text-lg text-stone leading-relaxed max-w-4xl">
            {t.contacts.statusAvailable}
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="glass-panel p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-granite block">
              {t.contacts.infoRepliesLabel}
            </span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-signal" />
              <span className="text-sm font-semibold text-bone">
                {t.contacts.infoRepliesValue}
              </span>
            </div>
            <span className="text-[11px] font-mono text-granite block">
              {t.contacts.infoRepliesSub}
            </span>
          </div>

          <div className="glass-panel p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-granite block">
              {t.contacts.infoLocationLabel}
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-granite" />
              <span className="text-sm font-semibold text-bone">
                {t.contacts.infoLocationValue}
              </span>
            </div>
            <span className="text-[11px] font-mono text-granite block">
              {t.contacts.infoLocationSub}
            </span>
          </div>

          <div className="glass-panel p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-granite block">
              {t.contacts.infoAvailabilityLabel}
            </span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-signal" />
              <span className="text-sm font-semibold text-bone">
                {t.contacts.infoAvailabilityValue}
              </span>
            </div>
            <span className="text-[11px] font-mono text-granite block">
              {t.contacts.infoAvailabilitySub}
            </span>
          </div>
        </div>
      </section>

      {/* High-Visibility Resume Download Trigger Section */}
      <section
        data-assemble="2"
        className="glass-panel relative overflow-hidden p-6 sm:p-8 space-y-5"
      >
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-signal/45 to-transparent" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-granite font-semibold">
                {t.contacts.cvTitle}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-control bg-signal/10 text-signal border border-signal/25">
                PDF
              </span>
            </div>
            <h2 className="text-2xl font-bold text-chalk tracking-[-0.025em]">
              {t.contacts.cvTitle}
            </h2>
            <p className="text-sm text-stone max-w-2xl leading-relaxed">
              {t.contacts.cvDesc}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-granite pt-1">
              <span>PDF · {contactsData.lastUpdated}</span>
            </div>
          </div>

          {/* Primary High-Visibility Download & Quick-Look Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {onOpenCvPreview && (
              <button
                type="button"
                onClick={onOpenCvPreview}
                data-umami-event="preview-cv"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-control border border-signal/40 bg-signal/10 hover:bg-signal/20 text-signal font-mono text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>{t.contacts.previewCv}</span>
              </button>
            )}

            <a
              href={contactsData.resumeUrl}
              download="Yaroslav_Krupoder_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="download-cv"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-control bg-bone hover:bg-chalk text-canvas font-mono text-sm font-bold tracking-tight transition-all transform active:scale-[0.98]"
            >
              <FileDown className="w-4 h-4" />
              <span>{t.contacts.downloadCv}</span>
            </a>

            <button
              onClick={() =>
                handleCopy(
                  "resume",
                  new URL(
                    contactsData.resumeUrl,
                    window.location.origin,
                  ).toString(),
                  "Resume URL",
                )
              }
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-control border border-stroke bg-canvas/60 text-bone font-mono text-xs hover:border-graphite transition-colors"
              title="Copy Resume Direct Link"
            >
              {copiedKey === "resume" ? (
                <>
                  <Check className="w-4 h-4 text-signal" />
                  <span className="text-signal">
                    {t.contacts.linkCopied}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-granite" />
                  <span>{t.contacts.copyLink}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 15-Minute Direct Scheduling Call */}
      {contactsData.bookingUrl && (
        <section
          data-assemble="3"
          className="glass-panel p-6 sm:p-7 border border-signal/30 bg-signal/5 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-signal">
                  {t.contacts.scheduleTag}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-control bg-signal/20 text-signal border border-signal/30">
                  Google Meet
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.025em] text-bone">
                {t.contacts.scheduleTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone max-w-xl leading-relaxed">
                {t.contacts.scheduleDesc}
              </p>
            </div>
            <a
              href={contactsData.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="book-call"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-control bg-signal hover:bg-[#ff6f24] text-chalk font-mono text-sm font-bold tracking-tight transition-all transform active:scale-[0.98] shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.contacts.scheduleBtn}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </section>
      )}

      {contactsData.formspreeId && (
        <section
          data-assemble="4"
          className="glass-panel p-6 sm:p-7 space-y-5"
        >
          <div>
            <span className="text-xs font-mono text-granite uppercase tracking-widest block mb-1">
              {t.contacts.noEmailApp}
            </span>
            <h2 className="text-2xl font-bold tracking-[-0.025em] text-bone">
              {t.contacts.writeDirectly}
            </h2>
          </div>
          <ContactForm />
        </section>
      )}

      {/* Channel Cards Grid */}
      <section data-assemble="5" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-stroke">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.025em] text-bone">
              {t.contacts.channelsTitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {channelCards.map((channel) => (
            <div
              key={channel.id}
              className="glass-panel glass-panel-interactive p-6 sm:p-7 flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3">
                {/* Header Tag & Status */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-granite font-semibold">
                    {channel.indexTag}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-signal font-medium">
                    <span className="w-1.5 h-1.5 rounded-[2px] bg-signal animate-pulse" />
                    <span>{channel.status}</span>
                  </div>
                </div>

                {/* Title & Icon */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-control bg-stroke/60 border border-stroke">
                    {channel.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-bone">
                      {channel.title}
                    </h3>
                    <span className="text-xs font-mono text-granite">
                      {channel.displayValue}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone leading-relaxed pt-1">
                  {channel.description}
                </p>
              </div>

              {/* Actions: 1-Click Copy and Direct Trigger */}
              <div className="pt-4 border-t border-stroke/80 flex items-center justify-between gap-3">
                <button
                  onClick={() =>
                    handleCopy(channel.id, channel.value, channel.title)
                  }
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-control text-xs font-mono border border-stroke bg-canvas/60 text-stone hover:border-graphite hover:text-bone transition-colors"
                >
                  {copiedKey === channel.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-signal" />
                      <span className="text-signal font-semibold">
                        {t.contacts.copied}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-granite group-hover:text-stone transition-colors" />
                      <span>{t.contacts.copy}</span>
                    </>
                  )}
                </button>

                <a
                  href={channel.href}
                  target={channel.isExternal ? "_blank" : undefined}
                  rel={
                    channel.rel ||
                    (channel.isExternal ? "noopener noreferrer" : undefined)
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-control text-xs font-mono font-semibold bg-stroke text-bone hover:bg-graphite transition-colors"
                >
                  <span>{channel.actionLabel}</span>
                  {channel.isExternal ? (
                    <ExternalLink className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Copied Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-50 pointer-events-none"
          >
            <div className="px-4 py-3 rounded-control border border-stroke bg-bone text-canvas font-mono text-xs flex items-center gap-3">
              <span className="w-2 h-2 rounded-[2px] bg-signal animate-ping" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactsView;
