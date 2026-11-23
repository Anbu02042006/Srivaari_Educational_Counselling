/**
 * Distance Mode Education Course Data
 * Sri Vaari Educational Counselling
 */

export const distanceUniversities = [
  {
    id: 'alagappa-university',
    name: 'Alagappa University',
    shortName: 'Alagappa University',
    image: '/images/universities/alagappa.png',
    accreditation: 'NAAC A+ Grade (CGPA 3.64) | Category-I University | UGC-DEB Approved',
    location: 'Karaikudi, Tamil Nadu',
    highlight: 'Premier state university offering comprehensive UG, PG, and Professional Diploma programs with modern online student support.',
    popularCourses: ['B.Com', 'BBA', 'BCA', 'MBA (Dual Spec)', 'M.Sc Computer Science', 'M.Com'],
  },
  {
    id: 'manonmaniam-sundaranar-university',
    name: 'Manonmaniam Sundaranar University',
    shortName: 'Manonmaniam Sundaranar University',
    image: '/images/universities/manonmaniam.jpeg',
    accreditation: 'NAAC A Grade | UGC-DEB Approved State University',
    location: 'Tirunelveli, Tamil Nadu',
    highlight: 'Distinguished government state university offering flexible arts, science, commerce, management, and IT distance degree tracks.',
    popularCourses: ['B.A Tamil / English', 'B.Sc Mathematics', 'B.Com', 'M.A', 'MBA', 'MCA', 'PGDCA'],
  },
  {
    id: 'bharathidasan-university',
    name: 'Bharathidasan University',
    shortName: 'Bharathidasan University',
    image: '/images/universities/bharathidasan.png',
    accreditation: 'NAAC A+ Grade | NIRF Top State University | UGC-DEB Approved',
    location: 'Tiruchirappalli (Trichy), Tamil Nadu',
    highlight: 'Acclaimed center for distance & online education with high academic standards, prompt exam schedules, and extensive study centers.',
    popularCourses: ['B.Com (CA)', 'B.Sc IT', 'BBA', 'M.Com', 'M.Sc IT', 'MBA Financial / HR Management'],
  },
]

export const distanceCourseCards = [
  {
    id: 'ug-programmes',
    title: 'UG PROGRAMMES',
    theme: 'green',
    layout: 'two-column',
    columns: [
      [
        'B.A. Tamil',
        'B.A. English',
        'B.A. History',
        'B.A. Economics',
        'B.A. Political Science',
        'B.A. Public Administration',
      ],
      [
        'B.Sc. Mathematics',
        'B.Sc. Physics',
        'B.Sc. Chemistry',
        'B.Sc. Botany',
        'B.Sc. Zoology',
        'B.Sc. Computer Science',
        'B.Com',
        'B.B.A. (Bachelor of Business Administration)',
        'B.C.A. (Bachelor of Computer Applications)',
      ],
    ],
    watermark: 'graduation-cap',
  },
  {
    id: 'pg-programmes',
    title: 'PG PROGRAMMES',
    theme: 'red',
    layout: 'two-column',
    columns: [
      [
        'M.A. Tamil',
        'M.A. English',
        'M.A. History',
        'M.A. Economics',
        'M.A. Political Science',
        'M.A. Public Administration',
        'M.Sc. Mathematics',
        'M.Sc. Physics',
        'M.Sc. Chemistry',
      ],
      [
        'M.Sc. Botany',
        'M.Sc. Zoology',
        'M.Sc. Computer Science',
        'M.Sc. Geography',
        'M.Sc. Information Technology',
        'M.Com (Master of Commerce)',
        'M.L.I.Sc (Master of Library & Information Science)',
      ],
    ],
    watermark: 'award',
  },
  {
    id: 'mba-programmes',
    title: 'MBA PROGRAMMES',
    theme: 'blue',
    layout: 'single-column',
    columns: [
      [
        'MBA (General)',
        'MBA (Human Resource Management)',
        'MBA (Marketing Management)',
        'MBA (Financial Management)',
        'MBA (International Business)',
        'MBA (Operations Management)',
        'MBA (Hospital Management)',
        'MBA (Logistics & Supply Chain Management)',
        'MBA (Project Management)',
      ],
    ],
    watermark: 'trending-up',
  },
  {
    id: 'bed-programmes',
    title: 'B.Ed. PROGRAMMES',
    theme: 'purple',
    layout: 'single-column',
    columns: [
      [
        'B.Ed. (Bachelor of Education)',
        'B.Ed. - Tamil',
        'B.Ed. - English',
        'B.Ed. - Mathematics',
        'B.Ed. - Physical Science',
        'B.Ed. - Biological Science',
        'B.Ed. - History',
        'B.Ed. - Commerce',
        'B.Ed. - Computer Science',
      ],
    ],
    watermark: 'book-open',
  },
  {
    id: 'mca-programmes',
    title: 'MCA PROGRAMMES',
    theme: 'teal',
    layout: 'single-column',
    columns: [
      [
        'MCA. (Master of Computer Applications)',
        'MCA - Data Science',
        'MCA - Artificial Intelligence',
        'MCA - Cyber Security',
        'MCA - Software Development',
      ],
    ],
    watermark: 'code',
  },
]

