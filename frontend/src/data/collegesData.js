// Dynamically load all college image assets using Vite's glob import
const tnAssetModules = import.meta.glob('../assets/Tamilnadu/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
  eager: true,
  import: 'default',
})

const kaAssetModules = import.meta.glob('../assets/Karnataka/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
  eager: true,
  import: 'default',
})

const pyAssetModules = import.meta.glob('../assets/Puducherry/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
  eager: true,
  import: 'default',
})

const engAssetModules = import.meta.glob('../assets/Engineering/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
  eager: true,
  import: 'default',
})

const commonFaqs = [
  ['How can I apply for admission?', 'Begin with an advisory conversation with Sri Vaari Educational Counselling. We guide you through eligibility, documentation, counselling rounds, and seat allotment.'],
  ['What are the eligibility criteria for admissions?', 'Candidates must meet the educational prerequisites (10+2 with required subjects) and qualifying entrance exam criteria (such as NEET for Medical or TNEA/entrance rank for Engineering).'],
  ['Are scholarships or educational loan guidance provided?', 'Yes, we assist with institutional scholarship applications and provide complete documentation support for nationalized bank educational loans.'],
  ['Can we arrange campus visits before admission?', 'Yes, we help arrange guided campus tours to evaluate infrastructure, academic laboratories, hostel facilities, and placement track records.'],
]

