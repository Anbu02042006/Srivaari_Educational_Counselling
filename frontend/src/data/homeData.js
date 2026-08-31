import { BadgeCheck, BriefcaseBusiness, Compass, FileCheck2, Lightbulb, ShieldCheck } from 'lucide-react'

export const programmeCategories = [
  { name: 'Undergraduate', detail: 'Build a strong foundation', icon: Compass },
  { name: 'Postgraduate', detail: 'Advance your expertise', icon: Lightbulb },
  { name: 'Professional Courses', detail: 'Move your career forward', icon: BriefcaseBusiness },
  { name: 'Online Learning', detail: 'Study around your schedule', icon: FileCheck2 },
  { name: 'Study Abroad', detail: 'Discover global opportunities', icon: BadgeCheck },
  { name: 'Skill Development', detail: 'Learn practical, in-demand skills', icon: ShieldCheck },
]

export const benefits = [
  { title: 'Personalized Guidance', text: 'Advice shaped around your ambitions, strengths, and circumstances.', icon: Compass },
  { title: 'Verified Institutions', text: 'Thoughtful choices from a carefully reviewed education network.', icon: BadgeCheck },
  { title: 'Career-Focused Recommendations', text: 'Course suggestions that connect learning with the future you want.', icon: BriefcaseBusiness },
  { title: 'Transparent Process', text: 'Clear timelines, honest guidance, and no confusing surprises.', icon: ShieldCheck },
  { title: 'Expert Counselling', text: 'Practical support from people who understand education decisions.', icon: Lightbulb },
  { title: 'Application Support', text: 'Help staying organized from shortlist to submission.', icon: FileCheck2 },
]

export const processSteps = [
  ['01', 'Tell Us Your Goal', 'Share what excites you, where you are today, and what you hope to achieve.'],
  ['02', 'Get Personalized Guidance', 'Meet a counsellor who helps turn your options into a clear direction.'],
  ['03', 'Shortlist Courses & Colleges', 'Compare the right-fit choices with confidence and useful context.'],
  ['04', 'Complete Your Admission', 'Stay supported through documents, applications, and your next step.'],
]

export const featuredCourses = [
  { id: 'business-management', title: 'Business Management', category: 'Undergraduate', duration: '3 years', mode: 'On campus', description: 'Develop strategic thinking, leadership, and commercial confidence.', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80' },
  { id: 'computer-science', title: 'Computer Science', category: 'Undergraduate', duration: '4 years', mode: 'On campus', description: 'Learn to design thoughtful digital products and intelligent systems.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80' },
  { id: 'clinical-psychology', title: 'Clinical Psychology', category: 'Postgraduate', duration: '2 years', mode: 'On campus', description: 'Build a deeper understanding of people, wellbeing, and care.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80' },
  { id: 'digital-marketing', title: 'Digital Marketing', category: 'Professional', duration: '6 months', mode: 'Hybrid', description: 'Create modern campaigns using insights, content, and strategy.', image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=900&q=80' },
  { id: 'data-analytics', title: 'Data Analytics', category: 'Professional', duration: '8 months', mode: 'Online', description: 'Turn data into clear, practical decisions for growing teams.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80' },
  { id: 'interior-design', title: 'Interior Design', category: 'Undergraduate', duration: '3 years', mode: 'On campus', description: 'Combine creative vision with the skills to shape meaningful spaces.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80' },
]

export const featuredColleges = [
  { id: 'northbridge-institute', name: 'Northbridge Institute', location: 'Bengaluru', type: 'Private university', accreditation: 'NAAC A+ rated', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80' },
  { id: 'harbor-school-of-design', name: 'Harbor School of Design', location: 'Chennai', type: 'Design school', accreditation: 'Recognised design institution', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80' },
  { id: 'greenfield-college', name: 'Greenfield College', location: 'Coimbatore', type: 'Autonomous college', accreditation: 'NAAC A rated', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80' },
  { id: 'meridian-academy', name: 'Meridian Academy', location: 'Hyderabad', type: 'Professional academy', accreditation: 'Industry-recognised programs', image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=900&q=80' },
]

export const testimonials = [
  { name: 'Aarav N.', detail: 'BBA student · Chennai', quote: 'The guidance was clear from the first call. I found a college that genuinely fits my goals.' },
  { name: 'Meera S.', detail: 'Data Analytics learner · Bengaluru', quote: 'I was overwhelmed by online options. My counsellor made the decision feel focused and easy.' },
  { name: 'Riya P.', detail: 'Psychology student · Coimbatore', quote: 'Every question was handled patiently, including the practical parts of my application.' },
  { name: 'Karthik R.', detail: 'Design student · Hyderabad', quote: 'Pathway helped me see a route into design that I had not considered before.' },
]

export const institutionNames = ['Ridgeway University', 'Nexa Institute', 'Aster College', 'Crescent School', 'Summit Academy', 'Orion University', 'Lumen College', 'Evergreen Institute']

export const faqs = [
  ['How does the counselling process begin?', 'Start with a no-pressure conversation about your goals. We then suggest a focused next step based on what matters to you.'],
  ['Do you help with course and college shortlisting?', 'Yes. We help you compare suitable courses and institutions using your interests, eligibility, location preferences, and career direction.'],
  ['Is the first counselling session free?', 'Yes. Your initial discussion is complimentary and is designed to help you understand your options.'],
  ['Can you support applications?', 'We can guide you through planning documents and staying on track with application steps.'],
  ['Do you offer online counselling?', 'Yes. Counselling can be arranged remotely, so you can speak with us from wherever you are.'],
]
