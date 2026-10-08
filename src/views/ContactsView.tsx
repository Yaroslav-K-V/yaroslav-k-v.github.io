import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactsData } from '../data/contacts';
import {
  Mail,
  Phone,
  MapPin,
  FileDown,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Clock,
  ArrowDown
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, TelegramIcon } from '../components/Icons';

export const ContactsView: React.FC = () => {
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
      indexTag: '[CHANNEL // 01]',
      title: 'Direct Electronic Mail',
      value: contactsData.email,
      displayValue: contactsData.email,
      status: 'ONLINE // DIRECT INBOX',
      statusType: 'online',
      description: 'Primary channel for formal engineering inquiries, internship offers, and architecture discussions.',
      href: `mailto:${contactsData.email}`,
      actionLabel: 'Send Email',
      icon: <Mail className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
    },
    {
      id: 'telegram',
      indexTag: '[CHANNEL // 02]',
      title: 'Telegram Messenger',
      value: contactsData.telegramDisplay,
      displayValue: contactsData.telegramDisplay,
      status: 'FAST RESPONSE // DIRECT CHAT',
      statusType: 'priority',
      description: 'Encrypted direct messaging for rapid technical syncs, async updates, and technical conversation.',
      href: contactsData.telegram,
      actionLabel: 'Open Telegram',
      isExternal: true,
      icon: <TelegramIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
    },
    {
      id: 'linkedin',
      indexTag: '[CHANNEL // 03]',
      title: 'LinkedIn Network',
      value: contactsData.linkedin,
      displayValue: contactsData.linkedinDisplay,
      status: 'VERIFIED IDENTITY // PROFILE',
      statusType: 'verified',
      description: 'Professional career timeline, Erasmus+ traineeship credentials, and academic trajectory.',
      href: contactsData.linkedin,
      actionLabel: 'View LinkedIn',
      isExternal: true,
      icon: <LinkedinIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
    },
    {
      id: 'github',
      indexTag: '[CHANNEL // 04]',
      title: 'GitHub Repositories',
      value: contactsData.github,
      displayValue: contactsData.githubDisplay,
      status: 'SOURCE REPOSITORIES // COMMITS',
      statusType: 'source',
      description: 'Public production repositories, architectural schemas, unit test suites, and commit provenance.',
      href: contactsData.github,
      actionLabel: 'Open GitHub',
      isExternal: true,
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
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>CHANNELS ACTIVE // FAST RESPONSE</span>
          </div>

          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500">
            [HUB // 04] · DIRECT INQUIRIES &amp; CV
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
            Direct Communication &amp; Inquiries
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-4xl">
            Open to software engineering internship opportunities, technical collaborations, and systems discussions. Direct inbox and messaging channels are monitored daily with an expected response within 24 hours.
          </p>
        </div>

        {/* Operational SLA telemetry indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Response Latency
            </span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                &lt; 24 Hours SLA
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 block">
              Direct inbox monitoring
            </span>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Primary Location &amp; Time
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Bulgaria · UTC+2 (EET)
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 block">
              Open to EU / Remote relocation
            </span>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Current Availability
            </span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Internships 2026–2027
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 block">
              Full-time / Part-time / Remote
            </span>
          </div>
        </div>
      </section>

      {/* High-Visibility Resume Download Trigger Section */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border-2 border-zinc-900/10 dark:border-zinc-100/10 bg-gradient-to-br from-zinc-50/80 via-white to-zinc-100/50 dark:from-zinc-900/80 dark:via-zinc-950 dark:to-zinc-900/50 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                [DOSSIER // RESUME SPECIFICATION]
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                VERIFIED PDF
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Curriculum Vitae &amp; Engineering Dossier
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Complete documentation covering academic foundations, Erasmus+ traineeship at Grenergy LLC, technical stack matrices, project repositories, and contact coordinates.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 pt-1">
              <span>FORMAT: PDF</span>
              <span>·</span>
              <span>REVISION: {contactsData.lastUpdated}</span>
              <span>·</span>
              <span>STATUS: READY FOR REVIEW</span>
            </div>
          </div>

          {/* Primary High-Visibility Download Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={contactsData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-mono text-sm font-bold tracking-tight shadow-lg hover:shadow-xl transition-all transform active:scale-[0.98]"
            >
              <FileDown className="w-4 h-4" />
              <span>Download CV [PDF] ↓</span>
            </a>

            <button
              onClick={() => handleCopy('resume', contactsData.resumeUrl, 'Resume URL')}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200 font-mono text-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              title="Copy Resume Direct Link"
            >
              {copiedKey === 'resume' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-500" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Channel Cards Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mb-1">
              [TELEMETRY // VERIFIED CHANNELS]
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Direct Contact Channels
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            1-CLICK CLIPBOARD COPY ENABLED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {channelCards.map((channel) => (
            <div
              key={channel.id}
              className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group"
            >
              <div className="space-y-3">
                {/* Header Tag & Status */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 dark:text-zinc-400 font-semibold">
                    {channel.indexTag}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{channel.status}</span>
                  </div>
                </div>

                {/* Title & Icon */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
                    {channel.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {channel.title}
                    </h3>
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      {channel.displayValue}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
                  {channel.description}
                </p>
              </div>

              {/* Actions: 1-Click Copy and Direct Trigger */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleCopy(channel.id, channel.value, channel.title)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {copiedKey === channel.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        Copied to Clipboard!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                      <span>Copy Handle / ID</span>
                    </>
                  )}
                </button>

                <a
                  href={channel.href}
                  target={channel.isExternal ? '_blank' : undefined}
                  rel={channel.isExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
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

      {/* Direct Telephony & Secondary Channels */}
      <section className="glass-panel p-6 sm:p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Direct Telephony &amp; Voice Lines
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            DIRECT CELLULAR / TELEPHONY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Bulgaria Number */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                Primary Line (Bulgaria)
              </span>
              <a
                href={`tel:${contactsData.phoneBg}`}
                className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 hover:underline"
              >
                {contactsData.phoneBg}
              </a>
            </div>
            <button
              onClick={() => handleCopy('phoneBg', contactsData.phoneBg, 'Bulgaria Phone')}
              className="p-2 rounded-lg text-xs font-mono border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-zinc-600 dark:text-zinc-400"
              title="Copy Phone"
              aria-label="Copy phone number"
            >
              {copiedKey === 'phoneBg' ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Ukraine Number */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                Secondary Line (Ukraine)
              </span>
              <a
                href={`tel:${contactsData.phoneUa}`}
                className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 hover:underline"
              >
                {contactsData.phoneUa}
              </a>
            </div>
            <button
              onClick={() => handleCopy('phoneUa', contactsData.phoneUa, 'Ukraine Phone')}
              className="p-2 rounded-lg text-xs font-mono border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-zinc-600 dark:text-zinc-400"
              title="Copy Phone"
              aria-label="Copy phone number"
            >
              {copiedKey === 'phoneUa' ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
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
            className="fixed bottom-6 right-6 z-50 pointer-events-none"
          >
            <div className="glass-panel px-4 py-3 rounded-xl shadow-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-900/90 text-white dark:bg-zinc-100/95 dark:text-zinc-950 font-mono text-xs flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