// Known city mappings for local colleges
const cityMap = {
  // Tamil Nadu - Medical
  'ACS Medical College & Hospital': 'Chennai',
  'Annapoorana Medical College & Hospital': 'Salem',
  'Bharat Medical College & Hospital': 'Chennai',
  'Chettinad Hospital & Research Institute': 'Kelambakkam, Chennai',
  'Dhanalakshmi Srinivasan Medical College & Hospital': 'Perambalur',
  'KMCH Institute of Health Sciences': 'Coimbatore',
  'Karpaga Vinayaga Institute of Medical Sciences': 'Chengalpattu',
  'MGM Healthcare Institute of Health Sciences': 'Chennai',
  'Meenakshi Medical College & Research Institute': 'Kanchipuram',
  'PSG Institute of Medical Sciences & Research': 'Coimbatore',
  'SRM Medical College Hospital & Research Centre': 'Kattankulathur, Chennai',
  'Shri Sathya Sai Medical College & Research Institute': 'Ammapettai, Chengalpattu',
  'Sree Balaji Medical College & Hospital': 'Chromepet, Chennai',
  'Sree Mookambika Institute of Medical Sciences': 'Kulasekharam, Kanyakumari',
  'Sri Lalithambigai Medical College & Hospital': 'Maduravoyal, Chennai',
  'Sri Ramachandra Medical College & Research Institute': 'Porur, Chennai',
  'Tagore Medical College & Hospital': 'Rathinamangalam, Chennai',
  'Velammal Medical College & Hospital': 'Madurai',
  'Vinayaka Mission’s Kirupananda Variyar Medical College': 'Salem',

  // Karnataka - Medical
  'BGS Global Institute of Medical Sciences': 'Bengaluru',
  'JSS Medical College': 'Mysuru',
  'Jawaharlal Nehru Medical College': 'Belagavi',
  'K.S. Hegde Medical Academy': 'Mangaluru',
  'Kasturba Medical College': 'Manipal / Mangaluru',
  'M.S. Ramaiah Medical College': 'Bengaluru',
  'RajaRajeswari Medical College & Hospital': 'Bengaluru',
  'St. John’s Medical College': 'Bengaluru',
  'Vydehi Institute of Medical Sciences & Research Centre': 'Bengaluru',

  // Puducherry - Medical
  'Aarupadai Veedu Medical College': 'Puducherry',
  'Mahatma Gandhi Medical College & Research Institute': 'Pillaiyarkuppam, Puducherry',
  'Pondicherry Institute of Medical Sciences': 'Kalapet, Puducherry',
  'Sri Lakshmi Narayana Institute of Medical Sciences': 'Osudu, Puducherry',
  'Sri Manakula Vinayagar Medical College & Hospital': 'Madagadipet, Puducherry',
  'Sri Venkateshwaraa Medical College Hospital & Research Centre': 'Ariyur, Puducherry',
  'Vinayaka Missions Medical College': 'Karaikal, Puducherry',

  // Engineering Colleges
  'AMC Engineering College': 'Bengaluru',
  'AMET University': 'Chennai',
  'Acharya Institute of Technology': 'Bengaluru',
  'Adithya institute of technology': 'Coimbatore',
  'Akash Institute of Engineering & Technology': 'Bengaluru',
  'Alliance University': 'Bengaluru',
  'Amrita Vishwa Vidyapeetham': 'Coimbatore',
  'CARE College of Engineering': 'Tiruchirappalli',
  'CHRIST University': 'Bengaluru',
  'Coimbatore Institute of Engineering and Technology': 'Coimbatore',
  'Coimbatore Institute of Technology': 'Coimbatore',
  'Dayananda Sagar University': 'Bengaluru',
  'Dhanalakshmi Srinivasan Engineering College': 'Perambalur',
  'Dr. M.G.R. Educational and Research Institute': 'Chennai',
  'Dr. N.G.P. Institute of Technology': 'Coimbatore',
  'EASA College of Engineering and Technology': 'Coimbatore',
  'East Point Group of Institutions': 'Bengaluru',
  'Excel Engineering College': 'Komarapalayam, Namakkal',
  'Gnanamani College of Technology': 'Namakkal',
  'Hindusthan College of Engineering & Technology': 'Coimbatore',
  'Imayam College of Engineering': 'Tiruchirappalli',
  'JCT College of Engineering and Technology': 'Coimbatore',
  'Jain University': 'Bengaluru',
  'KGiSL Institute of Technology': 'Coimbatore',
  'KPR Institute of Engineering and Technology': 'Coimbatore',
  'Kalaignar Karunanidhi Institute of Technology': 'Coimbatore',
  'Karpagam College of Engineering': 'Coimbatore',
  'Kathir Engineering College': 'Coimbatore',
  'Kumaraguru College of Technology': 'Coimbatore',
  'Loyola College': 'Chennai',
  'MAM College of Engineering': 'Tiruchirappalli',
  'Mahendra Engineering College': 'Namakkal',
  'Nehru Institute of Engineering and Technology': 'Coimbatore',
  'Oxford Engineering College': 'Tiruchirappalli',
  'PES University': 'Bengaluru',
  'PPG Institute of Technology': 'Coimbatore',
  'PSG College of Technology': 'Coimbatore',
  'Paavai Institutions': 'Namakkal',
  'R P Sarathy Institute of Technology': 'Salem',
  'REVA University': 'Bengaluru',
  'RV University': 'Bengaluru',
  'RVS College of Engineering and Technology': 'Coimbatore',
  'Ramaiah Institute of Technology': 'Bengaluru',
  'Rathinam Technical Campus': 'Coimbatore',
  'SASTRA Deemed Uiversity': 'Thanjavur',
  'SRM Institute of Science and Technology': 'Chennai',
  'Sathyabama Institute of Science and Technology': 'Chennai',
  'Saveetha Engineering College': 'Chennai',
  'Selvam College of Technology': 'Namakkal',
  'Sona College of Technology': 'Salem',
  'Sree Sakthi Engineering College': 'Coimbatore',
  'Sri Balaji Chockalingam Engineering College': 'Arni',
  'Sri Krishna College of Engineering and Technology': 'Coimbatore',
  'Study World College of Engineering': 'Coimbatore',
  'VSB Engineering College': 'Karur',
  'Vel Tech Rangarajan Dr.Sagunthala R&D Institute of Science and Technology': 'Chennai',
  'Vellore Institute of Technology': 'Vellore',
  'Vels Institute of Science, Technology & Advanced Studies': 'Chennai',
  'Vinayaka Mission Engineering College': 'Salem',
}

