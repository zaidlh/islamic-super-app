export interface HajjStep {
  step: number;
  title: string;
  arabicTitle: string;
  location: string;
  description: string;
  duas: { arabic: string; transliteration: string; translation: string }[];
  tips: string[];
  type: "hajj" | "umrah" | "both";
}

export const HAJJ_STEPS: HajjStep[] = [
  {
    step: 1, title: "Enter Ihram", arabicTitle: "الإحرام", location: "Miqat", type: "both",
    description: "Ihram is the sacred state of purity entered before Hajj or Umrah. Take a full bath (ghusl), wear the white Ihram garments (two unstitched cloths for men; normal modest clothing for women), and make the intention (niyyah).",
    duas: [
      { arabic: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً", transliteration: "Labbayk Allahumma Umratan", translation: "Here I am O Allah, for Umrah" },
      { arabic: "لَبَّيْكَ اللَّهُمَّ حَجًّا", transliteration: "Labbayk Allahumma Hajjan", translation: "Here I am O Allah, for Hajj" },
    ],
    tips: ["Perform ghusl before entering Ihram", "Apply perfume before Ihram only — not after", "Ihram prohibitions include: cutting hair/nails, hunting, sexual relations, arguing", "Keep reciting Talbiyah constantly"],
  },
  {
    step: 2, title: "Recite Talbiyah", arabicTitle: "التلبية", location: "From Miqat onwards", type: "both",
    description: "Begin reciting the Talbiyah aloud (men) or softly (women) from the moment of Ihram and continue throughout the pilgrimage.",
    duas: [
      { arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ", transliteration: "Labbayk Allahumma labbayk, labbayk la sharika laka labbayk, innal hamda wan ni'mata laka wal mulk, la sharika lak", translation: "Here I am O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, grace and sovereignty belong to You. You have no partner." },
    ],
    tips: ["Men recite loudly; women softly", "Recite it as much as possible", "Continue until you begin Tawaf for Umrah, or until stoning Jamratul Aqabah for Hajj"],
  },
  {
    step: 3, title: "Tawaf al-Qudum / Umrah Tawaf", arabicTitle: "طواف القدوم", location: "Masjid al-Haram, Makkah", type: "both",
    description: "Circumambulate the Ka'bah 7 times counter-clockwise, starting and ending at the Black Stone. Men perform Idtiba (expose right shoulder) and Ramal (brisk walk) in first 3 circuits. Make personal du'a throughout. No specific du'a is required — any supplication is accepted.",
    duas: [
      { arabic: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ", transliteration: "Bismillahi wallahu akbar", translation: "In the name of Allah, and Allah is the Greatest (said at the Black Stone)" },
      { arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar", translation: "Our Lord, grant us good in this life and good in the hereafter, and save us from the Fire" },
    ],
    tips: ["Stay in wudu throughout Tawaf", "If possible, touch or kiss the Black Stone — otherwise point towards it each circuit", "The Yemeni Corner (Rukn al-Yamani) — touch only, don't kiss"],
  },
  {
    step: 4, title: "Pray 2 Rak'ahs at Maqam Ibrahim", arabicTitle: "صلاة خلف مقام إبراهيم", location: "Behind Maqam Ibrahim, Masjid al-Haram", type: "both",
    description: "After completing Tawaf, pray 2 rak'ahs behind Maqam Ibrahim (the stone with Ibrahim's footprint) if possible, or anywhere in the mosque. Recite Surah Al-Kafirun in first rak'ah and Surah Al-Ikhlas in second.",
    duas: [
      { arabic: "وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى", transliteration: "Wattakhidhu min maqami Ibrahima musalla", translation: "Take the station of Ibrahim as a place of prayer (Quran 2:125)" },
    ],
    tips: ["This prayer is Wajib (obligatory)", "If crowded, pray anywhere in the Haram"],
  },
  {
    step: 5, title: "Drink from Zamzam", arabicTitle: "شرب ماء زمزم", location: "Zamzam Well area, Masjid al-Haram", type: "both",
    description: "Drink Zamzam water facing the Ka'bah while standing. The Prophet ﷺ said 'Zamzam water is for whatever it is drunk for' — make a du'a for your intentions.",
    duas: [
      { arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ", transliteration: "Allahumma inni as'aluka ilman nafi'an wa rizqan wasi'an wa shifa'an min kulli da'", translation: "O Allah, I ask You for beneficial knowledge, abundant provision, and cure from every illness" },
    ],
    tips: ["Drink your fill", "Pour some on your head", "Prophet ﷺ drank it standing"],
  },
  {
    step: 6, title: "Sa'i between Safa and Marwah", arabicTitle: "السعي بين الصفا والمروة", location: "Al-Mas'a, Masjid al-Haram", type: "both",
    description: "Walk 7 times between Safa and Marwah, commemorating Hajar's search for water for baby Ismail. Start at Safa and end at Marwah. Men jog between the green lights. Make du'a throughout.",
    duas: [
      { arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ", transliteration: "Innas-safa wal-marwata min sha'a'irillah", translation: "Indeed Safa and Marwah are among the symbols of Allah (Quran 2:158)" },
      { arabic: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ", transliteration: "Allahu Akbar, Allahu Akbar, Allahu Akbar wa lillahil hamd", translation: "Allah is the Greatest, Allah is the Greatest, Allah is the Greatest and all praise is for Allah" },
    ],
    tips: ["7 trips total (Safa→Marwah = 1 trip)", "Men run between the green fluorescent lights", "End at Marwah"],
  },
  {
    step: 7, title: "Halq or Taqsir (Hair Cutting) — Umrah ends", arabicTitle: "الحلق أو التقصير", location: "Makkah", type: "both",
    description: "For men: shave the head (Halq, preferred) or shorten the hair (Taqsir). For women: cut a fingertip's length from the hair. This ends Ihram for Umrah. For Hajj al-Tamattu', you exit Ihram here and re-enter for Hajj on 8 Dhul Hijjah.",
    duas: [],
    tips: ["Shaving is better for men", "Do this before exiting Ihram", "Start from the right side when shaving"],
  },
  {
    step: 8, title: "Travel to Mina (8 Dhul Hijjah)", arabicTitle: "يوم التروية — المبيت بمنى", location: "Mina", type: "hajj",
    description: "On the 8th of Dhul Hijjah (Yawm al-Tarwiyah), pilgrims re-enter Ihram and travel to Mina. Spend the day and night in Mina, praying all 5 prayers (shortened to 2 rak'ahs for Dhuhr, Asr, Isha).",
    duas: [
      { arabic: "لَبَّيْكَ اللَّهُمَّ حَجًّا", transliteration: "Labbayk Allahumma Hajjan", translation: "Here I am O Allah, for Hajj" },
    ],
    tips: ["Sleep in Mina this night if possible", "Pray all 5 prayers in Mina", "Recite Talbiyah continuously"],
  },
  {
    step: 9, title: "Stand at Arafah (9 Dhul Hijjah)", arabicTitle: "يوم عرفة — الوقوف بعرفات", location: "Plain of Arafah", type: "hajj",
    description: "The most important pillar of Hajj. From after Dhuhr on 9 Dhul Hijjah until sunset, stand on the plain of Arafah in worship, supplication, and reflection. The Prophet ﷺ said 'Hajj is Arafah.' Dhuhr and Asr are combined here.",
    duas: [
      { arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul mulku wa lahul hamdu wa huwa ala kulli shay'in qadir", translation: "There is no god but Allah, alone, without partner. His is the sovereignty and to Him belongs all praise, and He has power over everything" },
    ],
    tips: ["This is the greatest day of Hajj — don't waste a moment", "Raise hands and make du'a with full concentration", "Face Qibla if possible but it's not required", "Weep and ask for forgiveness — this is the day Allah boasts of His pilgrims"],
  },
  {
    step: 10, title: "Muzdalifah — Night of 10 Dhul Hijjah", arabicTitle: "المبيت بمزدلفة", location: "Muzdalifah", type: "hajj",
    description: "After sunset, leave Arafah for Muzdalifah. Pray Maghrib and Isha combined (Isha shortened to 2 rak'ahs). Spend the night. Collect 49-70 pebbles for stoning the Jamarat. Pray Fajr early. Leave before sunrise for Mina.",
    duas: [],
    tips: ["Collect pea-sized pebbles here", "Pray Fajr early and leave before sunrise", "The elderly/weak may leave after midnight"],
  },
  {
    step: 11, title: "Stone the Large Jamrah (10 Dhul Hijjah)", arabicTitle: "رمي جمرة العقبة", location: "Jamarat, Mina", type: "hajj",
    description: "On Eid al-Adha morning, stone only Jamratul Aqabah (the large pillar) with 7 pebbles, saying Allahu Akbar with each throw. This symbolizes the rejection of Shaytan as done by Ibrahim (AS).",
    duas: [
      { arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", translation: "Allah is the Greatest (said with each pebble)" },
    ],
    tips: ["7 pebbles only at the large Jamrah today", "Time: after Fajr until sunset (best: before Dhuhr)", "Stop Talbiyah when you begin stoning"],
  },
  {
    step: 12, title: "Animal Sacrifice (Hady)", arabicTitle: "ذبح الهدي", location: "Mina / Makkah", type: "hajj",
    description: "Sacrifice an animal (sheep, goat, cow, or camel share) in Mina or Makkah. This commemorates Ibrahim's willingness to sacrifice Ismail. You may authorize a representative to do this.",
    duas: [
      { arabic: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ، اللَّهُمَّ تَقَبَّلْ مِنِّي", transliteration: "Bismillahi wallahu akbar, Allahumma taqabbal minni", translation: "In the name of Allah, and Allah is the Greatest. O Allah accept from me" },
    ],
    tips: ["Use Halal slaughterhouses if needed", "Can be done via official Hajj voucher scheme"],
  },
  {
    step: 13, title: "Shave or Trim Hair — Exit Major Ihram", arabicTitle: "الحلق أو التقصير", location: "Mina", type: "hajj",
    description: "After stoning and sacrifice, men shave or shorten their hair. This releases most Ihram restrictions. Only sexual relations remain prohibited until Tawaf al-Ifadah is complete.",
    duas: [],
    tips: ["Shaving is more rewarded for men", "Women cut fingertip length"],
  },
  {
    step: 14, title: "Tawaf al-Ifadah (Tawaf al-Ziyarah)", arabicTitle: "طواف الإفاضة", location: "Masjid al-Haram, Makkah", type: "hajj",
    description: "A compulsory Tawaf on 10-12 Dhul Hijjah. Circumambulate the Ka'bah 7 times. After this, all Ihram restrictions are lifted completely.",
    duas: [
      { arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaaban-nar", translation: "Our Lord, grant us good in this world and good in the hereafter, and protect us from the torment of Fire" },
    ],
    tips: ["Must be done before leaving Makkah", "Sa'i required after this if not done after Tawaf al-Qudum"],
  },
  {
    step: 15, title: "Stone All Three Jamarat (11-13 Dhul Hijjah)", arabicTitle: "رمي الجمرات الثلاث", location: "Jamarat, Mina", type: "hajj",
    description: "On Tashreeq days (11, 12, and optionally 13 Dhul Hijjah), stone all three Jamarat (Small, Medium, Large) with 7 pebbles each = 21 pebbles per day. Done after Dhuhr.",
    duas: [
      { arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", translation: "Allah is the Greatest (with each pebble)" },
    ],
    tips: ["Order: Small → Medium → Large", "Make du'a after Small and Medium Jamrah", "No du'a after Large Jamrah", "Can leave on 12th (Takhsir) if leaving before sunset"],
  },
  {
    step: 16, title: "Tawaf al-Wada (Farewell Tawaf)", arabicTitle: "طواف الوداع", location: "Masjid al-Haram, Makkah", type: "hajj",
    description: "Before leaving Makkah, perform a final 7-circuit Tawaf as a farewell. This is Wajib for Hajj. Make heartfelt du'a and gaze at the Ka'bah with gratitude.",
    duas: [
      { arabic: "اللَّهُمَّ إِنَّ هَذَا الْبَيْتَ بَيْتُكَ وَأَنَا عَبْدُكَ", transliteration: "Allahumma inna hadhal bayta baytuka wa ana abduk", translation: "O Allah, this House is Your House and I am Your servant" },
    ],
    tips: ["Last act before leaving Makkah", "Menstruating women are exempt from Tawaf al-Wada", "Exit walking backwards, gazing at the Ka'bah — a Sunnah"],
  },
];
