import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, CheckCircle2, Loader2, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

function ContactInfo() {
  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6 text-[#4fc3f7]" />,
      title: "Email",
      value: "hello@zentra.ai",
      link: "mailto:hello@zentra.ai",
    },
    {
      icon: <MapPin className="h-6 w-6 text-[#4fc3f7]" />,
      title: "Office",
      value: "101 Tech Plaza, Silicon Valley, CA",
      link: "#",
    },
    {
      icon: <Phone className="h-6 w-6 text-[#4fc3f7]" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
  ];

  return (
    <div className="bg-[#161a2b]/40 backdrop-blur-sm border border-[#8a7fff]/20 rounded-xl p-6 h-full">
      <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
      <p className="text-[#e0e6ff]/70 mb-8">
        Have questions or need more information? Reach out to us through any of
        these channels and we'll get back to you as soon as possible.
      </p>

      <div className="space-y-6">
        {contactMethods.map((method, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="rounded-full bg-[#161a2b] p-3 border border-[#8a7fff]/20">
              {method.icon}
            </div>
            <div>
              <h4 className="text-white font-medium">{method.title}</h4>
              <a
                href={method.link}
                className="text-[#e0e6ff]/70 hover:text-[#4fc3f7] transition-colors"
              >
                {method.value}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
        <div className="flex gap-4">
          <a
            href="#"
            className="bg-[#161a2b] border border-[#8a7fff]/20 rounded-full p-3 hover:border-[#4fc3f7] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#4fc3f7]"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
          <a
            href="#"
            className="bg-[#161a2b] border border-[#8a7fff]/20 rounded-full p-3 hover:border-[#4fc3f7] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#4fc3f7]"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect width="4" height="12" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a
            href="#"
            className="bg-[#161a2b] border border-[#8a7fff]/20 rounded-full p-3 hover:border-[#4fc3f7] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#4fc3f7]"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="#"
            className="bg-[#161a2b] border border-[#8a7fff]/20 rounded-full p-3 hover:border-[#4fc3f7] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#4fc3f7]"
            >
              <path d="M12 2a9.96 9.96 0 0 0-7.071 2.929A9.96 9.96 0 0 0 2 12a9.96 9.96 0 0 0 2.929 7.071A9.96 9.96 0 0 0 12 22a9.96 9.96 0 0 0 7.071-2.929A9.96 9.96 0 0 0 22 12a9.96 9.96 0 0 0-2.929-7.071A9.96 9.96 0 0 0 12 2z"></path>
              <path d="M10 8.484v7.032L15 12z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
      form.reset();
    }, 1500);
  }

  return (
    <div className="bg-[#161a2b]/40 backdrop-blur-sm border border-[#8a7fff]/20 rounded-xl p-6 h-full">
      <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>

      {isSuccess ? (
        <div className="bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 rounded-lg p-6 flex items-center gap-4">
          <CheckCircle2 className="h-8 w-8 text-[#4fc3f7]" />
          <div>
            <h4 className="text-white font-medium">Message Sent!</h4>
            <p className="text-[#e0e6ff]/70">
              Thank you for reaching out. We'll get back to you shortly.
            </p>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#e0e6ff]">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                        className="bg-[#161a2b]/60 border-[#8a7fff]/20 text-white form-input"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-[#ff5757]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#e0e6ff]">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your.email@example.com"
                        {...field}
                        className="bg-[#161a2b]/60 border-[#8a7fff]/20 text-white form-input"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-[#ff5757]" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#e0e6ff]">Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What is your message about?"
                      {...field}
                      className="bg-[#161a2b]/60 border-[#8a7fff]/20 text-white form-input"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-[#ff5757]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#e0e6ff]">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your inquiry..."
                      {...field}
                      className="bg-[#161a2b]/60 border-[#8a7fff]/20 text-white form-input min-h-32"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-[#ff5757]" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] hover:opacity-90 transition-opacity zentra-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 bg-[#0c0e17] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4fc3f7] rounded-full filter blur-[150px]"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#8a7fff] rounded-full filter blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Get in <span className="text-[#4fc3f7]">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] mx-auto mb-6 rounded-full"></div>
          <p className="text-[#e0e6ff]/80 text-lg">
            Have questions or want to learn more about Zentra? We're here to
            help you find the perfect AI solution for your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ContactInfo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
