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
  'SASTRA Deemed University': 'Thanjavur',
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
  'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology': 'Chennai',
  'Vellore Institute of Technology': 'Vellore',
  'Vels Institute of Science, Technology & Advanced Studies': 'Chennai',
  'Vinayaka Mission Engineering College': 'Salem',
}

// Engineering Sub-Category Classification Lists
export const deemedUniversityNames = [
  'AMET University',
  'Amrita Vishwa Vidyapeetham',
  'CHRIST University',
  'Dr. M.G.R. Educational and Research Institute',
  'Jain University',
  'SASTRA Deemed University',
  'SASTRA Deemed Uiversity',
  'Sathyabama Institute of Science and Technology',
  'SRM Institute of Science and Technology',
  'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
  'Vel Tech Rangarajan Dr.Sagunthala R&D Institute of Science and Technology',
  'Vels Institute of Science, Technology & Advanced Studies',
  'Vellore Institute of Technology',
  'Vinayaka Mission Engineering College',
]

export const universityNames = [
  'Alliance University',
  'Dayananda Sagar University',
  'PES University',
  'REVA University',
  'RV University',
]

function normalizeName(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

const deemedSet = new Set(deemedUniversityNames.map(normalizeName))
const universitySet = new Set(universityNames.map(normalizeName))

export function getEngineeringCategory(name) {
  const norm = normalizeName(name)
  if (deemedSet.has(norm)) return 'deemed'
  if (universitySet.has(norm)) return 'university'
  return 'autonomous'
}

function cleanDisplayName(rawName) {
  if (!rawName) return ''
  if (rawName === 'SASTRA Deemed Uiversity') return 'SASTRA Deemed University'
  if (rawName === 'Adithya institute of technology') return 'Adithya Institute of Technology'
  if (rawName === 'Vel Tech Rangarajan Dr.Sagunthala R&D Institute of Science and Technology') {
    return 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology'
  }
  return rawName
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

    const cleanName = cleanDisplayName(rawName)
    const enggCategory = isEng ? getEngineeringCategory(cleanName) : undefined

    let collegeType = isEng ? 'Engineering & Technology Institute' : 'Medical College & Hospital'
    let collegeAccreditation = isEng ? 'AICTE Approved & NAAC / NBA Accredited' : 'NMC & WHO Recognized'

    if (isEng) {
      if (enggCategory === 'autonomous') {
        collegeType = 'Autonomous Engineering College'
        collegeAccreditation = 'UGC Autonomous • AICTE Approved • NAAC / NBA'
      } else if (enggCategory === 'deemed') {
        collegeType = 'Deemed-to-be University'
        collegeAccreditation = 'UGC Deemed University • NAAC A++ / A+'
      } else if (enggCategory === 'university') {
        collegeType = 'State / Private University'
        collegeAccreditation = 'State / Private University • AICTE Approved'
      }
    }

    const id = `${regionName.toLowerCase()}-${rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
    const city = cityMap[cleanName] || cityMap[rawName] || stateName

    list.push({
      id,
      name: cleanName,
      region: regionName,
      state: stateName,
      city,
      country: 'India',
      category: isEng ? 'Engineering' : 'Medical',
      engineeringCategory: enggCategory,
      type: collegeType,
      accreditation: collegeAccreditation,
      categories: isEng ? ['Undergraduate', 'Postgraduate', 'Engineering'] : ['Undergraduate', 'Postgraduate', 'Medical'],
      popularCourses: isEng
        ? ['B.E. / B.Tech (CSE, AI & DS, ECE, Mech)', 'M.E. / M.Tech', 'MBA / MCA', 'Integrated B.Tech']
        : ['MBBS', 'MD / MS Specializations', 'Allied Health Sciences', 'B.Sc Nursing'],
      description: isEng
        ? `Premier engineering and technology institution in ${city} equipped with modern laboratories, industry partnerships, and advanced campus infrastructure.`
        : `Premier medical institution in ${city}, ${stateName} equipped with advanced clinical infrastructure, multi-specialty teaching hospital, and experienced faculty.`,
      overview: `${cleanName} is a prestigious ${isEng ? 'engineering and technical' : 'medical education and healthcare'} institution, offering world-class learning spaces, research centers, and career-driven training.`,
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
        ? `Admissions to B.E./B.Tech and PG engineering programs at ${cleanName} are conducted through TNEA/CET counselling, State quota rounds, and Management/NRI quota guidance. Sri Vaari Educational Counselling provides complete support.`
        : `Admissions to MBBS and PG Medical programs at ${cleanName} are conducted through NEET counselling, State quota rounds, and Management/NRI quota guidance. Sri Vaari Educational Counselling provides complete guidance.`,
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

  list.sort((a, b) => a.name.localeCompare(b.name))
  return list
}

// Build collections from assets
export const tamilnaduColleges = parseAssetsToColleges(tnAssetModules, 'Tamilnadu', 'Tamil Nadu')
export const karnatakaColleges = parseAssetsToColleges(kaAssetModules, 'Karnataka', 'Karnataka')
export const puducherryColleges = parseAssetsToColleges(pyAssetModules, 'Puducherry', 'Puducherry')
export const engineeringColleges = parseAssetsToColleges(engAssetModules, 'Engineering', 'Engineering')

// Curated 7 Study Abroad Destinations with Country Flags & Comprehensive Details
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
    skylineImage: '/images/abroad/russia.jpg',
    bannerImage: '/images/abroad/russia.jpg',
    bannerTitle: 'TOP MEDICAL UNIVERSITIES IN RUSSIA (MBBS / MD)',
    landmark: "Red Square & Saint Basil's Cathedral, Moscow",
    overview: 'Russia is one of the most popular places for students who want to get an international education with approximately 180,000 international students every year. A lot of the universities in Russia are recognized worldwide which means students from all over the world are flocking to Russia to get an education that will benefit them in the future. The largest international student populations are mainly in Moscow, Saint Petersburg, Kazan, Novosibirsk, and Kursk.',
    quickFacts: 'The Russian Federation spans Eastern Europe and Northern Asia across eleven time zones. Russian government medical universities maintain an optimal 1:10 student-to-faculty ratio, subsidized state healthcare facilities, comfortable campus hostels with dedicated Indian mess facilities, and convenient direct flights connecting major Indian cities.',
    particulars: [
      { label: 'Course Name', value: 'MBBS in Russia' },
      { label: 'Degree Equivalent', value: 'MD (Doctor of Medicine / Physician)' },
      { label: 'Course Duration', value: '5.8 to 6 years' },
      { label: 'Residency Duration', value: '1 year compulsory rotatory clinical internship' },
      { label: 'Academic Requirements', value: '10+2 with minimum 50% in PCB (40% for Reserved categories) & NEET UG clearance' },
      { label: 'Recognition', value: 'NMC | WHO | WFME | FAIMER | ECFMG' },
      { label: 'Entrance Test Required', value: 'NEET UG Qualified (No IELTS or TOEFL required)' },
      { label: 'Top Universities', value: 'Kazan Federal University, Bashkir State Medical University, Crimea Federal University, I.M. Sechenov First Moscow State Medical University' },
      { label: 'Average Tuition Fee', value: 'INR 18 Lakhs to 32 Lakhs (Entire 6-Year Course)' },
      { label: 'Average Annual Living Cost', value: 'INR 1.2 Lakhs to 1.8 Lakhs per year' },
      { label: 'Travel Distance', value: '4,300 kilometres (~6 hours direct flight from Delhi)' },
    ],
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
    skylineImage: '/images/abroad/georgia.jpg',
    bannerImage: '/images/abroad/georgia.jpg',
    bannerTitle: 'TOP MEDICAL UNIVERSITIES IN GEORGIA (MBBS / MD)',
    landmark: 'Narikala Fortress & Old Town, Tbilisi',
    overview: 'Georgia has emerged as a premier European medical education hub for Indian students, combining rigorous European clinical curricula with safe, modern living standards. Medical academies in Georgia follow the European Credit Transfer System (ECTS) and are aligned with USMLE and WFME standards. With a peaceful atmosphere, warm hospitality, and 100% English-medium instruction, Georgia attracts thousands of ambitious doctors every year.',
    quickFacts: 'Georgia is situated at the intersection of Eastern Europe and Western Asia, bordered by the Black Sea. Ranked among the top 10 safest nations in the world for international scholars, popular university hubs like Tbilisi and Batumi offer vibrant Indian student associations, Indian dining facilities, and seamless visa processing.',
    particulars: [
      { label: 'Course Name', value: 'MBBS / MD in Georgia' },
      { label: 'Degree Equivalent', value: 'MD (Medical Doctor - equivalent to MBBS in India & Europe)' },
      { label: 'Course Duration', value: '6 years (integrated clinical rotations included)' },
      { label: 'Residency Duration', value: '1 year rotatory hospital internship included in curriculum' },
      { label: 'Academic Requirements', value: 'Minimum 50% in Physics, Chemistry, Biology in 10+2 & NEET UG qualification' },
      { label: 'Recognition', value: 'WFME | WHO | NMC | FAIMER | ECFMG' },
      { label: 'Entrance Test Required', value: 'NEET UG Qualified (Direct admission without IELTS / TOEFL)' },
      { label: 'Top Universities', value: 'Tbilisi State Medical University, Batumi Shota Rustaveli State University, New Vision University, David Tvildiani Medical University' },
      { label: 'Average Tuition Fee', value: 'INR 22 Lakhs to 38 Lakhs (Total 6-Year Program)' },
      { label: 'Average Annual Living Cost', value: 'INR 1.8 Lakhs to 2.4 Lakhs per year' },
      { label: 'Travel Distance', value: '3,800 kilometres (~5.5 hours flight duration)' },
    ],
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
    skylineImage: '/images/abroad/uzbekistan.jpg',
    bannerImage: '/images/abroad/uzbekistan.jpg',
    bannerTitle: 'TOP MEDICAL UNIVERSITIES IN UZBEKISTAN (MBBS / MD)',
    landmark: 'Registan Square & Turquoise Domes, Samarkand',
    overview: 'Uzbekistan has rapidly become one of the most preferred destinations for Indian medical aspirants seeking an NMC-compliant 5+1 year MBBS program with unmatched affordability and proximity to India. National medical universities in Uzbekistan combine centuries-old academic traditions with modern multi-specialty teaching hospitals, digital anatomy labs, and dedicated Indian mentors providing FMGE/NEXT guidance.',
    quickFacts: 'Uzbekistan is a historic Central Asian nation famous for the Silk Road, divided into 12 provinces and the autonomous Republic of Karakalpakstan. With direct 3-hour flights from Delhi to Tashkent, affordable flight fares, low living costs, and dedicated Indian hostel mess setups serving authentic vegetarian and non-vegetarian food, Uzbekistan feels like a second home.',
    particulars: [
      { label: 'Course Name', value: 'MBBS in Uzbekistan' },
      { label: 'Degree Equivalent', value: 'MD (Doctor of Medicine - Physician / MBBS Equivalent)' },
      { label: 'Course Duration', value: '5 years academic & hospital training + 1 year internship' },
      { label: 'Residency Duration', value: '1 year clinical internship in affiliated state teaching hospitals' },
      { label: 'Academic Requirements', value: 'Minimum 50% in 10+2 (PCB) for General, 40% for Reserved categories + Valid NEET' },
      { label: 'Recognition', value: 'NMC | WHO | Ministry of Higher Education of Uzbekistan | FAIMER' },
      { label: 'Entrance Test Required', value: 'NEET UG Qualified (No entrance exams like IELTS / TOEFL)' },
      { label: 'Top Universities', value: 'Tashkent Medical Academy, Samarkand State Medical University, Bukhara State Medical Institute, Andijan State Medical Institute' },
      { label: 'Average Tuition Fee', value: 'INR 14 Lakhs to 20 Lakhs (Complete 5-Year Tuition)' },
      { label: 'Average Annual Living Cost', value: 'INR 1.0 Lakhs to 1.5 Lakhs per year (including Indian hostel & food)' },
      { label: 'Travel Distance', value: '2,050 kilometres (~3 hours direct flight from Delhi)' },
    ],
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
    skylineImage: '/images/abroad/kazakhstan.jpg',
    bannerImage: '/images/abroad/kazakhstan.jpg',
    bannerTitle: 'TOP MEDICAL UNIVERSITIES IN KAZAKHSTAN (MBBS / MD)',
    landmark: 'Bayterek Monument & Astana Skyline',
    overview: 'Kazakhstan stands out as a leading destination in Central Asia offering government-accredited 5-year MBBS programs designed strictly per latest NMC guidelines. Equipped with cutting-edge robotic simulation centers, advanced diagnostic labs, and international partnerships with European universities, Kazakh medical academies ensure comprehensive clinical exposure in high-volume tertiary care hospitals.',
    quickFacts: 'Kazakhstan is the largest landlocked country in the world, spanning 14 administrative regions and modern metropolitan centers including Almaty and Astana. The nation enjoys economic stability, a high standard of student safety, well-established international student support cells, and Indian hostels operating directly inside the university campuses.',
    particulars: [
      { label: 'Course Name', value: 'MBBS in Kazakhstan' },
      { label: 'Degree Equivalent', value: 'MD (General Medicine / Physician - MBBS Equivalent)' },
      { label: 'Course Duration', value: '5 years + 1 year compulsory clinical internship' },
      { label: 'Residency Duration', value: '1 year supervised rotatory internship' },
      { label: 'Academic Requirements', value: '10+2 with 50% aggregate in Physics, Chemistry, Biology & valid NEET clearance' },
      { label: 'Recognition', value: 'NMC | WHO | WFME | FAIMER | UNESCO' },
      { label: 'Entrance Test Required', value: 'NEET UG Qualified (Direct admission through Sri Vaari guidance)' },
      { label: 'Top Universities', value: 'Kazakh National Medical University, Semey State Medical University, West Kazakhstan Marat Ospanov Medical University, Astana Medical University' },
      { label: 'Average Tuition Fee', value: 'INR 15 Lakhs to 24 Lakhs (Total 5-Year Program)' },
      { label: 'Average Annual Living Cost', value: 'INR 1.2 Lakhs to 1.8 Lakhs per year' },
      { label: 'Travel Distance', value: '2,400 kilometres (~3.5 hours direct flight)' },
    ],
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
    skylineImage: '/images/abroad/kyrgyzstan.jpg',
    bannerImage: '/images/abroad/kyrgyzstan.jpg',
    bannerTitle: 'TOP MEDICAL UNIVERSITIES IN KYRGYZSTAN (MBBS / MD)',
    landmark: 'Ala-Archa & Tian Shan Mountains, Bishkek',
    overview: 'Kyrgyzstan has been a trusted study destination for Indian medical aspirants for over three decades. Government medical institutions in Kyrgyzstan offer economical 5-year MBBS courses taught completely in English, combined with rigorous practical bedside training in major municipal and regional hospitals. Over 15,000 Indian doctors practicing today have graduated from Kyrgyz medical academies.',
    quickFacts: 'Located in the heart of Central Asia amidst the picturesque Tian Shan mountain range, Kyrgyzstan comprises seven provinces and two independent cities (Bishkek and Osh). It offers mild weather, cost-effective living, active Indian student associations, celebrated Indian festivals on campus, and dedicated Indian mess chefs.',
    particulars: [
      { label: 'Course Name', value: 'MBBS in Kyrgyzstan' },
      { label: 'Degree Equivalent', value: 'MD (Physician / MBBS Equivalent Degree)' },
      { label: 'Course Duration', value: '5 years academic & clinical course + 1 year internship' },
      { label: 'Residency Duration', value: '1 year rotatory clinical internship in multi-specialty hospitals' },
      { label: 'Academic Requirements', value: 'Minimum 50% in PCB in 12th standard (40% for Reserved categories) & NEET UG pass' },
      { label: 'Recognition', value: 'NMC | WHO | FAIMER | IMED | Ministry of Health of Kyrgyzstan' },
      { label: 'Entrance Test Required', value: 'NEET UG Qualified (No language test requirement)' },
      { label: 'Top Universities', value: 'Kyrgyz State Medical Academy, Osh State University Medical Faculty, International School of Medicine (ISM), Jalal-Abad State University' },
      { label: 'Average Tuition Fee', value: 'INR 12 Lakhs to 18 Lakhs (Complete Course Package)' },
      { label: 'Average Annual Living Cost', value: 'INR 1.0 Lakhs to 1.4 Lakhs per year' },
      { label: 'Travel Distance', value: '2,200 kilometres (~3.5 hours flight duration)' },
    ],
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
    skylineImage: '/images/abroad/tajikistan.jpg',
    bannerImage: '/images/abroad/tajikistan.jpg',
    bannerTitle: 'TOP MEDICAL UNIVERSITIES IN TAJIKISTAN (MBBS / MD)',
    landmark: 'Ismail Somoni Monument & Rudaki Park, Dushanbe',
    overview: 'Tajikistan is a peaceful, welcoming Central Asian nation offering government-recognized MBBS education that emphasizes preventive medicine, diagnostic pathology, and clinical surgery. The state medical universities feature newly modernized infrastructure, international student departments, and affordable fee structures, making medical education accessible to middle-class Indian families.',
    quickFacts: 'Tajikistan is situated in Central Asia, bordered by Kyrgyzstan, Uzbekistan, Afghanistan, and China, with the capital city Dushanbe serving as its academic center. It provides a peaceful and disciplined study environment, hospitable citizens, very low crime rates, and direct air links with Delhi.',
    particulars: [
      { label: 'Course Name', value: 'MBBS in Tajikistan' },
      { label: 'Degree Equivalent', value: 'MD (Doctor of Medicine / MBBS Equivalent)' },
      { label: 'Course Duration', value: '5 years + 1 year clinical rotatory internship' },
      { label: 'Residency Duration', value: '1 year clinical hospital internship' },
      { label: 'Academic Requirements', value: '10+2 with at least 50% in Physics, Chemistry, Biology + NEET qualified status' },
      { label: 'Recognition', value: 'WHO | NMC | UNESCO | Ministry of Education & Science of Tajikistan' },
      { label: 'Entrance Test Required', value: 'NEET UG Qualified' },
      { label: 'Top Universities', value: 'Avicenna Tajik State Medical University, Khatlon State Medical University, Tajik National University Medical Faculty' },
      { label: 'Average Tuition Fee', value: 'INR 14 Lakhs to 20 Lakhs (Entire 5-Year Program)' },
      { label: 'Average Annual Living Cost', value: 'INR 1.0 Lakhs to 1.5 Lakhs per year' },
      { label: 'Travel Distance', value: '2,300 kilometres (~3.5 hours direct flight)' },
    ],
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
    skylineImage: '/images/abroad/philippines.jpg',
    bannerImage: '/images/abroad/philippines.jpg',
    bannerTitle: 'TOP MEDICAL UNIVERSITIES IN PHILIPPINES (MBBS / MD)',
    landmark: 'Historic University Campus & Manila Skyline',
    overview: 'The Philippines is globally renowned for delivering American curriculum medical education (BS-MD program) with 100% English medium of instruction across all universities and hospitals. As the world\'s third-largest English-speaking nation, Indian students face zero language barriers while communicating with local patients during hospital rotations. It boasts high FMGE/NEXT passing percentages and prepares students exceptionally well for USMLE and clinical practice in the USA, UK, and India.',
    quickFacts: 'The Philippines is an archipelagic island nation in Southeast Asia comprising over 7,000 islands, with major educational centers in Metro Manila, Davao, and Cebu. Its medical curriculum matches US standards, featuring hands-on clinical clerkships in 1,000+ bed hospitals dealing with tropical disease patterns identical to India.',
    particulars: [
      { label: 'Course Name', value: 'BS-MD / MBBS in Philippines' },
      { label: 'Degree Equivalent', value: 'Doctor of Medicine (MD - Equivalent to MBBS in India & USA)' },
      { label: 'Course Duration', value: '5.5 years (Pre-Med BS + 4-Year MD including 12 months clinical clerkship)' },
      { label: 'Residency Duration', value: '1 year compulsory rotatory clinical clerkship' },
      { label: 'Academic Requirements', value: '10+2 with minimum 50% in Physics, Chemistry, Biology + Qualified NEET score' },
      { label: 'Recognition', value: 'NMC | WHO | ECFMG | USMLE | FAIMER | WFME' },
      { label: 'Entrance Test Required', value: 'NEET UG Qualified (NMAT exam conducted during pre-med)' },
      { label: 'Top Universities', value: 'Davao Medical School Foundation (DMSF), University of Perpetual Help System DALTA, UV Gullas College of Medicine, Our Lady of Fatima University' },
      { label: 'Average Tuition Fee', value: 'INR 16 Lakhs to 28 Lakhs (Complete BS-MD Course)' },
      { label: 'Average Annual Living Cost', value: 'INR 1.5 Lakhs to 2.2 Lakhs per year (Indian hostels available)' },
      { label: 'Travel Distance', value: '4,800 kilometres (~6 to 7 hours flight duration)' },
    ],
    faqs: commonFaqs,
  },
]

// All Medical Colleges combined (Tamil Nadu, Puducherry, Karnataka)
export const medicalColleges = [
  ...tamilnaduColleges,
  ...puducherryColleges,
  ...karnatakaColleges,
]

// All colleges combined
export const colleges = [
  ...medicalColleges,
  ...abroadColleges,
  ...engineeringColleges,
]

export const collegesByRegion = {
  Tamilnadu: tamilnaduColleges,
  Puducherry: puducherryColleges,
  Karnataka: karnatakaColleges,
  Abroad: abroadColleges,
  Engineering: engineeringColleges,
}

// Medical sub-navigation tabs (Tamil Nadu, Puducherry, Karnataka)
export const medicalRegionTabs = [
  { key: 'Tamilnadu', label: 'Tamil Nadu', count: tamilnaduColleges.length, description: 'Top Medical & Healthcare Campuses in Tamil Nadu' },
  { key: 'Puducherry', label: 'Puducherry', count: puducherryColleges.length, description: 'Premier Medical Institutions in Union Territory of Puducherry' },
  { key: 'Karnataka', label: 'Karnataka', count: karnatakaColleges.length, description: 'Reputed Medical Universities & Colleges in Karnataka' },
]

// Engineering Sub-Category Collections
export const engineeringAutonomousColleges = engineeringColleges.filter(
  (c) => c.engineeringCategory === 'autonomous'
)
export const engineeringDeemedColleges = engineeringColleges.filter(
  (c) => c.engineeringCategory === 'deemed'
)
export const engineeringUniversityColleges = engineeringColleges.filter(
  (c) => c.engineeringCategory === 'university'
)

// Engineering sub-navigation tabs (Autonomous Colleges, Deemed Universities, Universities)
export const engineeringCategoryTabs = [
  {
    key: 'autonomous',
    label: 'Autonomous Colleges',
    count: engineeringAutonomousColleges.length,
    description: 'Premier UGC & State Accredited Autonomous Engineering Colleges',
  },
  {
    key: 'deemed',
    label: 'Deemed Universities',
    count: engineeringDeemedColleges.length,
    description: 'Renowned Deemed-to-be Universities with Advanced Research Facilities',
  },
  {
    key: 'university',
    label: 'Universities',
    count: engineeringUniversityColleges.length,
    description: 'Premier Technical State & Private Universities',
  },
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

