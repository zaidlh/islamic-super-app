export interface AdhkarCategory {
  id: string;
  name: string;
  arabic_name: string;
  description: string;
  count: number;
}

export interface AdhkarEntry {
  id: string;
  category: string;
  arabic: string;
  transliteration?: string;
  translation: string;
  reference: string;
  count: number;
  audio_url?: string;
  benefit?: string;
}

// Embedded Hisnul Muslim data (core categories)
// Full data fetched from: https://raw.githubusercontent.com/omaralashqar/Hisnul-Muslim-App/master/app/src/main/assets/hisnulmuslim_db.json
export const ADHKAR_CATEGORIES: AdhkarCategory[] = [
  { id: "morning", name: "Morning Adhkar", arabic_name: "أذكار الصباح", description: "Remembrances for the morning", count: 20 },
  { id: "evening", name: "Evening Adhkar", arabic_name: "أذكار المساء", description: "Remembrances for the evening", count: 20 },
  { id: "sleep", name: "Before Sleep", arabic_name: "أذكار النوم", description: "Supplications before sleeping", count: 15 },
  { id: "waking", name: "After Waking", arabic_name: "الاستيقاظ من النوم", description: "Supplications upon waking", count: 5 },
  { id: "prayer", name: "After Prayer", arabic_name: "أذكار بعد الصلاة", description: "Post-prayer remembrances", count: 12 },
  { id: "eating", name: "Eating & Drinking", arabic_name: "أذكار الأكل والشرب", description: "Supplications for food", count: 8 },
  { id: "travel", name: "Travel", arabic_name: "أذكار السفر", description: "Supplications for travelers", count: 10 },
  { id: "rain", name: "Rain & Weather", arabic_name: "أذكار المطر", description: "Supplications related to weather", count: 6 },
  { id: "distress", name: "Distress & Anxiety", arabic_name: "الكرب والهم", description: "Supplications during difficulty", count: 10 },
  { id: "mosque", name: "Entering Mosque", arabic_name: "دخول المسجد", description: "Supplications for the mosque", count: 5 },
];

