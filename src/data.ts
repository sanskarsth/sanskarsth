import { Destination, Service, Testimonial } from './types';

export const HERO_IMAGE = '/src/assets/images/hero_himalayas_1780318764999.png';

export const DESTINATIONS: Destination[] = [
  {
    id: 'nepal-general',
    title: 'Nepal',
    region: 'The Himalaya Kingdom',
    description: 'A sanctuary of rich cultural complexity, spiritual clarity, and legendary alpine scale.',
    longDescription: 'Nepal represents the ultimate geographical spectrum, cascading from the rich, subtropical lowlands of Chitwan to the highest terrestrial point on earth. It is a canvas of legendary hospitality, complex multi-layered history, and deeply-rooted tranquility.',
    image: 'https://images.unsplash.com/photo-1526716119026-d547c139c275?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Bespoke Kathmandu private heritage expeditions',
      'Exclusive luxury heli-tours to remote high-altitude peaks',
      'Custom-tailored culinary journeys and monastic spiritual rests',
      'Private meetings with conservationists and cultural experts'
    ],
    duration: '10 - 21 Days',
    bestSeason: 'Spring (March - May) • Autumn (Sept - Nov)',
    category: 'culture'
  },
  {
    id: 'everest-region',
    title: 'Everest Region',
    region: 'Khumbu Highlands',
    description: 'The highest crown of the earth, explored through exclusive luxury retreats and scenic charters.',
    longDescription: 'Sojourn through deep valleys carved by glaciers, staying in premium wilderness lodges. Engage with legendary Sherpa communities, observe the iconic peaks of Lhotse, Ama Dablam, and Everest, and traverse pathways with absolute logistical perfection.',
    image: 'https://images.unsplash.com/photo-1601579620751-1590fc7f9abc?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Sherpa heritage walks guided by veteran mountaineers',
      'Luxury heli-breakfast under the gaze of Ama Dablam at 14,000 feet',
      'Premium acclimatization schedules utilizing custom-fitted wellness kits',
      'Sojourns at high-end architectural lodges hidden in pine-clad ridges'
    ],
    altitude: '2,860m to 5,550m',
    duration: '8 - 14 Days',
    bestSeason: 'Spring (March - May) • Autumn (Oct - Dec)',
    category: 'adventure'
  },
  {
    id: 'annapurna-region',
    title: 'Annapurna Region',
    region: 'The Sanctuary Circuit',
    description: 'Dramatic vertical transitions from fertile terraced lowlands to monolithic glacial amphitheaters.',
    longDescription: 'Renowned for its unparalleled geographical beauty, the Annapurna massif offers diverse trails ranging from gentle valley hikes to demanding high passes. Stay in fully serviced lodges overlooking breathtaking peaks and experience authentic ethnic Gurung villages.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Private walks through rhododendron woodlands blooming with wild orchids',
      'Comfort-centered trekking with private cooks and expert support assets',
      'Acclimatization halts at exclusive thermal hot springs in pristine valleys',
      'Panoramic sunrise views from luxury private lookouts'
    ],
    altitude: '1,400m to 4,130m',
    duration: '5 - 12 Days',
    bestSeason: 'September - May',
    category: 'adventure'
  },
  {
    id: 'pokhara',
    title: 'Pokhara',
    region: 'The Valley of Lakes',
    description: 'A serene valley mirroring the towering snow peaks of Machapuchare in still waters.',
    longDescription: 'The perfect counter-point to rugged mountain trails. Pokhara is a pristine sanctuary where physical comfort meets raw natural beauty. Enjoy tranquil lake cruises, luxurious boutique properties, and direct panoramic pathways to mountain viewing crests.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Bespoke lakeside villa estates with private reflection gardens',
      'Ultra-light mountain flight charters for close-range aerial views',
      'Private spiritual medication at the World Peace Pagoda peak',
      'Authentic local organic food experiences curated by executive chefs'
    ],
    duration: '3 - 6 Days',
    bestSeason: 'Year-Round (Best Oct - April)',
    category: 'luxury'
  },
  {
    id: 'chitwan',
    title: 'Chitwan',
    region: 'Subtropical Lowlands',
    description: 'Ancient floodplains hosting pristine wilderness, elite river safaris, and rich wildlife tracking.',
    longDescription: 'A stark contrast to Himalayan heights. Chitwan’s tall grasslands and dense riverine forests serve as a haven for the rare Greater One-Horned Rhinoceros, Bengal Tigers, and exceptional avian diversity, all experienced from luxury riverside sanctuaries.',
    image: 'https://images.unsplash.com/photo-1581852013143-6c702b85fd03?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      '4x4 private safaris tracked by specialized resident naturalists',
      'Eco-sensitive luxury jungle encampments on the banks of the Rapti River',
      'Scenic canoe drift trips observing rare gharial crocodiles',
      'Traditional Tharu village walks focusing on ancient agricultural wisdom'
    ],
    duration: '3 - 5 Days',
    bestSeason: 'October - March',
    category: 'luxury'
  },
  {
    id: 'bhutan',
    title: 'Bhutan',
    region: 'The Last Shangri-La',
    description: 'An elite kingdom where modern development is measured in Gross National Happiness.',
    longDescription: 'Bhutan remains one of the world’s most pristine and isolated mountain principalities. With its carbon-negative status, sweeping fortress monasteries, and luxury valley circuits, it offers deep spiritual calibration paired with magnificent alpine walks.',
    image: 'https://images.unsplash.com/photo-1578593139811-2921a28a0e93?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Private helicopter expeditions to remote high cliffs and valleys',
      'VIP access hike to the iconic Tiger’s Nest (Paro Taktsang)',
      'Bespoke valley-to-valley circuits linking Five Aman Resorts properties',
      'Private consultations with high-ranking Buddhist scholars and Rinpoches'
    ],
    duration: '5 - 12 Days',
    bestSeason: 'March - May • September - November',
    category: 'luxury'
  },
  {
    id: 'tibet',
    title: 'Tibet',
    region: 'The Plateau Ceiling',
    description: 'Expansive sky lakes, ancient golden temples, and vast arid high-altitude plains.',
    longDescription: 'Cross the high passes to the cultural and spiritual core of the Tibetan plateau. Encounter the formidable architectural feat of the Potala Palace in Lhasa, the turquoise depths of Lake Yamdrok, and the eternal spiritual circuits of Mt. Kailash.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768b921?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Insider access private tours of Lhasa’s closed monastery shrines',
      'Stunning high-road overland expeditions to Everest Base Camp North',
      'Deep celestial stargazing at high altitude remote observation camps',
      'Private encounters with preservation scholars of Tibetan arts'
    ],
    duration: '7 - 15 Days',
    bestSeason: 'May - October',
    category: 'culture'
  },
  {
    id: 'southeast-asia',
    title: 'Southeast Asia',
    region: 'Tropical Heritage Routes',
    description: 'Curated wellness halts, private coastal villas, and custom multi-country cultural paths.',
    longDescription: 'For travelers seeking a contrast to mountain winters, Sanskar collaborates with an elite network of luxury resorts, deep-sea navigators, and architectural conservationists to construct sublime, worry-free tropical detours.',
    image: 'https://images.unsplash.com/photo-1552603305-b114085336d3?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Private charters through the islands of the Mergui Archipelago',
      'Exclusive temple access at Angkor Wat before standard visitor hours',
      'Bespoke multi-day culinary and wellness immersions in Ubud or Chiang Mai',
      'Staging in hand-picked, award-winning private coastal estates'
    ],
    duration: '7 - 20 Days',
    bestSeason: 'November - April',
    category: 'luxury'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'custom-planning',
    title: 'My Custom Itinerary Design',
    description: 'I design tailor-made, hand-crafted day-by-day itineraries completely around your personal speed, energy balance, and aesthetic preferences.',
    highlights: [
      'Entirely flexible daily sequence designed manually from scratch',
      'Hand-selected flight logistics, fast-track arrivals, and direct transfers',
      'Full consideration of specific dietary, physical, and comfort boundaries'
    ],
    icon: 'Compass'
  },
  {
    id: 'adventure-expeditions',
    title: 'My Guided Alpine Expeditions',
    description: 'I coordinate high-end trekking, glacial climbs, and scenic mountain passes using my direct network of elite certified high-altitude Sherpas.',
    highlights: [
      'Access to legendary Everest/Annapurna guides and direct field support',
      'Advanced medical security checks and real-time satellite tracking',
      'Top-tier high-altitude gear setup and premium wilderness camping logistics'
    ],
    icon: 'Mountain'
  },
  {
    id: 'luxury-escapes',
    title: 'My Curated Luxury Escapes',
    description: 'I secure preferred pricing, room upgrades, and custom culinary experiences at unmatched partner sanctuaries (Aman, Dwarika’s, boutique estates).',
    highlights: [
      'Exclusive reservation access and personal room upgrades',
      'Private helicopter charters to fly directly into spectacular mountain meadows',
      'Private farm-to-table culinary encounters with specialized local chefs'
    ],
    icon: 'Crown'
  },
  {
    id: 'cultural-experiences',
    title: 'My Deep Heritage Walks',
    description: 'I open doors to historically closed monastery shrines, sacred heritage estates, and private sessions with spiritual masters and local elder keepers.',
    highlights: [
      'VIP access to hidden ancestral library resources and pristine rituals',
      'Direct, respectful fireside dialogues with historians and resident lamas',
      'Traditional art, pottery, and culinary workshops with local family keepers'
    ],
    icon: 'Feather'
  },
  {
    id: 'group-travel',
    title: 'My Private Group Journeys',
    description: 'I craft seamless logistics, specialized multi-generation timelines, and exclusive retreats for families, close leagues, or leadership circles.',
    highlights: [
      'Dedicated coordination and real-time adjustments to your group’s needs',
      'Curated team synergy summits or private celebratory dinners in spectacular settings',
      'Unified logistics covering transport, personal gear, and medical safety contingencies'
    ],
    icon: 'Users'
  },
  {
    id: 'travel-consultation',
    title: 'My Private 1-on-1 Consulting',
    description: 'I offer strategic pre-travel counsel, physical conditioning advice, complex permit clearance, and round-the-clock text or viber support.',
    highlights: [
      'Highly professional, realistic guidance on physical prep for high elevation',
      'Worry-free processing of national park permits and complex visa files',
      'Direct, instant communications regarding microclimate shifts and instant routing updates'
    ],
    icon: 'PhoneCall'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Victoria & Christopher Vance',
    role: 'Luxury Collectors & Collectors of Art',
    location: 'London, UK',
    text: 'Sanskar completely re-imagined how we view Himalayan travel. The Private Helicopter Breakfast under Ama Dablam was spectacular, but what truly set him apart was his ability to adapt our schedule mid-destination when weather shifted in Pokhara. Absolutely effortless.',
    tripTaken: 'Bespoke Luxury Nepal & Heli Tour',
    rating: 5
  },
  {
    id: 't-2',
    author: 'Dr. Marcus Thorne',
    role: 'Lead Expedition Geologist & Outdoor Enthusiast',
    location: 'Geneva, Switzerland',
    text: 'Our three-week custom trekking expedition in the Upper Mustang region was meticulously organized. The equipment was flawless, the high-altitude guides were exceptionally trained, and the cultural insights Sanskar built into the itinerary were profound.',
    tripTaken: 'Custom Upper Mustang Expedition',
    rating: 5
  },
  {
    id: 't-3',
    author: 'Aiko Tanaka',
    role: 'Creative Director at Studio Kin',
    location: 'Tokyo, Japan',
    text: 'A profoundly serene itinerary in Bhutan and Central Nepal. Sanskar has access to teachers and quiet monastery areas that standard tour operators simply cannot dream of reaching. For travelers seeking silence, precision, and soul—he is unmatched.',
    tripTaken: 'Spiritual Heritage & luxury Rest in Bhutan',
    rating: 5
  },
  {
    id: 't-4',
    author: 'The Sterling Family Group',
    role: 'Corporate retreat and Multi-Generational Group',
    location: 'California, USA',
    text: 'Managing logistics for twelve family members aged fifteen to seventy-eight is normally a challenge. Sanskar structured different tracks—trekking for some, heritage spa rest and wildlife safaris for others. Everyone met for beautiful dinners. A masterpiece of planning.',
    tripTaken: 'Multi-generational Nepal Explorer',
    rating: 5
  }
];

export const WHY_WORK_WITH_ME = [
  {
    title: 'Tailored Only For You',
    description: 'No templates or off-the-shelf packages. Every single lodge, wilderness trail, pace, and local menu is selected by me personally to fit your lifestyle profile.'
  },
  {
    title: 'True Local Custodianship',
    description: 'Born and based in Nepal, I have built highly reliable, direct friendships with remote lodge owners, high-altitude helicopter pilots, and monastic keepers over twenty years.'
  },
  {
    title: 'Licensed, Ethical Alliances',
    description: 'I work with high-altitude porters and Sherpas. All team assets receive elite, certified training, transparent fair-wage pay, and complete premium winter protection.'
  },
  {
    title: 'End-to-End Handcrafting',
    description: 'From the initial visa permits down to customized physical endurance preparation sheets, I manage and prepare every single detail of your itinerary myself.'
  },
  {
    title: 'Unrestricted Direct Access',
    description: 'No agents, chatbots, or automated assistants. You get direct access to my personal cellular line, Viber, and WhatsApp throughout your active journey.'
  },
  {
    title: 'Zero Hidden Fees',
    description: 'Complete transparency on park entries, local permits, and mountain rescue logistics. I believe in upfront clarity with zero surprise markups or sales pitches.'
  }
];
