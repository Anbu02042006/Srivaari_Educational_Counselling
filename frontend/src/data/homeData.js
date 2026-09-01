import { BadgeCheck, BriefcaseBusiness, Compass, FileCheck2, HeartHandshake, Lightbulb, ShieldCheck, Users } from 'lucide-react'

export const programmeCategories = [
  { name: 'Engineering & Technology', detail: 'B.E, B.Tech, M.Tech, Diploma', icon: Compass },
  { name: 'Arts, Science & Commerce', detail: 'B.Com, BBA, B.Sc, BCA, BA', icon: Lightbulb },
  { name: 'Medical & Allied Health', detail: 'Nursing, Pharmacy, Physiotherapy, Lab Tech', icon: ShieldCheck },
  { name: 'Postgraduate & MBA', detail: 'MBA, MCA, M.Sc, M.Com', icon: BriefcaseBusiness },
  { name: 'Emerging Tech & AI', detail: 'Data Science, Cyber Security, AI & ML', icon: BadgeCheck },
  { name: 'Study Abroad & Distance', detail: 'Global Degrees & Flexible Online Programs', icon: FileCheck2 },
]

export const benefits = [
  {
    title: '1-on-1 Attentive Listening',
    text: 'We take time to understand your 12th / degree marks, your interests, and your family budget before suggesting anything.',
    icon: Users,
  },
  {
    title: 'Genuine & Verified Colleges',
    text: 'No fake rankings or sponsored promotions. We only recommend recognized, NAAC/AICTE-accredited institutions.',
    icon: BadgeCheck,
  },
  {
    title: 'Honest Career Roadmaps',
    text: 'We share practical insights on real placement records, syllabus depth, and long-term industry job demands.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Zero Hidden Costs & Full Transparency',
    text: 'Clear breakdown of tuition fees, hostel expenses, scholarship eligibility, and loan documentation assistance.',
    icon: ShieldCheck,
  },
  {
    title: 'Friendly, Caring Counsellors',
    text: 'Talk freely with seasoned advisors who treat you like family and patiently answer every question from you and your parents.',
    icon: HeartHandshake,
  },
  {
    title: 'End-to-End Handholding',
    text: 'From comparing branches to submitting applications and college visits, we stand right beside you until day one of college.',
    icon: FileCheck2,
  },
]

export const processSteps = [
  ['01', 'Sit Down & Talk With Us', 'Share your marks, favorite subjects, future dreams, and any worries you or your parents have.'],
  ['02', 'Explore Your Best-Fit Options', 'Our counsellor shortlists matching courses and accredited colleges tailored to your budget and cut-off.'],
  ['03', 'Campus & Branch Selection', 'Compare realistic placement stats, faculty reputation, and campus culture before making your final pick.'],
  ['04', 'Smooth & Confident Admission', 'We assist with application paperwork, verification documents, and scholarship guidance with zero stress.'],
]

export const featuredCourses = [
  {
    id: 'computer-science-engineering',
    title: 'B.E. Computer Science & AI',
    category: 'Engineering',
    duration: '4 years',
    mode: 'On campus',
    description: 'Master full-stack programming, cloud computing, artificial intelligence, and software systems.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'business-administration',
    title: 'BBA & Financial Management',
    category: 'Management',
    duration: '3 years',
    mode: 'On campus',
    description: 'Build core business leadership, corporate strategy, accounting, and communication confidence.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'allied-health-sciences',
    title: 'B.Sc. Allied Health Sciences',
    category: 'Healthcare',
    duration: '3 - 4 years',
    mode: 'On campus + Hospital Training',
    description: 'Hands-on hospital training across medical lab technology, radiology, cardio perfusion, and diagnostics.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'bca-data-science',
    title: 'BCA & Cloud Computing',
    category: 'Computer Applications',
    duration: '3 years',
    mode: 'On campus',
    description: 'Practical curriculum covering Python, web technologies, database management, and cloud architecture.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'digital-marketing-media',
    title: 'Digital Marketing & Media Strategy',
    category: 'Professional Diploma',
    duration: '6 months',
    mode: 'Hybrid',
    description: 'Learn real campaign analytics, SEO, social media growth, and content marketing from industry mentors.',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'interior-design-architecture',
    title: 'B.Des. Interior & Space Design',
    category: 'Design',
    duration: '3 - 4 years',
    mode: 'On campus',
    description: 'Blend creative spatial imagination with 3D modeling, sustainable materials, and real project studios.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
  },
]

export const featuredColleges = [
  {
    id: 'chennai-tech-campus',
    name: 'Premier Engineering Institute',
    location: 'Chennai',
    type: 'Autonomous College',
    accreditation: 'NAAC A++ · NBA Accredited',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'coimbatore-arts-science',
    name: 'Coimbatore College of Arts & Science',
    location: 'Coimbatore',
    type: 'Autonomous Institution',
    accreditation: 'NAAC A+ Rated · Top NIRF Rank',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'madurai-medical-allied',
    name: 'Institute of Medical & Allied Health',
    location: 'Madurai',
    type: 'Healthcare Academy',
    accreditation: 'Affiliated Hospital & MGR University',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'bengaluru-management-school',
    name: 'Apex School of Management',
    location: 'Bengaluru',
    type: 'Business Academy',
    accreditation: 'AICTE Approved · Global Industry Tie-ups',
    image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=900&q=80',
  },
]

export const testimonials = [
  {
    name: 'Aarav N',
    detail: 'B.E. Computer Science · Chennai',
    quote: 'After 12th results, we were stressed about cut-offs. Sri Vaari sat with us, explained every college fee openly, and guided me into a top college in Chennai.',
  },
  {
    name: 'Meera S',
    detail: 'B.Sc Data Science · Coimbatore',
    quote: 'I was torn between engineering and BCA. My counsellor patiently broke down the syllabus, job scope, and fee structure. That honest talk made all the difference.',
  },
  {
    name: 'Riya P',
    detail: 'Allied Health Sciences · Madurai',
    quote: 'Finding a genuine paramedical college with real hospital training was stressful. Sri Vaari showed us verified campuses and guided all our admission paperwork.',
  },
  {
    name: 'Karthik R',
    detail: 'BBA & Finance · Salem',
    quote: 'They treated us like family from day one. Even after admission, they checked in to make sure I settled in well at my hostel. Truly caring mentors for every student.',
  },
]

export const institutionNames = [
  'Premier Institute of Technology',
  'Apex College of Arts & Science',
  'City Institute of Allied Health',
  'National Academy of Management',
  'Heritage College of Engineering',
  'Global School of Design & Media',
  'Metro Institute of Science',
  'St. Thomas Autonomous College',
]

export const faqs = [
  [
    'How does your counselling process work?',
    'We start with a relaxed, no-pressure conversation with you and your parents. We understand your marks, interests, preferred locations, and budget, then shortlist colleges where you can thrive.',
  ],
  [
    'Is the first counselling session really free?',
    'Yes, 100% free. We believe every student deserves clarity without paying an upfront fee just to know their genuine options.',
  ],
  [
    'Do you assist with college cut-offs and government counselling?',
    'Yes. We guide you through Anna University (TNEA), Arts & Science counselling dates, choice filling orders, and verified management seat processes.',
  ],
  [
    'Can you help students from outside Chennai / Tamil Nadu?',
    'Absolutely! We provide phone and WhatsApp video counselling so students and parents anywhere can get personalized guidance from home.',
  ],
  [
    'Will you help with college scholarships and education loans?',
    'Yes. We explain available merit/community scholarships and provide complete documentation checklists to help you apply for education loans easily.',
  ],
]
