import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { contactsData } from '../data/contacts';
import { Mail, Phone, MapPin, FileText, Copy, Check, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export const ContactsView: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">
          Get in Touch
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Feel free to reach out for software engineering internships, technical collaborations, or questions.
        </p>
      </div>

      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-700/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 text-xs sm:text-sm font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{contactsData.status}</span>
      </div>

      {/* Direct Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <a
          href={`mailto:${contactsData.email}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 dark:bg-emerald-500 text-white dark:text-gray-950 font-medium text-sm hover:bg-emerald-800 dark:hover:bg-emerald-400 transition-colors shadow-sm"
        >
          <Mail className="w-4 h-4" />
          <span>Send Email</span>
        </a>

        <a
          href={contactsData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <LinkedinIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>LinkedIn</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>

        <a
          href={contactsData.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>View Resume</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>
      </div>

      {/* Contact Details List */}
      <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-[#111c30]/50 space-y-4">
        {/* Name & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-0.5">
              Full Name
            </span>
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-base">
              {contactsData.name}
            </span>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-0.5">
              Location
            </span>
            <div className="flex items-center gap-1.5 text-gray-900 dark:text-gray-100 text-base">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{contactsData.location}</span>
            </div>
          </div>
        </div>

        {/* Detailed Links */}
        <ul className="space-y-3.5 text-sm">
          {/* Email */}
          <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-600 dark:text-gray-400">Email:</span>
              <a
                href={`mailto:${contactsData.email}`}
                className="text-emerald-700 dark:text-emerald-400 hover:underline font-mono"
              >
                {contactsData.email}
              </a>
            </div>
            <button
              onClick={() => handleCopy('email', contactsData.email)}
              className="self-start sm:self-auto inline-flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 py-0.5 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {copiedKey === 'email' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </li>

          {/* Phone (BG) */}
          <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-600 dark:text-gray-400">Phone (BG):</span>
              <a
                href={`tel:${contactsData.phoneBg}`}
                className="text-emerald-700 dark:text-emerald-400 hover:underline font-mono"
              >
                {contactsData.phoneBg}
              </a>
            </div>
            <button
              onClick={() => handleCopy('phoneBg', contactsData.phoneBg)}
              className="self-start sm:self-auto inline-flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 py-0.5 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {copiedKey === 'phoneBg' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </li>

          {/* Phone (UA) */}
          <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-600 dark:text-gray-400">Phone (UA):</span>
              <a
                href={`tel:${contactsData.phoneUa}`}
                className="text-emerald-700 dark:text-emerald-400 hover:underline font-mono"
              >
                {contactsData.phoneUa}
              </a>
            </div>
            <button
              onClick={() => handleCopy('phoneUa', contactsData.phoneUa)}
              className="self-start sm:self-auto inline-flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 py-0.5 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {copiedKey === 'phoneUa' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </li>

          {/* LinkedIn */}
          <li className="flex items-center gap-2.5 py-1">
            <LinkedinIcon className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-600 dark:text-gray-400">LinkedIn:</span>
            <a
              href={contactsData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <span>{contactsData.linkedinDisplay}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </li>

          {/* GitHub */}
          <li className="flex items-center gap-2.5 py-1">
            <GithubIcon className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-600 dark:text-gray-400">GitHub:</span>
            <a
              href={contactsData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <span>{contactsData.githubDisplay}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </li>

          {/* Resume */}
          <li className="flex items-center gap-2.5 py-1">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-600 dark:text-gray-400">Resume:</span>
            <a
              href={contactsData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View Resume (PDF)</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};
