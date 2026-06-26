
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactForm from '@/components/ContactForm.jsx';
import BreadcrumbNav from '@/components/BreadcrumbNav.jsx';
import { MapPin, Phone, Mail, Clock, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function ContactPage() {
  const faqs = [
    { q: "How can I partner with an IGO brand?", a: "Select 'Business Development' or 'General Inquiry' in the contact form, and detail your partnership proposal. Our strategy team will reach out within 48 hours." },
    { q: "Where are your main farming operations located?", a: "While headquartered in Chennai, our operational farmlands span across multiple states in India, optimized for specific crops and climate zones." },
    { q: "Do you offer franchise opportunities?", a: "Yes, through our IGO Franchise (FICO) brand. Please direct inquiries to the Agri Operations department." },
    { q: "Who should I contact for media inquiries?", a: "Please select 'Media & PR' in the contact form. Our Corporate Communications team handles all press relations." }
  ];

  return (
    <>
      <Helmet>
        <title>Contact & Support - IGO Group</title>
        <meta name="description" content="Get in touch with IGO Group headquarters, departments, and support teams." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <section className="pt-12 pb-16 bg-muted/20 border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <BreadcrumbNav />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <h1 className="heading-hero mb-6">Connect With Us</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Whether you seek enterprise partnerships, investment details, or career opportunities, our global team is ready to assist.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Form Side */}
                <motion.div 
                  className="lg:col-span-7"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="heading-section mb-8">Send an Inquiry</h2>
                  <ContactForm />
                </motion.div>

                {/* Info Side */}
                <motion.div 
                  className="lg:col-span-5 space-y-12"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div>
                    <h3 className="font-serif text-2xl font-bold mb-6">Headquarters</h3>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="bg-primary/10 p-3 rounded-xl shrink-0 h-fit">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">IGO Corporate Office</p>
                          <p className="text-muted-foreground mt-1 text-sm">Chennai, Tamil Nadu<br/>India 600001</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-primary/10 p-3 rounded-xl shrink-0 h-fit">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Global Contact</p>
                          <p className="text-muted-foreground mt-1 text-sm">+91 (044) 1234-5678</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-primary/10 p-3 rounded-xl shrink-0 h-fit">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Business Hours</p>
                          <p className="text-muted-foreground mt-1 text-sm">Monday - Friday<br/>9:00 AM - 6:00 PM IST</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-muted rounded-3xl border">
                    <div className="flex items-center gap-3 mb-6">
                      <HelpCircle className="w-6 h-6 text-primary" />
                      <h3 className="font-serif text-xl font-bold">Frequently Asked</h3>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                          <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ContactPage;
