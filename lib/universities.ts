export interface University {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  founded: string;
  location: string;
  type: 'public' | 'private';
  colors: { primary: string; secondary: string; accent: string };
  logo: string;
  campusImage: string;
  heroImage: string;
  chantUrl: string;
  admissionsUrl: string;
  website: string;
  mapEmbedUrl: string;

  academics: {
    overview: string;
    qsRank: string;
    qsRankNumber: number | null;
    qsRegionalRank: string;
    tuitionRange: string;
    tuitionLabel: 'Low' | 'Medium' | 'High' | 'Premium';
    tuitionScore: number;
    scores: {
      academicReputation: number;
      programStrength: number;
      researchOutput: number;
      industryAlignment: number;
    };
    topPrograms: { name: string; strength: number }[];
    colleges: string[];
    strengths: string[];
  };

  sports: {
    overview: string;
    uaapTeams: string[];
    championships: {
      sport: string;
      count: number;
      recentYears: string[];
    }[];
    totalTitles: number;
    dominantSport: string;
    notable: string;
    mvpHistory: string;
  };

  studentLife: {
    overview: string;
    culture: string;
    organizations: string[];
    events: string[];
    mascot: string;
    schoolColor: string;
    fanBase: string;
  };

  achievements: string[];
  highlights: { icon: string; label: string; value: string }[];

  admissions: {
    steps: string[];
    requirements: string[];
    deadline: string;
    scholarshipNote: string;
  };
}

