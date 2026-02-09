import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import logo from '../../assets/logo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {/* About Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <img src={logo} alt="Kalavpp Logo" className="h-12 w-auto mb-4" />
            <p className="text-sm text-gray-400 mb-4">
              Your premier destination for original art, prints, and creative services.
              Connecting artists with art lovers worldwide.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="hover:text-[#D4AF37] transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-[#D4AF37] transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-[#D4AF37] transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Original Art', 'Prints & Merchandise', 'Digital Art', 'Commissions', 'Workshops'].map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a href="#" className="hover:text-[#D4AF37] transition-colors inline-block hover:translate-x-1 transition-transform">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h3 className="font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              {['Contact Us', 'Shipping Information', 'Returns & Refunds', 'FAQs', 'Privacy Policy', 'Terms of Service'].map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a href="#" className="hover:text-[#D4AF37] transition-colors inline-block hover:translate-x-1 transition-transform">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <motion.li
                className="flex items-start gap-2"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>123 Art Street, Creative District, Mumbai, India</span>
              </motion.li>
              <motion.li
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </motion.li>
              <motion.li
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>hello@kalavpp.com</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>&copy; {currentYear} Kalavpp. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}