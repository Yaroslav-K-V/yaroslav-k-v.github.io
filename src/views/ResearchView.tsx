import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { researchDocs, upcomingTopics, ResearchDoc } from '../data/research';
import {
  Search,
  Clock,
  Calendar,
  FileText,
  ChevronDown,
  ChevronUp,
  Check,
  Copy,
  Activity,
  CheckCircle2
} from 'lucide-react';

type FilterCategory = 'all' | 'ai-agents' | 'systems' | 'architecture' | 'rfc';

export const ResearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [expandedDocId, setExpandedDocId] = useState<string | null>('doc-01-multi-llm-orchestration');
  const [copiedCitationId, setCopiedCitationId] = useState<string | null>(null);

  const categories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All Documents' },
    { id: 'ai-agents', label: 'AI & Inference' },
    { id: 'systems', label: 'Systems & Hardware' },
    { id: 'architecture', label: 'Architecture & RFCs' }
  ];

  const filteredDocs = useMemo(() => {
    return researchDocs.filter((doc) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        doc.category === selectedCategory ||
        (selectedCategory === 'architecture' && (doc.category === 'architecture' || doc.category === 'rfc'));

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery =
        doc.title.toLowerCase().includes(query) ||
        doc.subtitle.toLowerCase().includes(query) ||
        doc.abstract.toLowerCase().includes(query) ||
        doc.docIndex.includes(query) ||
        doc.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (docId: string) => {
    setExpandedDocId((prev) => (prev === docId ? null : docId));
  };

  const handleCopyCitation = (e: React.MouseEvent, doc: ResearchDoc) => {
    e.stopPropagation();
    const citation = `Krupoder, Y. (${doc.date}). [DOC // ${doc.docIndex}] ${doc.title}. Site_YK Technical Archive, ${doc.revision}.`;
    navigator.clipboard
      .writeText(citation)
      .then(() => {
        setCopiedCitationId(doc.id);
        setTimeout(() => {
          setCopiedCitationId(null);
        }, 2000);
      })
      .catch(() => {});
  };

  const getDocStatusBadge = (status: ResearchDoc['status']) => {
    switch (status) {
      case 'PRODUCTION DEPLOYED':
        return {
          dotClass: 'bg-emerald-500',
          textClass: 'text-emerald-600 dark:text-emerald-400',
          borderClass: 'border-emerald-500/30 bg-emerald-500/10'
        };
      case 'BENCHMARK VERIFIED':
        return {
          dotClass: 'bg-zinc-400 dark:bg-zinc-300',
          textClass: 'text-zinc-700 dark:text-zinc-300',
          borderClass: 'border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'
        };
      case 'ACTIVE RFC':
        return {
          dotClass: 'bg-amber-500',
          textClass: 'text-amber-600 dark:text-amber-400',
          borderClass: 'border-amber-500/30 bg-amber-500/10'
        };
      default:
        return {
          dotClass: 'bg-zinc-400',
          textClass: 'text-zinc-600 dark:text-zinc-400',
          borderClass: 'border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-14"
    >
      {/* Header & Mission Statement */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/60 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ARCHIVE // VERIFIED TECHNICAL PAPERS</span>
          </div>

          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500">
            [DOC // REPO] · OPEN SPECIFICATIONS
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
            Research, Technical Briefs &amp; RFCs
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-4xl">
            Architecture specifications, formal design proposals (RFCs), performance telemetry reports, and post-mortems on distributed systems, AI agent runtimes, and low-latency IO. Written with engineering rigor, reproducible telemetry, and concrete implementation blueprints.
          </p>
        </div>

        {/* Search & Topic Taxonomy Controls */}
        <div className="pt-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 order-2 md:order-1">
            {categories.map((cat) => {
              const count =
                cat.id === 'all'
                  ? researchDocs.length
                  : researchDocs.filter(
                      (d) =>
                        d.category === cat.id ||
                        (cat.id === 'architecture' && (d.category === 'architecture' || d.category === 'rfc'))
                    ).length;

              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    isSelected
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold shadow-sm'
                      : 'border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-zinc-800 dark:bg-zinc-300 text-zinc-300 dark:text-zinc-900'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 order-1 md:order-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search briefs, tags, RFCs..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs font-mono bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Document Dossier List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500">
          <span>SPECIFICATION DOSSIERS ({filteredDocs.length})</span>
          <span>FORMAT // VERIFIABLE WHITE PAPERS</span>
        </div>

        {filteredDocs.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl text-center space-y-3">
            <FileText className="w-8 h-8 mx-auto text-zinc-400" />
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              No technical briefs found
            </h3>
            <p className="text-xs font-mono text-zinc-500 max-w-sm mx-auto">
              No documents matched query &quot;{searchQuery}&quot;. Try resetting filters or search keywords.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 text-xs font-mono px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredDocs.map((doc) => {
              const isExpanded = expandedDocId === doc.id;
              const statusBadge = getDocStatusBadge(doc.status);

              return (
                <article
                  key={doc.id}
                  className="glass-panel rounded-2xl border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all overflow-hidden"
                >
                  {/* Card Header & Summary Bar */}
                  <div
                    onClick={() => toggleExpand(doc.id)}
                    className="p-6 sm:p-7 cursor-pointer space-y-4 select-none"
                  >
                    {/* Telemetry Index & Meta Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                          [DOC // {doc.docIndex}]
                        </span>
                        <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 text-[11px]">
                          {doc.type}
                        </span>
                        <div
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] ${statusBadge.borderClass} ${statusBadge.textClass}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dotClass}`} />
                          <span>{doc.status}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 text-xs">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{doc.date}</span>
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{doc.readTime}</span>
                        </span>
                        <span>·</span>
                        <span>{doc.revision}</span>
                      </div>
                    </div>

                    {/* Titles */}
                    <div className="space-y-1.5">
                      <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:text-emerald-600 transition-colors">
                        {doc.title}
                      </h2>
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {doc.subtitle}
                      </p>
                    </div>

                    {/* Executive Abstract */}
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {doc.abstract}
                    </p>

                    {/* Key Architectural Takeaways */}
                    <div className="pt-2 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block font-semibold">
                        Key Architectural Findings
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                        {doc.takeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-1 shrink-0" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Taxonomy Tags & Quick Controls */}
                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleCopyCitation(e, doc)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                          title="Copy Document Citation"
                        >
                          {copiedCitationId === doc.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              <span className="text-emerald-600 dark:text-emerald-400">Cited!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Cite</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(doc.id);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                          <span>{isExpanded ? 'Collapse Spec' : 'Inspect Full Brief'}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded In-Depth Reader */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-6 sm:p-8 space-y-8"
                      >
                        {/* Section 1: Problem Formulation */}
                        <div className="space-y-2">
                          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block font-semibold">
                            [01 // PROBLEM FORMULATION]
                          </span>
                          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {doc.fullBrief.problemStatement}
                          </p>
                        </div>

                        {/* Section 2: Architecture Blueprint */}
                        <div className="space-y-3">
                          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block font-semibold">
                            [02 // ARCHITECTURE BLUEPRINT &amp; DESIGN DECISIONS]
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {doc.fullBrief.architectureBlueprint.map((step, idx) => (
                              <div
                                key={idx}
                                className="glass-panel p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1"
                              >
                                <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 block">
                                  TIER {idx + 1}
                                </span>
                                <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                                  {step}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section 3: Telemetry Benchmarks Table */}
                        {doc.fullBrief.telemetryData && (
                          <div className="space-y-3">
                            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block font-semibold">
                              [03 // EMPIRICAL TELEMETRY BENCHMARKS]
                            </span>
                            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                              <table className="w-full text-left text-xs font-mono">
                                <thead className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 uppercase tracking-wider text-[10px]">
                                  <tr>
                                    <th className="p-3">Telemetry Metric</th>
                                    <th className="p-3">Baseline / Unoptimized</th>
                                    <th className="p-3">Engineered System</th>
                                    <th className="p-3">Variance / Delta</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                  {doc.fullBrief.telemetryData.map((row, idx) => (
                                    <tr
                                      key={idx}
                                      className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors"
                                    >
                                      <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">
                                        {row.metric}
                                      </td>
                                      <td className="p-3 text-zinc-500 dark:text-zinc-400">
                                        {row.baseline}
                                      </td>
                                      <td className="p-3 text-zinc-900 dark:text-zinc-100 font-bold">
                                        {row.optimized}
                                      </td>
                                      <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">
                                        {row.delta}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Section 4: Implementation Snippet */}
                        {doc.fullBrief.implementationSnippet && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                              <span className="font-semibold uppercase tracking-wider">
                                [04 // SPEC IMPLEMENTATION BLUEPRINT] · {doc.fullBrief.implementationSnippet.title}
                              </span>
                              <span className="uppercase">
                                {doc.fullBrief.implementationSnippet.language}
                              </span>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 p-4 font-mono text-xs overflow-x-auto leading-relaxed">
                              <pre>
                                <code>{doc.fullBrief.implementationSnippet.code}</code>
                              </pre>
                            </div>
                          </div>
                        )}

                        {/* Section 5: Conclusion & Production Learnings */}
                        <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block font-semibold">
                            [05 // PRODUCTION LEARNINGS &amp; VERIFICATION]
                          </span>
                          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                            &quot;{doc.fullBrief.conclusion}&quot;
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Upcoming Research Radar Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mb-1">
              [RADAR // FUTURE RFCs]
            </span>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Active Research Radar
              </h2>
            </div>
          </div>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500">
            IN-FLIGHT SPECIFICATIONS &amp; EXPERIMENTS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingTopics.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl space-y-4 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500 dark:text-zinc-400">{item.tag}</span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-700 dark:text-zinc-300">
                  {item.targetDate}
                </span>
              </div>

              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.notes}
              </p>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>STATUS: {item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
