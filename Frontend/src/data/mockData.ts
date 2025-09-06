import { Product, Testimonial, FAQ } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Quinoa',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/7262756/pexels-photo-7262756.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'grains',
    weight: '500g',
    description: 'Premium organic quinoa sourced directly from sustainable farms. Rich in protein and essential amino acids.',
    features: ['High Protein', 'Gluten-Free', 'Complete Amino Acids', 'Iron Rich'],
    certifications: ['USDA Organic', 'Fair Trade', 'Non-GMO'],
    rating: 4.8,
    reviews: 127,
    isNew: true,
    isOrganic: true,
    inStock: true
  },
  {
    id: '2',
    name: 'Organic Almonds',
    price: 799,
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'nuts',
    weight: '250g',
    description: 'Finest organic almonds from California farms. Perfect for snacking or cooking.',
    features: ['Raw & Natural', 'Heart Healthy', 'Vitamin E Rich', 'Antioxidants'],
    certifications: ['USDA Organic', 'California Grown'],
    rating: 4.9,
    reviews: 89,
    isOrganic: true,
    inStock: true
  },
  {
    id: '3',
    name: 'Organic Chia Seeds',
    price: 449,
    image: 'https://images.pexels.com/photos/2377174/pexels-photo-2377174.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'seeds',
    weight: '200g',
    description: 'Premium organic chia seeds packed with omega-3 fatty acids and fiber.',
    features: ['Omega-3 Rich', 'High Fiber', 'Calcium Source', 'Protein Rich'],
    certifications: ['USDA Organic', 'Raw', 'Vegan'],
    rating: 4.7,
    reviews: 156,
    isOrganic: true,
    inStock: true
  },
  {
    id: '4',
    name: 'Organic Honey',
    price: 649,
    image: 'https://images.pexels.com/photos/1324803/pexels-photo-1324803.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'sweeteners',
    weight: '350g',
    description: 'Pure organic wildflower honey harvested from pristine mountain apiaries.',
    features: ['Raw & Unfiltered', 'Wildflower', 'Antibacterial', 'Natural Energy'],
    certifications: ['USDA Organic', 'Raw', 'Unprocessed'],
    rating: 4.9,
    reviews: 203,
    isOrganic: true,
    inStock: true
  },
  {
    id: '5',
    name: 'Organic Oats',
    price: 199,
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'grains',
    weight: '1kg',
    description: 'Whole grain organic oats perfect for breakfast and baking.',
    features: ['Whole Grain', 'Beta-Glucan Rich', 'Heart Healthy', 'Soluble Fiber'],
    certifications: ['USDA Organic', 'Non-GMO', 'Whole Grain'],
    rating: 4.6,
    reviews: 94,
    isOrganic: true,
    inStock: true
  },
  {
    id: '6',
    name: 'Organic Green Tea',
    price: 399,
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'beverages',
    weight: '100g',
    description: 'Premium organic green tea leaves with delicate flavor and rich antioxidants.',
    features: ['Antioxidant Rich', 'Caffeine Natural', 'Detox', 'Metabolism Boost'],
    certifications: ['USDA Organic', 'Fair Trade', 'Pesticide Free'],
    rating: 4.8,
    reviews: 78,
    isOrganic: true,
    inStock: true
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Abhignya',
    avatar: 'https://media.istockphoto.com/id/1336292638/photo/portrait-of-young-woman-stock-photo.jpg?s=612x612&w=0&k=20&c=_r7jO3kpZdwCT5m9C1M8mjP32ojCAv8-_uYvYTKe5XE=',
    rating: 5,
    comment: 'Amazing quality organic products! The quinoa is so fresh and the delivery was super fast. Highly recommend GreenOrigin!',
    location: 'Mumbai, India'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    avatar: 'https://media.istockphoto.com/id/1309057719/photo/shot-of-a-young-woman-chatting-on-phone-standing-near-entrance-gate-stock-photo.jpg?s=612x612&w=0&k=20&c=BJn013KFayVMfmrenmhGV86bjk0sNIRFlhZ60nIOIco=',
    rating: 5,
    comment: 'Love the transparency in sourcing. Finally found a brand I can trust for my family\'s health. The honey is absolutely divine!',
    location: 'Delhi, India'
  },
  {
    id: '3',
    name: 'Raj Kumar',
    avatar: 'https://media.istockphoto.com/id/1587315781/photo/happy-laughing-guy-posing-with-arms-folded.jpg?s=612x612&w=0&k=20&c=-HO3lycnJz194GthET07cqQfvic29nfXP5ITtC--kig=',
    rating: 5,
    comment: 'Been ordering for 6 months now. Consistent quality and great customer service. The packaging is eco-friendly too!',
    location: 'Bangalore, India'
  },
  {
    id: '4',
    name: 'Rithwika Roy',
    avatar: 'https://media.istockphoto.com/id/187319092/photo/confidence-is-her-best-attribute.jpg?s=612x612&w=0&k=20&c=zSGcpkvQKGEw1OtbY7vw0i0bTLtRpuSMIhGNV3WgcJM=',
    rating: 5,
    comment: 'The chia seeds and almonds are top quality. My nutritionist recommended GreenOrigin and I\'m so glad I found you!',
    location: 'Kolkata, India'
  }
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I place an order?',
    answer: 'Simply browse our collections, add items to your cart, and proceed to checkout. We accept UPI, cards, and cash on delivery.'
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI payments, credit/debit cards, and cash on delivery for your convenience.'
  },
  {
    id: '3',
    question: 'How can I verify that products are truly organic?',
    answer: 'All our products come with USDA Organic certification and other relevant certifications. You can find certification details on each product page.'
  },
  {
    id: '4',
    question: 'What is your delivery time?',
    answer: 'We deliver within 2-5 business days depending on your location. Metro cities get faster delivery within 1-3 days.'
  },
  {
    id: '5',
    question: 'Do you offer bulk discounts?',
    answer: 'Yes! We offer attractive discounts on bulk orders. Contact us directly for custom pricing on large quantities.'
  },
  {
    id: '6',
    question: 'What is your return policy?',
    answer: 'We offer a 7-day return policy for unopened products. If you\'re not satisfied, we\'ll provide a full refund or replacement.'
  },
  {
    id: '7',
    question: 'Are your products pesticide-free?',
    answer: 'Absolutely! All our products are certified organic and completely free from harmful pesticides and chemicals.'
  }
];

export const categories = [
  { id: 'grains', name: 'Grains & Cereals', count: 24 },
  { id: 'nuts', name: 'Nuts & Seeds', count: 18 },
  { id: 'seeds', name: 'Seeds', count: 12 },
  { id: 'sweeteners', name: 'Natural Sweeteners', count: 8 },
  { id: 'beverages', name: 'Beverages', count: 15 },
  { id: 'spices', name: 'Spices & Herbs', count: 32 }
];