export const distancePrograms = {
  ug: {
    category: 'Undergraduate Degrees (UG)',
    duration: '3 Years (6 Semesters / Annual)',
    eligibility: 'Pass in 10+2 / 12th Standard / 3-Year Polytechnic Diploma (Any recognized board)',
    courses: [
      {
        name: 'B.Com (Bachelor of Commerce)',
        specializations: ['General', 'Computer Applications', 'Corporate Secretaryship', 'Banking & Finance'],
        desc: 'Ideal for careers in accounting, taxation, auditing, banking, and commerce fields.',
      },
      {
        name: 'B.B.A (Bachelor of Business Administration)',
        specializations: ['General Management', 'Marketing', 'Retail Management'],
        desc: 'Build foundational managerial acumen, entrepreneurial mindset, and corporate skills.',
      },
      {
        name: 'B.C.A (Bachelor of Computer Applications)',
        specializations: ['Software Engineering', 'Web Technologies', 'Database Systems'],
        desc: 'Hands-on curriculum in programming languages (C++, Java, Python), database administration, and software development.',
      },
      {
        name: 'B.Sc Computer Science / IT',
        specializations: ['Computer Science', 'Information Technology'],
        desc: 'Rigorous technical foundation in computing theory, networks, algorithms, and systems analysis.',
      },
      {
        name: 'B.A (Bachelor of Arts)',
        specializations: ['English Literature', 'Tamil Literature', 'History', 'Economics', 'Public Administration'],
        desc: 'Strong foundation for civil services examinations (UPSC / TNPSC), teaching, journalism, and public sector jobs.',
      },
      {
        name: 'B.Sc Mathematics',
        specializations: ['Applied Mathematics', 'Statistics'],
        desc: 'Quantitative reasoning, data analysis, and preparation for teaching and statistical roles.',
      },
      {
        name: 'B.Lib.I.Sc (Library & Information Science)',
        specializations: ['Digital Library Systems', 'Information Management (1-Year Program)'],
        desc: 'Specialized 1-year bachelor degree for library curators, educational institutes, and documentation centers.',
      },
    ],
  },
  pg: {
    category: 'Postgraduate Degrees (PG)',
    duration: '2 Years (4 Semesters / Annual)',
    eligibility: 'Any recognized Bachelor Degree (10+2+3 pattern)',
    courses: [
      {
        name: 'M.B.A (Master of Business Administration)',
        specializations: ['Human Resource Management', 'Financial Management', 'Marketing Management', 'Operations & Logistics', 'Hospital & Healthcare Management', 'Systems / IT'],
        desc: 'Premium UGC-DEB approved executive-grade MBA to accelerate career advancement and leadership roles.',
      },
      {
        name: 'M.C.A (Master of Computer Applications)',
        specializations: ['Enterprise Applications', 'Cloud Computing', 'Data Analytics'],
        desc: 'Advanced software design, database architecture, and computer applications for IT industry professionals.',
      },
      {
        name: 'M.Com (Master of Commerce)',
        specializations: ['Advanced Accounting & Finance', 'Co-operative Management'],
        desc: 'Comprehensive mastery of financial management, advanced corporate accounting, and business research.',
      },
      {
        name: 'M.Sc Computer Science / IT',
        specializations: ['Software Systems', 'Network Engineering', 'Data Science'],
        desc: 'In-depth specialization in advanced computational theory, artificial intelligence fundamentals, and system design.',
      },
      {
        name: 'M.A (Master of Arts)',
        specializations: ['English Literature', 'Tamil Literature', 'Economics', 'History', 'Journalism & Mass Communication'],
        desc: 'Advanced post-graduate humanities degrees valued for NET/SET exams, college professorships, and administrative services.',
      },
      {
        name: 'M.Sc Mathematics / Psychology',
        specializations: ['Pure & Applied Mathematics', 'Applied Psychology / Counselling'],
        desc: 'Rigorous postgraduate training for educators, analytical researchers, and professional student counsellors.',
      },
    ],
  },
  diploma: {
    category: 'Diploma & PG Diploma Programs',
    duration: '1 Year (Fast-Track Career Boost)',
    eligibility: '10+2 for Diploma / Graduation for PG Diploma',
    courses: [
      {
        name: 'PGDCA (PG Diploma in Computer Applications)',
        specializations: ['Software Applications', 'Web Office Automation'],
        desc: 'Widely recognized post-graduate qualification for government IT requirements and clerical posts.',
      },
      {
        name: 'PG Diploma in Logistics & Supply Chain Management',
        specializations: ['Warehouse Management', 'Freight & Shipping Operations'],
        desc: 'High-demand operational diploma for ports, logistics hubs, and e-commerce supply chains.',
      },
      {
        name: 'PG Diploma in Hospital & Healthcare Management',
        specializations: ['Clinic Administration', 'Healthcare Services Quality'],
        desc: 'Equips healthcare professionals and graduates for clinic management and hospital administrative roles.',
      },
      {
        name: 'PG Diploma in Human Resource Management (PGDHRM)',
        specializations: ['Talent Acquisition', 'Labor Laws & Industrial Relations'],
        desc: 'Focused curriculum on corporate recruitment, employee welfare, and HR compliance.',
      },
      {
        name: 'Diploma in Early Childhood Care & Education (DECE)',
        specializations: ['Montessori Methodologies', 'Child Development'],
        desc: 'Certified credential for preschool educators, day-care administrators, and kindergarten teachers.',
      },
      {
        name: 'Diploma in Yoga & Health Wellness',
        specializations: ['Therapeutic Yoga', 'Stress Management'],
        desc: 'Practical and theoretical certification in traditional yoga practices and health wellness.',
      },
    ],
  },
}

export const distanceBenefits = [
  {
    title: '100% UGC-DEB Approved',
    text: 'Every university and program recommended is officially recognized by UGC, AICTE, and DEB, making your degree valid for UPSC, TNPSC, Banking, State Govt jobs, and higher studies abroad.',
  },
  {
    title: 'Learn While You Earn',
    text: 'No need to pause your job or family duties. Study with comprehensive self-learning materials, weekend contact classes, and online student portals at your own pace.',
  },
  {
    title: 'No Age Barrier & Study Gap Accepted',
    text: 'Whether you paused your education 2 years ago or 15 years ago, distance mode allows smooth resumption without gap year penalties or age limitations.',
  },
  {
    title: 'Affordable Fees & Installments',
    text: 'Significantly lower tuition expenses compared to full-time on-campus programs, with easy semester-wise installment payment options.',
  },
  {
    title: 'Convenient Exam Centers',
    text: 'Exam centers located in all major district headquarters across Tamil Nadu, Karnataka, and South India for easy travel on exam days.',
  },
  {
    title: 'End-to-End Sri Vaari Support',
    text: 'From university selection and application verification to hall ticket alerts, study material coordination, and assignment submissions, we guide you at every single step.',
  },
]