export const universities: University[] = [
  {
    slug: 'up',
    name: 'University of the Philippines',
    shortName: 'UP',
    tagline: 'Honor and Excellence',
    description:
      'The national university of the Philippines, UP stands as the premier state university dedicated to producing graduates of the highest quality and providing advanced and specialized instruction and professional training.',
    founded: '1908',
    location: 'Diliman, Quezon City',
    type: 'public',
    colors: { primary: '#7B1113', secondary: '#F2A900', accent: '#fff' },
    logo: '/assets/logos/up-logo.png',
    campusImage: '/assets/universities/up-campus.jpg',
    heroImage: '/assets/universities/up-hero.jpg',
    chantUrl: '/assets/audio/chants/up-chant.mp3',
    admissionsUrl: 'https://upd.edu.ph/admissions/',
    website: 'https://up.edu.ph',
    mapEmbedUrl: 'https://maps.google.com/maps?q=University+of+the+Philippines+Diliman&output=embed',
    academics: {
      overview:
        'UP is the country\'s premier research institution, known for producing world-class graduates in sciences, engineering, medicine, social sciences, and the arts. It consistently tops Philippine university rankings.',
      qsRank: '801–1000',
      qsRankNumber: 850,
      qsRegionalRank: 'Top 100 in Southeast Asia',
      tuitionRange: '₱1,500–₱3,000 / unit (subsidized)',
      tuitionLabel: 'Low',
      tuitionScore: 2,
      scores: {
        academicReputation: 10,
        programStrength: 9,
        researchOutput: 10,
        industryAlignment: 8,
      },
      topPrograms: [
        { name: 'Engineering & Technology', strength: 10 },
        { name: 'Medicine & Health Sciences', strength: 10 },
        { name: 'Social Sciences & Law', strength: 9 },
        { name: 'Natural Sciences', strength: 9 },
        { name: 'Arts & Humanities', strength: 8 },
      ],
      colleges: ['College of Engineering', 'College of Medicine', 'College of Law', 'College of Science', 'College of Social Sciences'],
      strengths: ['Research Excellence', 'Public Service', 'Academic Freedom', 'National Scholarship Programs', 'Graduate Studies'],
    },
    sports: {
      overview: 'UP Fighting Maroons are known for their resilient and gritty style of play, representing the spirit of the "iskolar ng bayan."',
      uaapTeams: ['Basketball', 'Volleyball', 'Football', 'Swim', 'Track & Field', 'Badminton', 'Chess'],
      championships: [
        { sport: 'Football', count: 6, recentYears: ['2021', '2022', '2024'] },
        { sport: 'Basketball', count: 2, recentYears: ['2022', '2023'] },
      ],
      totalTitles: 11,
      dominantSport: 'Football',
      notable: 'Back-to-back Basketball Champions 2022–2023 under coach Goldwin Monteverde',
      mvpHistory: 'Ricci Rivero (2019 Mythical Five), Zavier Lucero (2022–23 Finals MVP)',
    },
    studentLife: {
      overview: 'UP boasts a vibrant and politically active student community, known for its intellectual discourse, arts scene, and strong advocacy culture.',
      culture: 'Liberal, progressive, and deeply nationalistic. Known for its diverse student organizations, protests, and cultural festivals.',
      organizations: ['UP Repertory Company', 'UP Mountaineers', 'Alpha Phi Omega', 'UP Debate Society'],
      events: ['Lantern Parade', 'UP Fair', 'Oblation Run', 'Paskong UP'],
      mascot: 'Maroon Fighting Maroon',
      schoolColor: 'Maroon and Green',
      fanBase: 'The Iskolar ng Bayan crowd — passionate, intellectual, and vocal',
    },
    achievements: [
      'QS World University Rankings 801–1000',
      'No. 1 in Philippines in multiple ranking systems',
      'National University designation by Philippine Congress',
      'Home to multiple National Scientists and Artists',
      'UAAP Basketball Champions 2022 & 2023',
    ],
    highlights: [
      { icon: 'trophy', label: 'UAAP Titles', value: '11+' },
      { icon: 'grad', label: 'QS Rank', value: '801–1000' },
      { icon: 'book', label: 'Programs', value: '600+' },
      { icon: 'research', label: 'Research', value: '#1 PH' },
    ],
    admissions: {
      steps: [
        'Take the UPCAT (UP College Admission Test)',
        'Check results and receive your UPG (UP Grade)',
        'Apply to your chosen college/program',
        'Submit required documents',
        'Enroll upon acceptance',
      ],
      requirements: ['UPCAT result', 'High school report card', 'Birth certificate', 'Recommendation letter', '2x2 ID photo'],
      deadline: 'UPCAT is typically held in August–September',
      scholarshipNote: 'Full scholarship available via STFAP (Socialized Tuition & Financial Assistance Program) — free tuition for qualifying students.',
    },
  },
  {
    slug: 'ateneo',
    name: 'Ateneo de Manila University',
    shortName: 'ADMU',
    tagline: 'For Others',
    description:
      'A private Jesuit research university known for producing some of the Philippines\' most influential leaders, thinkers, and professionals. Famous for its UAAP Basketball dynasty.',
    founded: '1859',
    location: 'Loyola Heights, Quezon City',
    type: 'private',
    colors: { primary: '#003D8F', secondary: '#0070C0', accent: '#FFD700' },
    logo: '/assets/logos/ateneo-logo.png',
    campusImage: '/assets/universities/ateneo-campus.jpg',
    heroImage: '/assets/universities/ateneo-hero.jpg',
    chantUrl: '/assets/audio/chants/ateneo-chant.mp3',
    admissionsUrl: 'https://www.ateneo.edu/admissions',
    website: 'https://www.ateneo.edu',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Ateneo+de+Manila+University&output=embed',
    academics: {
      overview:
        'Ateneo is among the Philippines\' most prestigious private universities, excelling in business, humanities, social sciences, and law. Its Jesuit formation produces well-rounded, ethical leaders.',
      qsRank: '801–1000',
      qsRankNumber: 830,
      qsRegionalRank: 'Top 80 in Southeast Asia',
      tuitionRange: '₱80,000–₱120,000 / semester',
      tuitionLabel: 'Premium',
      tuitionScore: 9,
      scores: {
        academicReputation: 9,
        programStrength: 9,
        researchOutput: 8,
        industryAlignment: 9,
      },
      topPrograms: [
        { name: 'Business Administration', strength: 10 },
        { name: 'Law', strength: 9 },
        { name: 'Psychology', strength: 9 },
        { name: 'Humanities & Liberal Arts', strength: 9 },
        { name: 'Communication', strength: 8 },
      ],
      colleges: ['John Gokongwei School of Engineering', 'Ateneo Law School', 'Loyola Schools', 'Ateneo School of Government', 'Graduate School of Business'],
      strengths: ['Jesuit Formation', 'Leadership Development', 'Bar & Board Exam Performance', 'International Partnerships', 'Alumni Network'],
    },
    sports: {
      overview: 'The Blue Eagles are among the most storied programs in UAAP history, with a passionate fan base known as the "Blue Eagle Army."',
      uaapTeams: ['Basketball', 'Volleyball', 'Football', 'Swim', 'Track & Field', 'Cheerleading'],
      championships: [
        { sport: 'Basketball', count: 12, recentYears: ['2018', '2019', '2021', '2022'] },
        { sport: 'Volleyball', count: 5, recentYears: ['2016', '2017'] },
      ],
      totalTitles: 30,
      dominantSport: 'Basketball',
      notable: '4-peat UAAP Basketball Championship (2018–2022)',
      mvpHistory: 'Ange Kouamé (2019 MVP), Thirdy Ravena (multiple awards), Gian Mamuyac',
    },
    studentLife: {
      overview: 'Ateneo is known for its strong community spirit, rigorous academics, and vibrant campus life rooted in Jesuit values.',
      culture: 'Service-oriented, community-centered, and highly competitive academically. Known for the Blue Eagle pride and strong alumni bonds.',
      organizations: ['Ateneo Blue Eagles (Athletics)', 'Ateneo Student Government', 'Ateneo Debate Society', 'SANGGU (Student Government)'],
      events: ['UAAP Cheerdance', 'Ateneo High School Intrams', 'Blue Eagle Fan Fest', 'Ateneo Leadership Summit'],
      mascot: 'Blue Eagle',
      schoolColor: 'Blue and White',
      fanBase: 'Blue Eagle Army — among the loudest and most loyal in the UAAP',
    },
    achievements: [
      'QS World University Rankings 801–1000',
      '12 UAAP Basketball Championships',
      'Consistent top performer in Bar and Board Exams',
      'Forbes Asia: Among Top 50 Asian Universities',
      'Most influential alumni in Philippine politics and business',
    ],
    highlights: [
      { icon: 'eagle', label: 'Basketball Titles', value: '12' },
      { icon: 'grad', label: 'QS Rank', value: '801–1000' },
      { icon: 'law', label: 'Bar Topnotchers', value: 'Multiple' },
      { icon: 'globe', label: 'Global Partners', value: '100+' },
    ],
    admissions: {
      steps: [
        'Take the ACET (Ateneo College Entrance Test)',
        'Submit online application form',
        'Complete document submission',
        'Await admission result',
        'Enroll and attend orientation',
      ],
      requirements: ['ACET scores', 'High school transcript', 'Recommendation letters (2)', 'Birth certificate', 'Baptismal certificate (for Catholic applicants)'],
      deadline: 'ACET typically held October–November for the following school year',
      scholarshipNote: 'Various merit and need-based scholarships available. Contact Ateneo Financial Aid Office for details.',
    },
  },
  {
    slug: 'dlsu',
    name: 'De La Salle University',
    shortName: 'DLSU',
    tagline: 'In Lasalle, we lead.',
    description:
      'A leading Catholic research university known for excellence in engineering, business, and technology. The DLSU Green Archers are one of the most storied basketball programs in UAAP history.',
    founded: '1911',
    location: 'Taft Avenue, Manila',
    type: 'private',
    colors: { primary: '#006B3F', secondary: '#007A47', accent: '#FFFFFF' },
    logo: '/assets/logos/dlsu-logo.png',
    campusImage: '/assets/universities/dlsu-campus.jpg',
    heroImage: '/assets/universities/dlsu-hero.jpg',
    chantUrl: '/assets/audio/chants/dlsu-chant.mp3',
    admissionsUrl: 'https://www.dlsu.edu.ph/admissions/',
    website: 'https://www.dlsu.edu.ph',
    mapEmbedUrl: 'https://maps.google.com/maps?q=De+La+Salle+University+Manila&output=embed',
    academics: {
      overview:
        'DLSU is a leading research university recognized for its strengths in engineering, business, and information technology. Known for producing highly employable graduates.',
      qsRank: '801–1000',
      qsRankNumber: 810,
      qsRegionalRank: 'Top 75 in Southeast Asia',
      tuitionRange: '₱80,000–₱130,000 / semester',
      tuitionLabel: 'Premium',
      tuitionScore: 10,
      scores: {
        academicReputation: 9,
        programStrength: 10,
        researchOutput: 8,
        industryAlignment: 10,
      },
      topPrograms: [
        { name: 'Engineering', strength: 10 },
        { name: 'Information Technology', strength: 10 },
        { name: 'Business & Finance', strength: 9 },
        { name: 'Industrial Management', strength: 9 },
        { name: 'Science & Mathematics', strength: 8 },
      ],
      colleges: ['Gokongwei College of Engineering', 'Ramon V. del Rosario College of Business', 'College of Computer Studies', 'College of Science', 'Br. Andrew Gonzalez FSC College of Education'],
      strengths: ['Engineering Excellence', 'Industry Partnerships', 'Board Exam Passing Rates', 'Research Innovation', 'STEM Programs'],
    },
    sports: {
      overview: 'The Green Archers are one of the UAAP\'s most beloved teams, with passionate fans known as the "La Salle Green Archers Nation."',
      uaapTeams: ['Basketball', 'Volleyball', 'Football', 'Swim', 'Cheerleading', 'Badminton'],
      championships: [
        { sport: 'Basketball', count: 20, recentYears: ['2016', '2017', '2018', '2024'] },
        { sport: 'Volleyball', count: 9, recentYears: ['2018', '2019'] },
      ],
      totalTitles: 47,
      dominantSport: 'Basketball',
      notable: 'Most UAAP Basketball titles in history with 20 championships',
      mvpHistory: 'Ben Mbala (2016 MVP), Aljun Melecio, Kevin Racal, Kevin Quiambao',
    },
    studentLife: {
      overview: 'DLSU is known for its strong school pride, dynamic student organizations, and a community grounded in Lasallian values of faith, zeal, and community.',
      culture: 'Competitive, achievement-driven, and highly spirited. Green Archer pride runs deep with intense UAAP fandom.',
      organizations: ['La Salle Debate Society', 'DLSU Student Government', 'La Salle Science & Technology Club', 'Green Archers United'],
      events: ['UAAP Season Pep Rally', 'La Salle Day', 'Engineering Week', 'Animo La Salle Night'],
      mascot: 'Henry the Green Archer',
      schoolColor: 'Green and White',
      fanBase: 'Animo La Salle — one of the UAAP\'s loudest and most consistent fan armies',
    },
    achievements: [
      'QS World University Rankings 801–1000',
      '20 UAAP Basketball Championships (most all-time)',
      'Consistent top 3 in Philippine university rankings',
      'AACSB-accredited Business School',
      'Multiple engineering board exam topnotchers',
    ],
    highlights: [
      { icon: 'archer', label: 'Basketball Titles', value: '20' },
      { icon: 'grad', label: 'QS Rank', value: '801–1000' },
      { icon: 'gear', label: 'Engineering', value: 'Top PH' },
      { icon: 'work', label: 'Employability', value: 'Top 3 PH' },
    ],
    admissions: {
      steps: [
        'Fill out the DLSU Application Form online',
        'Take the DLSU College Entrance Test (DLSU-CET)',
        'Submit required documents',
        'Await admission decision',
        'Complete enrollment process',
      ],
      requirements: ['DLSU-CET results', 'Senior High School credentials', 'Form 138 / Transcript', 'Birth Certificate (PSA)', 'ID photos'],
      deadline: 'Typically September–October for the following academic year',
      scholarshipNote: 'Merit scholarship, financial assistance, and athletic scholarships available. See DLSU Scholarship Office.',
    },
  },
  {
    slug: 'ust',
    name: 'University of Santo Tomas',
    shortName: 'UST',
    tagline: 'The Catholic University of the Philippines',
    description:
      'Asia\'s oldest university, UST is renowned for its health sciences, medicine, and nursing programs. The UST Growling Tigers are UAAP Basketball legends, and the UST Pep Squad is synonymous with Cheerdance supremacy.',
    founded: '1611',
    location: 'España Boulevard, Manila',
    type: 'private',
    colors: { primary: '#F5C518', secondary: '#1A1A1A', accent: '#8B0000' },
    logo: '/assets/logos/ust-logo.png',
    campusImage: '/assets/universities/ust-campus.jpg',
    heroImage: '/assets/universities/ust-hero.jpg',
    chantUrl: '/assets/audio/chants/ust-chant.mp3',
    admissionsUrl: 'https://www.ust.edu.ph/admissions/',
    website: 'https://www.ust.edu.ph',
    mapEmbedUrl: 'https://maps.google.com/maps?q=University+of+Santo+Tomas+Manila&output=embed',
    academics: {
      overview:
        'UST is the oldest university in Asia, with unparalleled strength in health sciences, medicine, pharmacy, and architecture. Over 400 years of academic tradition.',
      qsRank: '1001–1200',
      qsRankNumber: 1100,
      qsRegionalRank: 'Top 110 in Southeast Asia',
      tuitionRange: '₱50,000–₱90,000 / semester',
      tuitionLabel: 'High',
      tuitionScore: 7,
      scores: {
        academicReputation: 8,
        programStrength: 9,
        researchOutput: 7,
        industryAlignment: 8,
      },
      topPrograms: [
        { name: 'Medicine', strength: 10 },
        { name: 'Nursing & Health Sciences', strength: 10 },
        { name: 'Pharmacy', strength: 9 },
        { name: 'Architecture & Fine Arts', strength: 9 },
        { name: 'Education', strength: 8 },
      ],
      colleges: ['Faculty of Medicine and Surgery', 'College of Nursing', 'College of Pharmacy', 'College of Architecture', 'College of Fine Arts and Design'],
      strengths: ['Medical & Health Programs', 'Oldest University in Asia', 'Catholic Formation', 'Cheerdance Culture', 'Board Exam Excellence'],
    },
    sports: {
      overview: 'UST is a powerhouse in multiple UAAP sports — the Growling Tigers in basketball and the legendary UST Pep Squad in Cheerdance.',
      uaapTeams: ['Basketball', 'Volleyball', 'Football', 'Cheerdance', 'Swim', 'Badminton'],
      championships: [
        { sport: 'Basketball', count: 7, recentYears: ['2011', '2012'] },
        { sport: 'Cheerdance', count: 13, recentYears: ['2018', '2019', '2022', '2023'] },
        { sport: 'Volleyball', count: 9, recentYears: ['2021', '2022', '2023'] },
      ],
      totalTitles: 40,
      dominantSport: 'Cheerdance',
      notable: 'UST Pep Squad — most dominant Cheerdance Competition program in UAAP history',
      mvpHistory: 'Aldin Ayo era produced multiple Mythical Five awardees; Rhea Dimaculangan in Volleyball',
    },
    studentLife: {
      overview: 'UST\'s massive campus hosts one of the most diverse and lively student populations in the Philippines, with deep Catholic roots and intense school pride.',
      culture: 'Traditional, spirited, and deeply Catholic. The "Thomasian" identity is strong — marching bands, pep rallies, and the iconic yellow-and-black colors.',
      organizations: ['UST Pep Squad', 'UST Student Council', 'UST Medicine Student Council', 'UST Dance Troupe'],
      events: ['UST Cheerdance', 'Thomasian Week', 'Medicine Week', 'UST Grand Alumni Homecoming'],
      mascot: 'The Growling Tiger',
      schoolColor: 'Gold and Black',
      fanBase: 'Thomasian Growling Tiger Nation — massive, passionate, and tradition-proud',
    },
    achievements: [
      'Asia\'s oldest existing university (est. 1611)',
      '13 UAAP Cheerdance Championships',
      '9 UAAP Women\'s Volleyball Championships',
      'Consistent top medical board exam performance',
      'QS World University Rankings 1001–1200',
    ],
    highlights: [
      { icon: 'tiger', label: 'Cheerdance Titles', value: '13' },
      { icon: 'building', label: 'Established', value: '1611' },
      { icon: 'health', label: 'Medicine', value: 'Top PH' },
      { icon: 'star', label: 'Total Titles', value: '40+' },
    ],
    admissions: {
      steps: [
        'Apply online through UST Office of Admissions',
        'Take the UST Entrance Examination (USTET)',
        'Submit complete requirements',
        'Receive admission notice',
        'Proceed with enrollment',
      ],
      requirements: ['USTET result', 'Senior High School card', 'PSA Birth Certificate', 'Baptismal Certificate', 'Certificate of Good Moral Character'],
      deadline: 'USTET held November–December for the following year',
      scholarshipNote: 'Thomasian Scholarship and Financial Assistance Program available for deserving students.',
    },
  },
  {
    slug: 'nu',
    name: 'National University',
    shortName: 'NU',
    tagline: 'Pursue Excellence',
    description:
      'NU has transformed into one of the UAAP\'s most dominant programs, particularly in Women\'s Volleyball where the Lady Bulldogs have achieved historic back-to-back-to-back championships.',
    founded: '1900',
    location: 'M.F. Jhocson Street, Manila',
    type: 'private',
    colors: { primary: '#003087', secondary: '#FFD700', accent: '#FFFFFF' },
    logo: '/assets/logos/nu-logo.png',
    campusImage: '/assets/universities/nu-campus.jpg',
    heroImage: '/assets/universities/nu-hero.jpg',
    chantUrl: '/assets/audio/chants/nu-chant.mp3',
    admissionsUrl: 'https://www.national-u.edu.ph/admissions/',
    website: 'https://www.national-u.edu.ph',
    mapEmbedUrl: 'https://maps.google.com/maps?q=National+University+Manila&output=embed',
    academics: {
      overview:
        'NU has evolved into a modern learning institution with strong programs in engineering, IT, business, and health sciences, complemented by world-class sports facilities.',
      qsRank: 'Not ranked in QS (latest cycle)',
      qsRankNumber: null,
      qsRegionalRank: 'Emerging national institution',
      tuitionRange: '₱40,000–₱70,000 / semester',
      tuitionLabel: 'Medium',
      tuitionScore: 5,
      scores: {
        academicReputation: 6,
        programStrength: 7,
        researchOutput: 5,
        industryAlignment: 7,
      },
      topPrograms: [
        { name: 'Physical Therapy & Health Sciences', strength: 8 },
        { name: 'Business Administration', strength: 7 },
        { name: 'Engineering', strength: 7 },
        { name: 'Information Technology', strength: 7 },
        { name: 'Education', strength: 6 },
      ],
      colleges: ['College of Engineering', 'College of Tourism & Hospitality Management', 'College of Health Sciences', 'College of Business & Accountancy', 'College of Education'],
      strengths: ['Athlete-friendly Environment', 'Modern Facilities', 'Sports-Academic Balance', 'Scholarship Programs', 'Health Sciences'],
    },
    sports: {
      overview: 'NU is the UAAP\'s most explosive rising program — the Lady Bulldogs in Volleyball are a dynasty, and the men\'s basketball team is a consistent contender.',
      uaapTeams: ['Basketball', 'Volleyball', 'Football', 'Cheerdance', 'Swim', 'Track & Field'],
      championships: [
        { sport: 'Volleyball (Women)', count: 9, recentYears: ['2021', '2022', '2023', '2024'] },
        { sport: 'Basketball', count: 1, recentYears: ['2014'] },
      ],
      totalTitles: 15,
      dominantSport: 'Volleyball',
      notable: 'NU Lady Bulldogs — back-to-back-to-back-to-back UAAP Volleyball Champions',
      mvpHistory: 'Alyssa Valdez era (2013–2016), Sharon Doblada, Aiza Maizo-Pontillas',
    },
    studentLife: {
      overview: 'NU\'s student community thrives on school pride and sports culture, with state-of-the-art facilities backing both athletes and scholars.',
      culture: 'Modern, sports-forward, and inclusive. The "Bulldog" identity unites students around world-class athletic excellence.',
      organizations: ['NU Student Government', 'NU Athletics', 'NU Business Society', 'NU Health Sciences Society'],
      events: ['NU Bulldog Fest', 'UAAP Volleyball watch parties', 'NU Foundation Day', 'Sports Awards Night'],
      mascot: 'Bulldog',
      schoolColor: 'Blue and Gold',
      fanBase: 'NU Bulldogs Nation — electric volleyball crowd, growing basketball following',
    },
    achievements: [
      '9 UAAP Women\'s Volleyball Championships',
      '4-peat UAAP Volleyball Dynasty (2021–2024)',
      'Modern world-class sports complex',
      'Consistent volleyball powerhouse since 2013',
      'Multiple UAAP best player awards in volleyball',
    ],
    highlights: [
      { icon: 'vball', label: 'Volleyball Titles', value: '9' },
      { icon: 'medal', label: 'Total UAAP Titles', value: '15' },
      { icon: 'stadium', label: 'Facilities', value: 'World-class' },
      { icon: 'bolt', label: 'Volleyball', value: 'Dynasty' },
    ],
    admissions: {
      steps: [
        'Submit application through NU Admissions Portal',
        'Take NU Entrance Exam',
        'Complete document requirements',
        'Receive admission status',
        'Enroll and attend orientation',
      ],
      requirements: ['Entrance exam result', 'Form 138 / SHS card', 'PSA Birth Certificate', 'Good Moral Certificate', 'ID photos'],
      deadline: 'Rolling admissions — check NU website for current dates',
      scholarshipNote: 'Athletic and academic scholarships available. NU is known for generous athlete scholarship programs.',
    },
  },
  {
    slug: 'feu',
    name: 'Far Eastern University',
    shortName: 'FEU',
    tagline: 'Striving Onward',
    description:
      'FEU is a historic university known for its art deco campus in Manila and strong programs in business, accountancy, and technology. The FEU Tamaraws are fierce UAAP competitors.',
    founded: '1928',
    location: 'Nicanor Reyes Street, Manila',
    type: 'private',
    colors: { primary: '#006B3F', secondary: '#FFD700', accent: '#FFFFFF' },
    logo: '/assets/logos/feu-logo.png',
    campusImage: '/assets/universities/feu-campus.jpg',
    heroImage: '/assets/universities/feu-hero.jpg',
    chantUrl: '/assets/audio/chants/feu-chant.mp3',
    admissionsUrl: 'https://www.feu.edu.ph/admissions/',
    website: 'https://www.feu.edu.ph',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Far+Eastern+University+Manila&output=embed',
    academics: {
      overview:
        'FEU is well-regarded for accountancy, business, tourism, and technology programs. Its graduates are consistently competitive in board exams.',
      qsRank: 'Not ranked in QS (latest cycle)',
      qsRankNumber: null,
      qsRegionalRank: 'Recognized national institution',
      tuitionRange: '₱35,000–₱65,000 / semester',
      tuitionLabel: 'Medium',
      tuitionScore: 5,
      scores: {
        academicReputation: 6,
        programStrength: 7,
        researchOutput: 5,
        industryAlignment: 7,
      },
      topPrograms: [
        { name: 'Accountancy & Finance', strength: 9 },
        { name: 'Business Administration', strength: 8 },
        { name: 'Tourism & Hospitality', strength: 8 },
        { name: 'Technology', strength: 7 },
        { name: 'Nursing', strength: 7 },
      ],
      colleges: ['Institute of Accounts, Business and Finance', 'Institute of Tourism and Hotel Management', 'Institute of Technology', 'Institute of Nursing', 'Institute of Education'],
      strengths: ['Accountancy Board Exam Rates', 'Business Programs', 'Tourism & Hospitality', 'Industry Linkages', 'Historic Campus'],
    },
    sports: {
      overview: 'The FEU Tamaraws are a proud UAAP program with a rich basketball history, multiple championships, and a very passionate fan base.',
      uaapTeams: ['Basketball', 'Volleyball', 'Football', 'Swim', 'Track & Field'],
      championships: [
        { sport: 'Basketball', count: 7, recentYears: ['2014', '2019'] },
        { sport: 'Volleyball', count: 2, recentYears: ['2013', '2014'] },
      ],
      totalTitles: 16,
      dominantSport: 'Basketball',
      notable: 'Former UAAP Basketball powerhouse with 7 championships; known for producing PBA stars',
      mvpHistory: 'RR Garcia, Julius Avena, Arvin Tolentino — consistent Mythical Five selections',
    },
    studentLife: {
      overview: 'FEU\'s iconic Manila campus and tight-knit community foster strong school pride, especially around UAAP season.',
      culture: 'Hardworking, community-oriented, proud of heritage. Known for its passionate "Tamaraw" identity.',
      organizations: ['FEU Student Council', 'FEU Business Society', 'FEU Tourism Society', 'Green & Gold Blockers (fan group)'],
      events: ['FEU Foundation Week', 'Tamaraw Fest', 'Accounting Week', 'UAAP pep rallies'],
      mascot: 'Tamaraw',
      schoolColor: 'Green and Gold',
      fanBase: 'FEU Tamaraw Nation — historic and passionate basketball crowd',
    },
    achievements: [
      '7 UAAP Basketball Championships',
      'Strong CPA board exam performance',
      'Historic art deco Manila campus',
      'Multiple PBA alumni',
      'PACUCOA-accredited programs',
    ],
    highlights: [
      { icon: 'tamaraw', label: 'Basketball Titles', value: '7' },
      { icon: 'chart', label: 'Accountancy', value: 'Top PH' },
      { icon: 'building', label: 'Established', value: '1928' },
      { icon: 'green', label: 'Total Titles', value: '16+' },
    ],
    admissions: {
      steps: [
        'Register online via FEU Admissions Portal',
        'Take the FEU College Entrance Test',
        'Submit documentary requirements',
        'Receive admission result',
        'Complete enrollment',
      ],
      requirements: ['Entrance test result', 'SHS grade report', 'PSA Birth Certificate', 'Good moral certificate', 'ID photos'],
      deadline: 'Check FEU website for current enrollment calendar',
      scholarshipNote: 'FEU offers merit, athletic, and need-based scholarships. Athletic scholars are especially supported.',
    },
  },
  {
    slug: 'adamson',
    name: 'Adamson University',
    shortName: 'AdU',
    tagline: 'Truth, Service, Excellence',
    description:
      'A Vincentian university known for engineering, science, and law. The Adamson Falcons compete in UAAP with consistent determination and a passionate fan following.',
    founded: '1932',
    location: 'San Marcelino Street, Manila',
    type: 'private',
    colors: { primary: '#003DA5', secondary: '#FFD700', accent: '#FFFFFF' },
    logo: '/assets/logos/adamson-logo.png',
    campusImage: '/assets/universities/adamson-campus.jpg',
    heroImage: '/assets/universities/adamson-hero.jpg',
    chantUrl: '/assets/audio/chants/adamson-chant.mp3',
    admissionsUrl: 'https://www.adamson.edu.ph/admissions',
    website: 'https://www.adamson.edu.ph',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Adamson+University+Manila&output=embed',
    academics: {
      overview:
        'Adamson University is recognized for its engineering, science, and technology programs, with a growing reputation in business and law.',
      qsRank: 'Not ranked in QS (latest cycle)',
      qsRankNumber: null,
      qsRegionalRank: 'Emerging national institution',
      tuitionRange: '₱30,000–₱55,000 / semester',
      tuitionLabel: 'Medium',
      tuitionScore: 4,
      scores: {
        academicReputation: 6,
        programStrength: 7,
        researchOutput: 5,
        industryAlignment: 6,
      },
      topPrograms: [
        { name: 'Engineering', strength: 8 },
        { name: 'Law', strength: 7 },
        { name: 'Pharmacy', strength: 7 },
        { name: 'Business Administration', strength: 7 },
        { name: 'Science & Technology', strength: 7 },
      ],
      colleges: ['School of Engineering', 'School of Law', 'College of Pharmacy', 'College of Science', 'College of Business Administration'],
      strengths: ['Engineering Programs', 'Bar Exam Performance', 'Vincentian Values', 'Accessible Tuition', 'Science Programs'],
    },
    sports: {
      overview: 'The Adamson Falcons compete with heart and determination in the UAAP, with recent strong showings in basketball.',
      uaapTeams: ['Basketball', 'Volleyball', 'Football', 'Swim', 'Track & Field'],
      championships: [
        { sport: 'Basketball', count: 1, recentYears: ['1996'] },
      ],
      totalTitles: 5,
      dominantSport: 'Basketball',
      notable: 'Coach Franz Pumaren\'s Falcons — competitive UAAP Final Four team in recent seasons',
      mvpHistory: 'Sean Manganti (multiple Mythical Five nominations), Jerrick Ahanmisi',
    },
    studentLife: {
      overview: 'Adamson\'s campus life is energetic, community-driven, and anchored in Vincentian service values.',
      culture: 'Service-minded, hardworking, and resilient. The "Falcon" identity represents soaring ambitions.',
      organizations: ['Adamson Student Government', 'Adamson Engineering Society', 'Adamson Debate Team', 'Falcon Athletic Boosters'],
      events: ['Adamson Foundation Week', 'Engineering Week', 'Falcon Fest', 'UAAP pep rallies'],
      mascot: 'Falcon',
      schoolColor: 'Blue and Yellow',
      fanBase: 'Adamson Blue Falcons — growing, energetic, underdog-loving crowd',
    },
    achievements: [
      '1 UAAP Basketball Championship',
      'Consistent UAAP Final Four contender',
      'Strong engineering board exam performance',
      'Growing academic reputation',
      'Vincentian service tradition since 1932',
    ],
    highlights: [
      { icon: 'eagle', label: 'UAAP Titles', value: '5+' },
      { icon: 'gear', label: 'Engineering', value: 'Strong' },
      { icon: 'building', label: 'Established', value: '1932' },
      { icon: 'law', label: 'Law', value: 'Respected' },
    ],
    admissions: {
      steps: [
        'Submit online application form',
        'Take the Adamson University Entrance Exam',
        'Submit complete documents',
        'Await admission decision',
        'Enroll for chosen program',
      ],
      requirements: ['Entrance exam', 'SHS credentials', 'PSA Birth Certificate', 'Good moral certificate', 'ID photos'],
      deadline: 'Check Adamson website for current schedule',
      scholarshipNote: 'Academic and athletic scholarships available. Vincentian mission supports deserving students.',
    },
  },
  {
    slug: 'ue',
    name: 'University of the East',
    shortName: 'UE',
    tagline: 'Opening Doors to Excellence',
    description:
      'UE is one of Manila\'s pioneering universities, strong in dentistry, medicine, engineering, and business. The UE Red Warriors are among the UAAP\'s most historic programs.',
    founded: '1946',
    location: 'Claro M. Recto Avenue, Manila',
    type: 'private',
    colors: { primary: '#CC0000', secondary: '#FFD700', accent: '#FFFFFF' },
    logo: '/assets/logos/ue-logo.png',
    campusImage: '/assets/universities/ue-campus.jpg',
    heroImage: '/assets/universities/ue-hero.jpg',
    chantUrl: '/assets/audio/chants/ue-chant.mp3',
    admissionsUrl: 'https://www.ue.edu.ph/manila/admissions/',
    website: 'https://www.ue.edu.ph',
    mapEmbedUrl: 'https://maps.google.com/maps?q=University+of+the+East+Manila&output=embed',
    academics: {
      overview:
        'UE is known for its strong dentistry, medicine, engineering, and business programs. One of the Philippines\' most accessible quality universities.',
      qsRank: 'Not ranked in QS (latest cycle)',
      qsRankNumber: null,
      qsRegionalRank: 'Established national institution',
      tuitionRange: '₱30,000–₱60,000 / semester',
      tuitionLabel: 'Medium',
      tuitionScore: 4,
      scores: {
        academicReputation: 6,
        programStrength: 7,
        researchOutput: 5,
        industryAlignment: 6,
      },
      topPrograms: [
        { name: 'Dentistry', strength: 9 },
        { name: 'Medicine', strength: 8 },
        { name: 'Engineering', strength: 7 },
        { name: 'Business Administration', strength: 7 },
        { name: 'Accounting', strength: 7 },
      ],
      colleges: ['College of Dentistry', 'College of Medicine', 'College of Engineering', 'College of Business Administration', 'College of Arts and Sciences'],
      strengths: ['Dentistry (among top in PH)', 'Medical Programs', 'Accessible Quality Education', 'Engineering Board Rates', 'Rich Sports Heritage'],
    },
    sports: {
      overview: 'The UE Red Warriors are one of the UAAP\'s most storied basketball programs with 18 championships and countless legends.',
      uaapTeams: ['Basketball', 'Volleyball', 'Football', 'Swim', 'Track & Field'],
      championships: [
        { sport: 'Basketball', count: 18, recentYears: ['1990s', '2000s'] },
      ],
      totalTitles: 22,
      dominantSport: 'Basketball',
      notable: 'UE Red Warriors — 18 UAAP Basketball Championships, home of many PBA legends',
      mvpHistory: 'Norman Black era produced multiple UAAP MVPs; Larry Fonacier, Paul Lee among notable alumni',
    },
    studentLife: {
      overview: 'UE\'s Recto campus has a rich community heritage, with strong school pride driven by its historic athletic tradition.',
      culture: 'Proud of heritage, passionate about sports, and community-driven. "Red Warrior" identity carries decades of history.',
      organizations: ['UE Student Government', 'UE Engineering Society', 'Red Warriors Booster Club', 'UE Medical Society'],
      events: ['UE Foundation Day', 'Red Warriors Homecoming', 'Engineering Week', 'UAAP Basketball watch events'],
      mascot: 'Red Warrior',
      schoolColor: 'Red and Gold',
      fanBase: 'UE Red Warriors — one of the UAAP\'s most historic fan bases',
    },
    achievements: [
      '18 UAAP Basketball Championships (2nd all-time)',
      'Top dentistry program in the Philippines',
      'Pioneer of Philippine higher education',
      'Multiple PBA alumni from UAAP days',
      'Rich cultural and academic heritage since 1946',
    ],
    highlights: [
      { icon: 'warrior', label: 'Basketball Titles', value: '18' },
      { icon: 'dental', label: 'Dentistry', value: 'Top PH' },
      { icon: 'building', label: 'Established', value: '1946' },
      { icon: 'star', label: 'Total Titles', value: '22+' },
    ],
    admissions: {
      steps: [
        'Apply online via UE Admissions website',
        'Take the UE College Entrance Test',
        'Submit required documents',
        'Receive admission decision',
        'Complete enrollment',
      ],
      requirements: ['Entrance exam result', 'SHS credentials', 'PSA Birth Certificate', 'Certificate of Good Moral Character', 'ID photos'],
      deadline: 'Rolling admissions — check UE website',
      scholarshipNote: 'Academic and athletic scholarships available. Contact UE Office of Student Affairs.',
    },
  },
];

export const getUniversity = (slug: string): University | undefined =>
  universities.find((u) => u.slug === slug);

export const sports = ['Basketball', 'Volleyball', 'Football', 'Cheerdance', 'Swimming', 'Track & Field', 'Badminton'];

export const uaapFacts = [
  { label: 'Member Universities', value: '8' },
  { label: 'Sports Tournaments', value: '15+' },
  { label: 'Founded', value: '1938' },
  { label: 'Season Games', value: '100+' },
];
