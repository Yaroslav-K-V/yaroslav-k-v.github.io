import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactsData } from '../data/contacts';
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
  Calendar
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, TelegramIcon } from '../components/Icons';
import { useLanguage } from '../i18n/LanguageContext';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Job offer');
  const [message, setMessage] = useState('');
  const [gotcha, setGotcha] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setState('sending');
    setErrorText(null);
    try {
      const res = await fetch(`https://formspree.io/f/${contactsData.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic,
          message: message.trim(),
          _subject: `[Portfolio] ${topic} — ${name.trim()}`,
          _gotcha: gotcha
        })
      });
      if (res.ok) {
        setState('sent');
        setName('');
        setEmail('');
        setMessage('');
        setGotcha('');
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
        .join(', ');
      if (fields.includes('email')) {
        setErrorText('That email doesn’t look right — double-check it.');
      } else if (res.status === 422) {
        setErrorText(
          fields ? `Check the ${fields} field and try again.` : 'Something in the form looks off — check and try again.'
        );
      } else if (res.status === 403) {
        setErrorText('Sending is blocked right now — try email instead.');
      } else {
        setErrorText('Couldn’t send — try again in a minute.');
      }
      setState('error');
    } catch {
      setState('error');
      setErrorText('No connection — check your internet and try again.');
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-[3px] text-base sm:text-sm bg-[#eeeeee]/5 dark:bg-[#eeeeee]/5 border border-[#3d3a39] text-zinc-900 dark:text-[#eeeeee] placeholder:text-[#8a8380] focus:outline-none focus:border-[#ee6018] transition-colors';

  if (state === 'sent') {
    return (
      <div className="p-6 rounded-[3px] border border-[#ee6018]/30 bg-[#ee6018]/10 text-center space-y-2">
        <Check className="w-6 h-6 mx-auto text-[#ee6018]" />
        <p className="text-sm text-zinc-900 dark:text-[#eeeeee] font-medium">
          {t.contacts.formSentSuccess}
        </p>
        <button
          onClick={() => setState('idle')}
          className="text-xs font-mono text-[#8a8380] hover:text-[#eeeeee] transition-colors"
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
          <option>{t.contacts.formTopicJob}</option>
          <option>{t.contacts.formTopicInternship}</option>
          <option>{t.contacts.formTopicCollab}</option>
          <option>{t.contacts.formTopicQuestion}</option>
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
      {state === 'error' && errorText && (
        <p className="text-xs text-[#ee6018]">
          {errorText}{' '}
          <a href={`mailto:${contactsData.email}`} className="underline">
            {contactsData.email}
          </a>
        </p>
      )}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[3px] bg-[#eeeeee] text-[#101010] font-mono text-xs sm:text-sm font-semibold hover:bg-white transition-colors disabled:opacity-60"
      >
        {state === 'sending' ? (
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

export const ContactsView: React.FC = () => {
  const { t } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = (key: string, value: string, label: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopiedKey(key);
        setToastMessage(`[CLIPBOARD] Copied ${label} to clipboard`);

        setTimeout(() => {
          setCopiedKey(null);
        }, 2000);

        setTimeout(() => {
          setToastMessage((current) => (current?.includes(label) ? null : current));
        }, 3000);
      })
      .catch(() => {});
  };

  const channelCards = [
    {
      id: 'email',
      indexTag: 'Email',
      title: 'Email',
      value: contactsData.email,
      displayValue: contactsData.email,
      status: 'Replies within a day',
      statusType: 'online',
      description: 'Best way to reach me — jobs, internships, or questions about my work.',
      href: `mailto:${contactsData.email}`,
      actionLabel: 'Write',
      icon: <Mail className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
    },
    {
      id: 'telegram',
      indexTag: 'Messenger',
      title: 'Telegram',
      value: contactsData.telegramDisplay,
      displayValue: contactsData.telegramDisplay,
      status: 'Replies fast',
      statusType: 'priority',
      description: 'Fastest reply — usually within a few hours.',
      href: contactsData.telegram,
      actionLabel: 'Open',
      isExternal: true,
      icon: <TelegramIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
    },
    {
      id: 'linkedin',
      indexTag: 'Network',
      title: 'LinkedIn',
      value: contactsData.linkedin,
      displayValue: contactsData.linkedinDisplay,
      status: 'Profile',
      statusType: 'verified',
      description: 'Work history, education, and background.',
      href: contactsData.linkedin,
      actionLabel: 'Open',
      isExternal: true,
      rel: 'me noopener noreferrer',
      icon: <LinkedinIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
    },
    {
      id: 'github',
      indexTag: 'Code',
      title: 'GitHub',
      value: contactsData.github,
      displayValue: contactsData.githubDisplay,
      status: 'Open source',
      statusType: 'source',
      description: 'My code — projects, commits, and open source.',
      href: contactsData.github,
      actionLabel: 'Open',
      isExternal: true,
      rel: 'me noopener noreferrer',
      icon: <GithubIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
    }
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[#ee6018]/20 bg-[#ee6018]/10 text-[11px] font-mono text-[#ee6018] dark:text-[#ee6018]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-[3px] bg-[#ee6018] opacity-75" />
              <span className="relative inline-flex rounded-[3px] h-2 w-2 bg-[#ee6018]" />
            </span>
            <span>{t.contacts.badge}</span>
          </div>

          <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380]">
            {t.contacts.subtitle}
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-[#eeeeee] mb-4">
            {t.contacts.title}
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-4xl">
            {t.contacts.statusAvailable}
          </p>
        </div>

        {/*  */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="glass-panel p-4 rounded-[10px] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380] block">
              Replies
            </span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ee6018] dark:text-[#ee6018]" />
              <span className="text-sm font-semibold text-zinc-900 dark:text-[#eeeeee]">
                Within a day
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#8a8380] block">
              I check mail daily
            </span>
          </div>

          <div className="glass-panel p-4 rounded-[10px] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380] block">
              Primary Location &amp; Time
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-600 dark:text-[#8a8380]" />
              <span className="text-sm font-semibold text-zinc-900 dark:text-[#eeeeee]">
                Varna, Bulgaria · UTC+2
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#8a8380] block">
              Open to remote
            </span>
          </div>

          <div className="glass-panel p-4 rounded-[10px] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380] block">
              Current Availability
            </span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ee6018] dark:text-[#ee6018]" />
              <span className="text-sm font-semibold text-zinc-900 dark:text-[#eeeeee]">
                Open to Junior roles
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#8a8380] block">
              Full-time / Part-time / Remote
            </span>
          </div>
        </div>
      </section>

      {/* High-Visibility Resume Download Trigger Section */}
      <section data-assemble="2" className="glass-panel p-6 sm:p-8 rounded-[10px] border-2 border-zinc-900/10 dark:border-zinc-100/10 bg-gradient-to-br from-zinc-50/80 via-white to-zinc-100/50 dark:from-zinc-900/80 dark:via-zinc-950 dark:to-zinc-900/50 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380] font-semibold">
                {t.contacts.cvTitle}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#ee6018]/10 text-[#ee6018] dark:text-[#ee6018] border border-[#ee6018]/20">
                PDF
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-[#eeeeee] tracking-tight">
              {t.contacts.cvTitle}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-[#8a8380] max-w-2xl leading-relaxed">
              {t.contacts.cvDesc}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#8a8380] pt-1">
              <span>PDF · {contactsData.lastUpdated}</span>
            </div>
          </div>

          {/* Primary High-Visibility Download Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={contactsData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[10px] bg-[#1d1a18] hover:bg-[#3d3a39] text-white dark:bg-zinc-100 dark:hover:bg-[#eeeeee] dark:text-zinc-950 font-mono text-sm font-bold tracking-tight shadow-none hover:shadow-none transition-all transform active:scale-[0.98]"
            >
              <FileDown className="w-4 h-4" />
              <span>{t.contacts.downloadCv}</span>
            </a>

            <button
              onClick={() =>
                handleCopy(
                  'resume',
                  new URL(contactsData.resumeUrl, window.location.origin).toString(),
                  'Resume URL'
                )
              }
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-[10px] border border-zinc-300 dark:border-[#3d3a39] bg-[#eeeeee]/60 dark:bg-[#1d1a18]/60 text-zinc-800 dark:text-[#eeeeee] font-mono text-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              title="Copy Resume Direct Link"
            >
              {copiedKey === 'resume' ? (
                <>
                  <Check className="w-4 h-4 text-[#ee6018] dark:text-[#ee6018]" />
                  <span className="text-[#ee6018] dark:text-[#ee6018]">{t.contacts.linkCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#8a8380]" />
                  <span>{t.contacts.copyLink}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 15-Minute Direct Scheduling Call */}
      {contactsData.bookingUrl && (
        <section data-assemble="3" className="glass-panel p-6 sm:p-7 rounded-[10px] border border-[#ee6018]/30 bg-[#ee6018]/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#ee6018]">
                  {t.contacts.scheduleTag}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] bg-[#ee6018]/20 text-[#ee6018] border border-[#ee6018]/30">
                  Google Meet
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-[#eeeeee]">
                {t.contacts.scheduleTitle}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#8a8380] max-w-xl leading-relaxed">
                {t.contacts.scheduleDesc}
              </p>
            </div>
            <a
              href={contactsData.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-[#ee6018] hover:bg-[#ff6f24] text-white font-mono text-sm font-bold tracking-tight shadow-none transition-all transform active:scale-[0.98] shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.contacts.scheduleBtn}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </section>
      )}

      {contactsData.formspreeId && (
        <section data-assemble="4" className="glass-panel p-6 sm:p-7 rounded-[10px] border border-[#3d3a39] dark:border-[#3d3a39]/80 space-y-5">
          <div>
            <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380] uppercase tracking-widest block mb-1">
              {t.contacts.noEmailApp}
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-[#eeeeee]">
              {t.contacts.writeDirectly}
            </h2>
          </div>
          <ContactForm />
        </section>
      )}

      {/* Channel Cards Grid */}
      <section data-assemble="5" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#3d3a39] dark:border-[#3d3a39]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-[#eeeeee]">
              {t.contacts.channelsTitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {channelCards.map((channel) => (
            <div
              key={channel.id}
              className="glass-panel p-6 sm:p-7 rounded-[10px] flex flex-col justify-between space-y-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group"
            >
              <div className="space-y-3">
                {/* Header Tag & Status */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8a8380] dark:text-[#8a8380] font-semibold">
                    {channel.indexTag}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#ee6018] dark:text-[#ee6018] font-medium">
                    <span className="w-1.5 h-1.5 rounded-[3px] bg-[#ee6018] animate-pulse" />
                    <span>{channel.status}</span>
                  </div>
                </div>

                {/* Title & Icon */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-[10px] bg-zinc-100 dark:bg-[#3d3a39]/80 border border-[#3d3a39] dark:border-[#3d3a39]">
                    {channel.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-[#eeeeee]">
                      {channel.title}
                    </h3>
                    <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380]">
                      {channel.displayValue}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#8a8380] leading-relaxed pt-1">
                  {channel.description}
                </p>
              </div>

              {/* Actions: 1-Click Copy and Direct Trigger */}
              <div className="pt-4 border-t border-zinc-100 dark:border-[#3d3a39]/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleCopy(channel.id, channel.value, channel.title)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] text-xs font-mono border border-[#3d3a39] dark:border-[#3d3a39] bg-[#eeeeee]/50 dark:bg-[#1d1a18]/40 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-[#3d3a39] transition-colors"
                >
                  {copiedKey === channel.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#ee6018] dark:text-[#ee6018]" />
                      <span className="text-[#ee6018] dark:text-[#ee6018] font-semibold">
                        {t.contacts.copied}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8a8380] group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                      <span>{t.contacts.copy}</span>
                    </>
                  )}
                </button>

                <a
                  href={channel.href}
                  target={channel.isExternal ? '_blank' : undefined}
                  rel={channel.rel || (channel.isExternal ? 'noopener noreferrer' : undefined)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-xs font-mono font-semibold bg-zinc-100 dark:bg-[#3d3a39] text-zinc-900 dark:text-[#eeeeee] hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
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
            <div className="glass-panel px-4 py-3 rounded-[10px] shadow-none border border-zinc-300 dark:border-[#3d3a39] bg-[#1d1a18]/90 text-white dark:bg-zinc-100/95 dark:text-zinc-950 font-mono text-xs flex items-center gap-3">
              <span className="w-2 h-2 rounded-[3px] bg-[#ee6018] animate-ping" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactsView;
