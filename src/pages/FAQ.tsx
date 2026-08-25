import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, HelpCircle } from "lucide-react";
import { getFaq } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function FAQ() {
  const faq = getFaq();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const handleBack = () => {
    setSelectedIndex(null);
  };

  return (
    <div className="pt-24 min-h-screen">
      <AnimatePresence mode="wait">
        {selectedIndex === null ? (
          <motion.section
            key="centered"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[calc(100vh-6rem)] flex items-center justify-center"
          >
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                  FAQ
                </span>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">
                  Frequently Asked Questions
                </h1>
                <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
                  Select a question to learn more about CaseVerse 2026.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
                {faq.map((item, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    onClick={() => handleSelect(index)}
                    className="group flex items-center gap-3 p-4 rounded-xl bg-surface border border-border text-left hover:border-primary/30 hover:bg-surface-light transition-all duration-200"
                  >
                    <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-heading text-sm font-medium text-text group-hover:text-primary transition-colors line-clamp-2 flex-1">
                      {item.question}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary shrink-0 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="split"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[calc(100vh-6rem)] flex"
          >
            {/* Left Panel — Questions List */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-80 lg:w-96 shrink-0 border-r border-border bg-surface/50 overflow-y-auto hidden md:flex flex-col"
            >
              <div className="p-6 border-b border-border">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Questions
                </button>
                <h2 className="font-heading text-lg font-bold text-text">FAQ</h2>
                <p className="text-xs text-muted mt-1">{faq.length} questions</p>
              </div>

              <div className="flex-1 overflow-y-auto">
                {faq.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full text-left px-6 py-4 border-b border-border/50 transition-all duration-200",
                      index === selectedIndex
                        ? "bg-primary/10 border-l-2 border-l-primary"
                        : "hover:bg-surface-light border-l-2 border-l-transparent"
                    )}
                  >
                    <span
                      className={cn(
                        "font-heading text-sm font-medium leading-snug line-clamp-2",
                        index === selectedIndex ? "text-primary" : "text-text"
                      )}
                    >
                      {item.question}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right Panel — Selected Answer */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-full flex flex-col"
                >
                  {/* Mobile back button */}
                  <div className="md:hidden p-4 border-b border-border">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      All Questions
                    </button>
                  </div>

                  <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
                    <div className="max-w-2xl w-full">
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4"
                      >
                        Question {selectedIndex! + 1} of {faq.length}
                      </motion.span>

                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-text leading-tight"
                      >
                        {faq[selectedIndex!].question}
                      </motion.h2>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="mt-8 h-px bg-border"
                      />

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 text-lg text-muted leading-relaxed"
                      >
                        {faq[selectedIndex!].answer}
                      </motion.p>

                      {/* Navigation */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 flex items-center gap-4"
                      >
                        <button
                          onClick={() =>
                            setSelectedIndex(
                              selectedIndex! > 0 ? selectedIndex! - 1 : faq.length - 1
                            )
                          }
                          className="px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-muted hover:text-text hover:border-primary/30 transition-colors"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() =>
                            setSelectedIndex(
                              selectedIndex! < faq.length - 1 ? selectedIndex! + 1 : 0
                            )
                          }
                          className="px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-bg hover:bg-primary-hover transition-colors"
                        >
                          Next
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
