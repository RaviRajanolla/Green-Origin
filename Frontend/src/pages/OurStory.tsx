import React from 'react';
import { motion } from 'framer-motion';
import {
  Leaf,
  Heart,
  Users,
  Shield,
  Quote,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';
import founderImg from '../assets/founder.jpg';


const OurStory = () => {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const whyChoosePoints = [
    {
      icon: Leaf,
      title: "Pure & Organic",
      description: "100% certified organic produce grown without harmful pesticides or chemicals.",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      icon: Users,
      title: "Empowering Farmers",
      description: "Fair trade practices that support local farming communities and sustainable livelihoods.",
      color: "bg-violet-50 border-violet-200",
      iconColor: "text-violet-600"
    },
    {
      icon: Heart,
      title: "Health is Wealth",
      description: "Nutrient-rich foods that nourish your body and support your family's wellbeing.",
      color: "bg-fuchsia-50 border-fuchsia-200",
      iconColor: "text-fuchsia-600"
    },
    {
      icon: Shield,
      title: "Community First",
      description: "Building stronger communities through sustainable practices and shared values.",
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600"
    }
  ];

  const testimonials = [
    {
      "name": "Amarendhar",
      "location": "Certified Organic Farmer, CA",
      "rating": 5,
      "text": "Partnering with GreenOrigin for the past 8 years has empowered our family farm to flourish while staying true to sustainable farming practices. Their deep understanding of organic stewardship has made them an invaluable ally in our mission to cultivate healthy, high-quality produce.",
      "image": "https://media.istockphoto.com/id/1146658328/photo/young-farmer-with-laptop-is-looking-at-camera.jpg?s=612x612&w=0&k=20&c=zlN5VAkZKjx7hmi5H9oF3yJpTmOkpmT-JrTQ0cXRUtg=",
      "role": "3rd Generation Organic Farmer"
    }
    ,
    {
      name: "Sarah",
      location: "Heritage Farm Collective",
      rating: 5,
      text: "GreenOrigin doesn't just buy our crops they invest in our community. Their fair trade practices have helped us expand our sustainable farming methods and support local agricultural education.",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
      role: "Sustainable Agriculture Specialist"
    },
    {
      name: "Raj",
      location: "Organic Cooperative",
      rating: 5,
      text: "As part of the GreenOrigin network, we've been able to reach families across the country with our heritage grains and vegetables. It's rewarding to know our work directly nourishes communities nationwide.",
      image: "https://media.istockphoto.com/id/1441154967/photo/happy-man-managing-an-organic-farm.jpg?s=612x612&w=0&k=20&c=fFvik3sXqpN-xhYA6JKZeLFTV-aI35h290F52Lx8CBg=",
      role: "Master Grain Cultivator"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full h-[500px] relative overflow-hidden bg-white flex items-center justify-center rounded-xl shadow-lg">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </section>

      {/* Founder's Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-8">
              Our Founder's Vision
            </h2>
            <div className="bg-purple-50 p-6 rounded-2xl border-l-4 border-purple-500 mb-8">
              <Quote className="text-purple-600 w-8 h-8 mb-4" />
              <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-4">
                "Growing up close to nature, I learned that food is more than sustenance it is medicine, community, and hope. GreenOrigin exists to bring that pure, healing connection back to every family's table."              </blockquote>
              <cite className="text-purple-700 font-medium">Ravi Kumar, Founder & CEO</cite>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Ravi’s journey began with a simple but powerful realization finding truly organic, chemical-free food for his own family was harder than it should be. This challenge inspired him to take action and build a trusted source for authentic organic produce.
            </p>
            <p className="text-gray-600 leading-relaxed">
              In 2020, he founded GreenOrigin with a mission to make premium organic food accessible while empowering the farmers who grow it. Today, GreenOrigin partners with over 200 certified organic farms across India, creating a transparent network of trust that connects farming communities with conscious consumers. Every product tells a story of careful cultivation, environmental stewardship, and community support.
            </p>
          </div>
          <motion.div
            className="order-1 lg:order-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={founderImg}
              alt="Ravi Kumar, Founder of GreenOrigin"
              className="w-full max-h-[600px] object-cover object-[50%_10%] rounded-xl shadow-lg"

            />

          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose GreenOrigin Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-violet-50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
              Why Our Customers Trust Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're more than an organic food company—we're a movement toward healthier lives,
              stronger communities, and a more sustainable future.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {whyChoosePoints.map((point, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`${point.color} p-8 rounded-2xl border-2 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                whileHover={{ scale: 1.02 }}
              >
                <point.icon className={`${point.iconColor} w-12 h-12 mb-6`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {point.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
            Voices from Our Farming Community
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Meet the expert farmers and agricultural specialists who make GreenOrigin possible
          </p>
        </motion.div>

        <motion.div
          className="relative bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl shadow-2xl p-8 sm:p-12 border border-purple-200"
          {...fadeInUp}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
            <img
              src={testimonials[currentTestimonial].image}
              alt={testimonials[currentTestimonial].name}
              className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover sm:mr-6 mb-4 sm:mb-0 ring-4 ring-purple-200 shadow-lg"
            />
            <div className="text-center sm:text-left">
              <h4 className="text-xl font-semibold text-gray-900 mb-1">
                {testimonials[currentTestimonial].name}
              </h4>
              <p className="text-purple-700 font-medium text-sm mb-1">
                {testimonials[currentTestimonial].role}
              </p>
              <p className="text-gray-600 text-sm mb-2">{testimonials[currentTestimonial].location}</p>
              <div className="flex justify-center sm:justify-start mt-2">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-purple-500 fill-current" />
                ))}
              </div>
            </div>
          </div>

          <blockquote className="text-xl text-gray-800 leading-relaxed mb-8 italic font-light">
            "{testimonials[currentTestimonial].text}"
          </blockquote>

          {/* Farming Expertise Badge */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-8 border border-purple-200">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center text-purple-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span className="font-medium">Certified Organic</span>
              </div>
              <div className="flex items-center text-purple-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span className="font-medium">Sustainable Practices</span>
              </div>
              <div className="flex items-center text-purple-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span className="font-medium">Community Partner</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/80 hover:bg-white border border-purple-200 hover:border-purple-300 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${index === currentTestimonial ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/80 hover:bg-white border border-purple-200 hover:border-purple-300 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-purple-600" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Visual Storytelling Section */}
      <section className="py-20 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
              Expert Farming Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Witness the mastery of our certified organic farmers who combine traditional wisdom
              with cutting-edge sustainable practices to deliver exceptional quality.
            </p>
          </motion.div>

          {/* Hero Farming Image */}
          <motion.div
            className="mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-black">
              <video
                className="w-full h-full object-cover"
                src="https://template.canva.com/EAGClcbw5oQ/2/document_1440w-0XQ--ACHYog.mp4"
                autoPlay
                muted
                loop
              />

            </div>
          </motion.div>

          {/* Expert Farming Grid */}
          <motion.div
            className="grid lg:grid-cols-2 gap-8 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {/* Large Feature Card */}
            <motion.div
              variants={fadeInUp}
              className="lg:row-span-2 group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="https://media.istockphoto.com/id/1215793603/photo/happy-farmer-harvesting-organic-lettuce-at-a-farm.jpg?s=612x612&w=0&k=20&c=LVaCOPoL9__EzUx-gxKaFrH5FRuTVuJ9h2_LIoMPtpg="
                alt="Expert farmer carefully inspecting organic vegetables"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/30 to-transparent" /> */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-semibold text-white mb-3">Master Cultivators</h3>
                  <p className="text-purple-100 leading-relaxed mb-4">
                    Our certified organic farmers bring 30+ years of expertise, ensuring every crop meets the highest standards of quality and sustainability.
                  </p>
                  <div className="flex items-center text-purple-200">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span className="text-sm font-medium">Certified Organic Excellence</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Two Smaller Cards */}
            <motion.div
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="https://media.istockphoto.com/id/1396705272/photo/soil-cation-balancing-concept-expressed-by-saturation-ratios-for-achieving-optimal-crop-yields.jpg?s=612x612&w=0&k=20&c=1brngWX-bGL_PfMQj5lVbNo18BmGdSRa-Wv8DT7t_FQ="
                alt="Advanced soil testing and analysis"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-violet-900/70 via-violet-900/20 to-transparent" /> */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Soil Science Mastery</h3>
                <p className="text-violet-100 text-sm leading-relaxed">
                  Advanced soil analysis and nutrient management for optimal crop health
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="https://media.istockphoto.com/id/991412276/photo/early-morning-harvest.jpg?s=612x612&w=0&k=20&c=kalaM00lQQoBVMCK1vlhw_pERpo9S17OLxVQMU7IbNE="
                alt="Precision harvesting techniques"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/70 via-fuchsia-900/20 to-transparent" /> */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Precision Harvesting</h3>
                <p className="text-fuchsia-100 text-sm leading-relaxed">
                  Timing and technique perfected to capture peak nutritional value
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Farming Expertise Stats */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              { number: "200+", label: "Certified Organic Farms", icon: "🌾" },
              { number: "30+", label: "Years Average Experience", icon: "👨‍🌾" },
              { number: "15", label: "States Across India", icon: "🗺️" },
              { number: "99.8%", label: "Quality Assurance Rate", icon: "✅" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-purple-200 text-center hover:bg-white transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-purple-700 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visual Storytelling Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-violet-50">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-8">
              Our Journey in Action
            </h2>
            <p className="text-xl text-gray-600">
              From soil to harvest, every step tells our story.
            </p>
          </motion.div>

          {/* Large Top Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-xl overflow-hidden shadow-lg mb-10"
          >
            <img
              src="https://images.pexels.com/photos/129574/pexels-photo-129574.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Farming field"
              className="w-full h-[350px] object-cover"
            />
          </motion.div>

          {/* 6 Image Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {[
              "https://media.istockphoto.com/id/591839700/photo/box-of-tangerine-in-the-hands.jpg?s=612x612&w=0&k=20&c=1Pyr7tiy9VQpoAHC29L71LyxAptiRA5mv5P-bEEA_V4=",
              "https://media.istockphoto.com/id/1499716743/photo/i-love-harvesting-products.jpg?s=612x612&w=0&k=20&c=uOUd1a8AllQCvPmbQF6KiPxpgwX5OIRi1JKL1aia8wI=",
              "https://media.istockphoto.com/id/1313691719/photo/farmers-load-boxes-of-chard-into-a-truck.jpg?s=612x612&w=0&k=20&c=-x_cUT7t6K4i0uvhP7UOZUUqeXoUUD5frixsDojBs54=",
              "https://media.istockphoto.com/id/1275852411/photo/smiling-woman-at-vegetable-plantation.jpg?s=612x612&w=0&k=20&c=QQkJtk0V944PkZsKIZu_7GSULKTMBG9wYmARP1KxKH0=",
              "https://media.istockphoto.com/id/1443509831/photo/beautiful-woman-in-a-greenhouse-garden-center.jpg?s=612x612&w=0&k=20&c=5_UD5fbyzzZmQK-jOYBmn5zjVN7hnKEZGKh011q_uDs=",
              "https://media.istockphoto.com/id/1424178942/photo/african-american-woman-cultivating-organic-lettuce-checking-for-pests-in-hydroponic-enviroment.jpg?s=612x612&w=0&k=20&c=BOC2sjFlgE8EmKNaTijyD-kH6U-WwW5frSP4_nf8pc8=",
              "https://media.istockphoto.com/id/1432307670/photo/woman-picking-tea-leaves-in-tea-plantation-girl-picking-tea-leaves-beautiful-asian-woman.jpg?s=612x612&w=0&k=20&c=Y9Wm-5UVM49JHkqij6OElkIzLWiaP-wl3p6d_XGVsZo=",
              "https://media.istockphoto.com/id/2154211719/photo/female-farmer-using-digital-tablet-to-check-quality-of-lettuce-crops.jpg?s=612x612&w=0&k=20&c=TkN7CSuXf3MvjKzsMoDsgYMDqD8GHuJE_1JIR8RUJx8=",
              "https://media.istockphoto.com/id/1056690652/photo/grown-by-mother-nature-herself.jpg?s=612x612&w=0&k=20&c=H4C6ceT3-wmuNx5pOXtV65CfHQksLggdpAQ--m1eOgM="



            ].map((src, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-xl shadow-md"
              >
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>






      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600">
        <motion.div
          className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center"
          {...fadeInUp}

        >
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Ready to Join Our Organic Revolution?
          </h2>
          <p className="text-xl text-purple-100 mb-12 leading-relaxed">
            Experience the difference that pure, organic food makes for your family's health and our planet's future.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/collections'}
            >
              Shop Our Organic Range
            </motion.button>
            <motion.button
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/join-community'}
            >
              Join Our Community
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default OurStory;