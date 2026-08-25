import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { getSite } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Contact() {
  const site = getSite();

  return (
    <div className="pt-24">
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Contact</motion.span>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">
              Get in Touch
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-muted leading-relaxed max-w-3xl">
              Have questions about CaseVerse 2026? Reach out to us through any of the following channels.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="space-y-6">
              <motion.div variants={fadeUp} className="p-6 rounded-xl bg-surface border border-border">
                <MapPin className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-heading text-sm font-semibold text-text">Address</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {site.venue.name}<br />
                  {site.venue.address}, {site.venue.country}
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="p-6 rounded-xl bg-surface border border-border">
                <Phone className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-heading text-sm font-semibold text-text">Phone</h3>
                <a href={`tel:${site.contact.phone}`} className="mt-2 text-sm text-muted hover:text-text transition-colors block">
                  {site.contact.phone}
                </a>
              </motion.div>
              <motion.div variants={fadeUp} className="p-6 rounded-xl bg-surface border border-border">
                <Mail className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-heading text-sm font-semibold text-text">Email</h3>
                <a href={`mailto:${site.contact.email}`} className="mt-2 text-sm text-muted hover:text-text transition-colors block">
                  {site.contact.email}
                </a>
              </motion.div>
              <motion.div variants={fadeUp} className="p-6 rounded-xl bg-surface border border-border">
                <Globe className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-heading text-sm font-semibold text-text">Website</h3>
                <a href={`https://${site.contact.website}`} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm text-muted hover:text-text transition-colors block">
                  {site.contact.website}
                </a>
              </motion.div>
            </motion.div>

            {/* Google Map */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl bg-surface border border-border overflow-hidden min-h-[400px]">
              <iframe
                title="Jatiya Kabi Kazi Nazrul Islam University"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58726.39488896985!2d90.3726178!3d24.5819974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3756417d5fe9a2a3%3A0xc4807b9570837651!2sJatiya%20Kabi%20Kazi%20Nazrul%20Islam%20University!5e0!3m2!1sen!2sbd!4v1724300000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
