import React from 'react';
import founderImg from '../assets/founder.jpg';
import { motion } from 'framer-motion';
import { Leaf, Users, Award, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-purple-600">GreenOrigin</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to make organic, sustainable products accessible to everyone.
              From farm to your table, we ensure the highest quality at every step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Founder's Story</h1>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  GreenOrigin was founded in 2020 by Ravi with a clear vision:
                  to make pure, organic food accessible to everyone while empowering the farmers who make it possible.
                </p>
                <p>
                  The inspiration came from a personal struggle Ravi found it difficult to source truly organic, chemical-free products he could trust for his family. This challenge sparked a mission to create a reliable and transparent way for people to access authentic organic produce.
                </p>
                <p>
                  Starting with collaborations with small farmers who shared his passion for purity, sustainability, and fair trade, Ravi laid the foundation for GreenOrigin. What began as a modest initiative has since grown into a movement, bridging the gap between conscious consumers and dedicated farming communities.                </p>
                <p>
                  Today, GreenOrigin partners with over 200 certified organic farms across India, upholding fair trade practices, transparent sourcing, and the highest quality standards.                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.img
                src={founderImg}
                alt="Founder"
                className="w-full max-h-[600px] object-cover object-[50%_10%] rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-4 -right-4 bg-purple-600 text-white p-4 rounded-xl shadow-lg"
              >
                <p className="font-semibold">Ravi Kumar</p>
                <p className="text-sm opacity-90">Founder & CEO</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Mission & Vision
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Our Mission",
                desc: "To provide access to pure, organic products that nourish families while supporting sustainable farming practices and empowering rural communities.",
                icon: <Heart className="h-6 w-6 text-white" />,
                bg: "bg-purple-50",
                circle: "bg-purple-600",
              },
              {
                title: "Our Vision",
                desc: "A world where organic, sustainable food is the norm, not the exception. Where every purchase contributes to a healthier planet and thriving communities.",
                icon: <Leaf className="h-6 w-6 text-white" />,
                bg: "bg-green-50",
                circle: "bg-green-600",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className={`${item.bg} rounded-2xl p-8 shadow-md`}
              >
                <div className={`w-12 h-12 ${item.circle} rounded-full flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="h-8 w-8 text-purple-600" />,
                title: "Sustainability",
                desc: "Every product supports sustainable farming practices that protect our environment for future generations.",
                bg: "bg-purple-100",
              },
              {
                icon: <Users className="h-8 w-8 text-green-600" />,
                title: "Community",
                desc: "We work directly with farmers, ensuring fair prices and building lasting partnerships that benefit everyone.",
                bg: "bg-green-100",
              },
              {
                icon: <Award className="h-8 w-8 text-blue-600" />,
                title: "Quality",
                desc: "Rigorous testing and certification ensure that every product meets the highest standards of purity and quality.",
                bg: "bg-blue-100",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-white shadow-md"
              >
                <div className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainable Farming */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl shadow-lg"
            >
              <motion.img
                src="https://media.assettype.com/outlookbusiness/2024-09-14/6abwxm3c/chef-harvesting-fresh-produce-scenic-field1304147-152134.jpg?w=626&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0auto=compress&cs=tinysrgb&w=800"
                alt="Sustainable farming"
                className="w-full rounded-2xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sustainable Farming Practices</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our partner farms use regenerative agriculture techniques that improve soil health,
                  increase biodiversity, and sequester carbon from the atmosphere.
                </p>
                <p>
                  From water conservation to natural pest management, every farm in our network
                  follows strict organic protocols that protect both the environment and your health.
                </p>
                <p>
                  We regularly visit our farms to ensure compliance with organic standards and
                  provide ongoing support to help farmers transition to sustainable practices.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