// Helper to extract clean college name from path
function extractCollegeName(path) {
  const filenameWithExt = path.split('/').pop() || ''
  const nameWithoutExt = filenameWithExt.replace(/\.[^/.]+$/, '')
  // Strip trailing (1), (2), etc.
  return nameWithoutExt.replace(/\(\d+\)$/, '').trim()
}

// Helper to parse asset map into college list
function parseAssetsToColleges(assetModules, regionName, stateName) {
  const seenNames = new Set()
  const list = []
  const isEng = regionName === 'Engineering'

  for (const [path, imageSrc] of Object.entries(assetModules)) {
    const rawName = extractCollegeName(path)
    if (!rawName || seenNames.has(rawName.toLowerCase())) continue
    seenNames.add(rawName.toLowerCase())

    const id = `${regionName.toLowerCase()}-${rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
    const city = cityMap[rawName] || stateName

    list.push({
      id,
      name: rawName,
      region: regionName,
      state: stateName,
      city,
      country: 'India',
      category: isEng ? 'Engineering' : 'Medical',
      type: isEng ? 'Engineering & Technology Institute' : 'Medical College & Hospital',
      accreditation: isEng ? 'AICTE Approved & NAAC / NBA Accredited' : 'NMC & WHO Recognized',
      categories: isEng ? ['Undergraduate', 'Postgraduate', 'Engineering'] : ['Undergraduate', 'Postgraduate', 'Medical'],
      popularCourses: isEng
        ? ['B.E. / B.Tech (CSE, AI & DS, ECE, Mech)', 'M.E. / M.Tech', 'MBA / MCA', 'Integrated B.Tech']
        : ['MBBS', 'MD / MS Specializations', 'Allied Health Sciences', 'B.Sc Nursing'],
      description: isEng
        ? `Premier engineering and technology institution in ${city} equipped with modern laboratories, industry partnerships, and advanced campus infrastructure.`
        : `Premier medical institution in ${city}, ${stateName} equipped with advanced clinical infrastructure, multi-specialty teaching hospital, and experienced faculty.`,
      overview: `${rawName} is a prestigious ${isEng ? 'engineering and technical' : 'medical education and healthcare'} institution, offering world-class learning spaces, research centers, and career-driven training.`,
      facilities: isEng
        ? [
            'Advanced Computing & AI Research Labs',
            'Robotics, IoT & Innovation Centres',
            'Central Digital & Technical Library',
            'Air-Conditioned Smart Classrooms',
            'Separate Boys & Girls Hostels with Mess',
            'Industry Centre of Excellence & Placement Cell',
          ]
        : [
            'Multi-Specialty Teaching Hospital',
            'Modern Clinical Simulation Labs',
            'Central Digital & Physical Library',
            'Air-Conditioned Smart Lecture Halls',
            'Separate Boys & Girls Hostels with Mess',
            '24/7 Emergency & Critical Care Training',
          ],
      admission: isEng
        ? `Admissions to B.E./B.Tech and PG engineering programs at ${rawName} are conducted through TNEA/CET counselling, State quota rounds, and Management/NRI quota guidance. Sri Vaari Educational Counselling provides complete support.`
        : `Admissions to MBBS and PG Medical programs at ${rawName} are conducted through NEET counselling, State quota rounds, and Management/NRI quota guidance. Sri Vaari Educational Counselling provides complete guidance.`,
      eligibility: isEng
        ? '10+2 with Physics, Mathematics & Chemistry (min. 45% aggregate for General, 40% for Reserved categories) / State CET / JEE Score.'
        : '10+2 with Physics, Chemistry, Biology & English (min. 50% aggregate for General, 40% for Reserved categories) + Valid NEET UG Score.',
      placements: isEng
        ? [
            'Dedicated Placement Cell with Top Tier-1 Tech MNCs & Core Companies',
            'Paid Industry Internships, Hackathons & Capstone Projects',
            'Global Research and Development Opportunities',
            'Higher Studies & GATE / GRE Career Mentorship',
          ]
        : [
            'Compulsory 1-Year Paid Rotatory Internship in Super-Specialty Hospital',
            'USMLE, PLAB & PG NEET Preparation Workshops',
            'Global Clinical Observership Opportunities',
            'Hospital Placement & Career Guidance Cell',
          ],
      image: imageSrc,
      faqs: commonFaqs,
    })
  }

  return list
}

// Build collections from assets
export const tamilnaduColleges = parseAssetsToColleges(tnAssetModules, 'Tamilnadu', 'Tamil Nadu')
export const karnatakaColleges = parseAssetsToColleges(kaAssetModules, 'Karnataka', 'Karnataka')
export const puducherryColleges = parseAssetsToColleges(pyAssetModules, 'Puducherry', 'Puducherry')
export const engineeringColleges = parseAssetsToColleges(engAssetModules, 'Engineering', 'Engineering')

// Curated 7 Study Abroad Destinations with Country Flags
export const abroadColleges = [
  {
    id: 'abroad-russia',
    name: 'Russia',
    region: 'Abroad',
    country: 'Russia',
    category: 'Medical',
    city: 'Moscow / Kazan / Saint Petersburg',
    type: 'Top Medical Destination',
    accreditation: 'NMC & WHO Recognized Universities',
    popularCourses: ['General Medicine (MBBS / MD)', 'Dentistry', 'Pediatrics'],
    description: 'Premier Russian medical universities with globally accepted English-medium degrees and modern clinical hospital networks.',
    image: 'https://flagcdn.com/w320/ru.png',
    faqs: commonFaqs,
  },
  {
    id: 'abroad-georgia',
    name: 'Georgia',
    region: 'Abroad',
    country: 'Georgia',
    category: 'Medical',
    city: 'Tbilisi / Batumi',
    type: 'European Standard Medical Education',
    accreditation: 'WFME, WHO & NMC Approved',
    popularCourses: ['Medical Doctor (MD / MBBS)', 'Dentistry', 'Pharmacy'],
    description: 'High-quality European curriculum, safe environment, and 100% English-medium medical programs.',
    image: 'https://flagcdn.com/w320/ge.png',
    faqs: commonFaqs,
  },
  {
    id: 'abroad-uzbekistan',
    name: 'Uzbekistan',
    region: 'Abroad',
    country: 'Uzbekistan',
    category: 'Medical',
    city: 'Tashkent / Samarkand / Bukhara',
    type: 'Government Medical Universities',
    accreditation: 'WHO & NMC Recognized',
    popularCourses: ['General Medicine (MBBS)', 'Dentistry', 'Pediatrics'],
    description: 'Affordable tuition, advanced clinical simulation centers, direct flights, and dedicated Indian hostel & food facilities.',
    image: 'https://flagcdn.com/w320/uz.png',
    faqs: commonFaqs,
  },
  {
    id: 'abroad-kazakhstan',
    name: 'Kazakhstan',
    region: 'Abroad',
    country: 'Kazakhstan',
    category: 'Medical',
    city: 'Almaty / Astana / Shymkent',
    type: 'National Medical Universities',
    accreditation: 'NMC, WHO & Ministry of Health Approved',
    popularCourses: ['General Medicine (MBBS)', 'Pediatrics', 'Pharmacy'],
    description: '5-year MBBS programs with practical clinical training, low fees, and strong NEXT/FMGE passing track record.',
    image: 'https://flagcdn.com/w320/kz.png',
    faqs: commonFaqs,
  },
  {
    id: 'abroad-kyrgyzstan',
    name: 'Kyrgyzstan',
    region: 'Abroad',
    country: 'Kyrgyzstan',
    category: 'Medical',
    city: 'Bishkek / Osh / Jalal-Abad',
    type: 'Government Medical Academies',
    accreditation: 'WHO, NMC & FAIMER Recognized',
    popularCourses: ['General Medicine (MBBS)', 'Pediatrics', 'Dentistry'],
    description: 'Over 80 years of medical teaching history, economical fee structure, and vibrant community of Indian medical students.',
    image: 'https://flagcdn.com/w320/kg.png',
    faqs: commonFaqs,
  },
  {
    id: 'abroad-tajikistan',
    name: 'Tajikistan',
    region: 'Abroad',
    country: 'Tajikistan',
    category: 'Medical',
    city: 'Dushanbe / Khujand',
    type: 'State Medical Universities',
    accreditation: 'WHO, NMC & UNESCO Recognized',
    popularCourses: ['General Medicine (MBBS)', 'Dentistry', 'Preventive Medicine'],
    description: 'Rapidly emerging MBBS destination offering affordable living expenses, peaceful surroundings, and quality medical education.',
    image: 'https://flagcdn.com/w320/tj.png',
    faqs: commonFaqs,
  },
  {
    id: 'abroad-philippines',
    name: 'Philippines',
    region: 'Abroad',
    country: 'Philippines',
    category: 'Medical',
    city: 'Manila / Davao / Cebu',
    type: 'American Curriculum Medical Colleges',
    accreditation: 'WHO, NMC, ECFMG & USMLE Aligned',
    popularCourses: ['Doctor of Medicine (MD / MBBS)', 'BS Biology Pre-Med'],
    description: 'Top-tier English proficiency, American pattern medical education, and unmatched clinical disease exposure with high USMLE/FMGE success.',
    image: 'https://flagcdn.com/w320/ph.png',
    faqs: commonFaqs,
  },
]

// All Medical Colleges combined
export const medicalColleges = [
  ...tamilnaduColleges,
  ...puducherryColleges,
  ...karnatakaColleges,
  ...abroadColleges,
]

// All colleges combined
export const colleges = [
  ...medicalColleges,
  ...engineeringColleges,
]

export const collegesByRegion = {
  Tamilnadu: tamilnaduColleges,
  Puducherry: puducherryColleges,
  Karnataka: karnatakaColleges,
  Abroad: abroadColleges,
  Engineering: engineeringColleges,
}

// Medical sub-navigation tabs (Tamil Nadu, Puducherry, Karnataka, Abroad)
export const medicalRegionTabs = [
  { key: 'Tamilnadu', label: 'Tamil Nadu', count: tamilnaduColleges.length, description: 'Top Medical & Healthcare Campuses in Tamil Nadu' },
  { key: 'Puducherry', label: 'Puducherry', count: puducherryColleges.length, description: 'Premier Medical Institutions in Union Territory of Puducherry' },
  { key: 'Karnataka', label: 'Karnataka', count: karnatakaColleges.length, description: 'Reputed Medical Universities & Colleges in Karnataka' },
  { key: 'Abroad', label: 'Abroad (MBBS)', count: abroadColleges.length, description: 'NMC & WHO Recognized Medical Universities Worldwide' },
]

// Primary stream/category navigation (Medical vs Engineering)
export const streamTabs = [
  { key: 'medical', label: 'Medical Colleges', count: medicalColleges.length, description: 'Leading Medical & Healthcare Colleges across TN, PY, KA & Abroad' },
  { key: 'engineering', label: 'Engineering Colleges', count: engineeringColleges.length, description: 'Premier Engineering & Technology Colleges & Universities' },
]

export const regionTabs = [
  ...medicalRegionTabs,
  { key: 'Engineering', label: 'Engineering', count: engineeringColleges.length, description: 'Premier Engineering & Technology Colleges & Universities' },
]

export const collegeFilterOptions = {
  cities: [...new Set(colleges.map((c) => c.city))],
  states: ['Tamil Nadu', 'Puducherry', 'Karnataka', 'Engineering', 'Abroad'],
  types: [...new Set(colleges.map((c) => c.type))],
  accreditations: [...new Set(colleges.map((c) => c.accreditation))],
  categories: [...new Set(colleges.flatMap((c) => c.categories))],
}