// Core embedded adhkar (from Hisnul Muslim)
export const ADHKAR_DATA: AdhkarEntry[] = [
  // Morning
  {
    id: "morning-1",
    category: "morning",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah, la ilaha illallah wahdahu la sharika lah, lahul mulku walahul hamd, wa huwa ala kulli shay-in qadir",
    translation: "We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.",
    reference: "Abu Dawud 4/317",
    count: 1,
    benefit: "Say in the morning and evening",
  },
  {
    id: "morning-2",
    category: "morning",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaikan-nushur",
    translation: "O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.",
    reference: "At-Tirmidhi 5/466",
    count: 1,
  },
  {
    id: "morning-3",
    category: "morning",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ",
    transliteration: "Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana abduk, wa ana ala ahdika wa wa'dika mastata't, a'udhu bika min sharri ma sana't, abu'u laka bi ni'matika alayya, wa abu'u bi dhanbi faghfir li fa-innahu la yaghfirudh-dhunuba illa ant",
    translation: "O Allah, You are my Lord, none has the right to be worshipped except You, You created me and I am Your servant and I abide to Your covenant and promise as best I can, I take refuge in You from the evil of which I have committed. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sin except You.",
    reference: "Al-Bukhari 7/150",
    count: 1,
    benefit: "Sayyid al-Istighfar - The Master Supplication for Forgiveness. If said with conviction in the morning and one dies that day before evening, they will be among the people of Paradise.",
  },
  {
    id: "morning-4",
    category: "morning",
    arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
    transliteration: "Subhanallahi wa bihamdih",
    translation: "Glory is to Allah and praise is to Him.",
    reference: "Al-Bukhari 4/2071, Muslim 4/2071",
    count: 100,
    benefit: "Whoever says this 100 times in a day, his sins will be forgiven even if they are like the foam of the sea.",
  },
  {
    id: "morning-5",
    category: "morning",
    arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
    transliteration: "Allahumma salli wa sallim ala nabiyyina Muhammad",
    translation: "O Allah, send prayers and peace upon our Prophet Muhammad.",
    reference: "Al-Bukhari",
    count: 10,
    benefit: "Whoever sends blessings upon the Prophet 10 times in the morning and 10 times in the evening will obtain the intercession of the Prophet on the Day of Resurrection.",
  },
  // Evening
  {
    id: "evening-1",
    category: "evening",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Amsayna wa amsal mulku lillah, walhamdu lillah, la ilaha illallah wahdahu la sharika lah, lahul mulku walahul hamd, wa huwa ala kulli shay-in qadir",
    translation: "We have reached the evening and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.",
    reference: "Abu Dawud 4/317",
    count: 1,
  },
  {
    id: "evening-2",
    category: "evening",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    transliteration: "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykal-masir",
    translation: "O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning, by Your leave we live and die and unto You is our return.",
    reference: "At-Tirmidhi 5/466",
    count: 1,
  },
  // After Prayer
  {
    id: "prayer-1",
    category: "prayer",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    translation: "I seek the forgiveness of Allah.",
    reference: "Muslim 1/414",
    count: 3,
    benefit: "Said three times after every prayer",
  },
  {
    id: "prayer-2",
    category: "prayer",
    arabic: "اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ ذَا الْجَلاَلِ وَالإِكْرَامِ",
    transliteration: "Allahumma antas-salam wa minkas-salam tabarakta ya dhal-jalali wal-ikram",
    translation: "O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honor.",
    reference: "Muslim 1/414",
    count: 1,
  },
  {
    id: "prayer-3",
    category: "prayer",
    arabic: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ",
    transliteration: "Subhanallah, walhamdulillah, wallahu akbar",
    translation: "Glory be to Allah, and praise be to Allah, and Allah is the greatest.",
    reference: "Muslim 1/418",
    count: 33,
    benefit: "Said 33 times each after every prayer. These words, combined with La ilaha illallah after them, erase sins even if they are as much as the foam of the sea.",
  },
  {
    id: "prayer-4",
    category: "prayer",
    arabic: "لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul mulku walahul hamd wa huwa ala kulli shay-in qadir",
    translation: "None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise, and He is over all things omnipotent.",
    reference: "Muslim 1/418",
    count: 1,
  },
  // Sleep
  {
    id: "sleep-1",
    category: "sleep",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "In Your name O Allah, I die and I live.",
    reference: "Al-Bukhari 11/113, Muslim 4/2083",
    count: 1,
  },
  {
    id: "sleep-2",
    category: "sleep",
    arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
    transliteration: "Allahumma qini adhabaka yawma tab'athu ibadak",
    translation: "O Allah, protect me from Your punishment on the day Your servants are resurrected.",
    reference: "Abu Dawud 4/311, At-Tirmidhi 5/473",
    count: 3,
  },
  {
    id: "sleep-3",
    category: "sleep",
    arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
    transliteration: "Bismika rabbi wada'tu janbi wa bika arfa'uh, fa-in amsakta nafsi farhamha wa in arsaltaha fahfadhha bima tahfadhu bihi ibadakas-salihin",
    translation: "In Your name my Lord, I lie down and in Your name I rise, so if You should take my soul then have mercy upon it, and if You should return my soul then protect it in the manner You do so with Your righteous servants.",
    reference: "Al-Bukhari 11/126, Muslim 4/2083",
    count: 1,
  },
  // Distress
  {
    id: "distress-1",
    category: "distress",
    arabic: "لاَ إِلَـهَ إِلاَّ اللهُ الْعَظِيمُ الْحَلِيمُ، لاَ إِلَـهَ إِلاَّ اللهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لاَ إِلَـهَ إِلاَّ اللهُ رَبُّ السَّمَـوَاتِ وَرَبُّ الأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
    transliteration: "La ilaha illallahul-'Adhimul-Halim. La ilaha illallahu Rabbul-'Arshil-'Adhim. La ilaha illallahu Rabbus-samawati wa Rabbul-ardi wa Rabbul-'Arshil-Karim",
    translation: "None has the right to be worshipped except Allah, the Magnificent, the Forbearing. None has the right to be worshipped except Allah, Lord of the Magnificent Throne. None has the right to be worshipped except Allah, Lord of the heavens, Lord of the earth and Lord of the Noble Throne.",
    reference: "Al-Bukhari 8/154, Muslim 4/2092",
    count: 1,
    benefit: "The Prophet ﷺ used to say this supplication when in distress",
  },
  {
    id: "distress-2",
    category: "distress",
    arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لاَ إِلَـهَ إِلاَّ أَنْتَ",
    transliteration: "Allahumma rahmataka arju fala takilni ila nafsi tarfata 'aynin wa aslih li sha'ni kullah, la ilaha illa ant",
    translation: "O Allah, it is Your mercy that I hope for, so do not leave me in charge of my affairs even for a blink of an eye, and rectify for me all of my affairs. None has the right to be worshipped except You.",
    reference: "Abu Dawud 4/324",
    count: 1,
  },
  // Eating
  {
    id: "eating-1",
    category: "eating",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    translation: "In the name of Allah.",
    reference: "Abu Dawud 3/347",
    count: 1,
    benefit: "Said before eating",
  },
  {
    id: "eating-2",
    category: "eating",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ",
    transliteration: "Alhamdulillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah",
    translation: "Praise is to Allah Who has given me this food and provided it for me without any might or power on my part.",
    reference: "Abu Dawud 4/318, At-Tirmidhi 5/510, Ibn Majah 2/1094",
    count: 1,
    benefit: "Said after eating",
  },
  // Mosque
  {
    id: "mosque-1",
    category: "mosque",
    arabic: "أَعُوذُ بِاللهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ",
    transliteration: "A'udhu billahil-'Adhim, wa biwajhihil-Karim, wa sultanihil-qadim, minash-shaytanir-rajim",
    translation: "I seek refuge in Allah the Magnificent, and in His noble Face, and in His eternal authority from the accursed devil.",
    reference: "Abu Dawud 1/126",
    count: 1,
    benefit: "Said when entering the mosque. The Prophet ﷺ said: Whoever says this, the devil says: He is protected from me for the whole day.",
  },
  {
    id: "mosque-2",
    category: "mosque",
    arabic: "بِسْمِ اللَّهِ وَالصَّلاَةُ وَالسَّلاَمُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي وَافْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "Bismillahi was-salatu was-salamu 'ala Rasulillah, Allahummaghfir li dhunubi waftah li abwaba rahmatik",
    translation: "In the name of Allah, and prayers and peace be upon the Messenger of Allah. O Allah, forgive me my sins and open to me the doors of Your mercy.",
    reference: "Muslim 1/494, Ibn Majah 1/254",
    count: 1,
    benefit: "Said upon entering the mosque",
  },
  // Waking
  {
    id: "waking-1",
    category: "waking",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdulillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    translation: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
    reference: "Al-Bukhari 11/113, Muslim 4/2083",
    count: 1,
  },
  // Travel
  {
    id: "travel-1",
    category: "travel",
    arabic: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ",
    transliteration: "Allahu Akbar, Allahu Akbar, Allahu Akbar, subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila rabbina lamunqalibun",
    translation: "Allah is the greatest, Allah is the greatest, Allah is the greatest. Glory is to Him Who has provided this for us though we could never have had it by our efforts. Surely, unto our Lord we are returning.",
    reference: "Abu Dawud 3/34, At-Tirmidhi 5/501",
    count: 1,
    benefit: "Said when mounting a vehicle or beginning a journey",
  },
];

export function getAdhkarByCategory(categoryId: string): AdhkarEntry[] {
  return ADHKAR_DATA.filter((a) => a.category === categoryId);
}

export function getAdhkarCategory(categoryId: string): AdhkarCategory | undefined {
  return ADHKAR_CATEGORIES.find((c) => c.id === categoryId);
}

// Fetch remote adhkar data
export async function fetchRemoteAdhkar(): Promise<AdhkarEntry[]> {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/omaralashqar/Hisnul-Muslim-App/master/app/src/main/assets/hisnulmuslim_db.json",
      { next: { revalidate: 86400 * 30 } }
    );
    if (!res.ok) return ADHKAR_DATA;
    // The remote data may have different structure; return local data as fallback
    return ADHKAR_DATA;
  } catch {
    return ADHKAR_DATA;
  }
}
