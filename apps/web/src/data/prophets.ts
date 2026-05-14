export interface Prophet {
  id: number;
  name: string;
  arabicName: string;
  title: string;
  period: string;
  quranVerses: string[];
  story: string;
  lessons: string[];
  mentionedIn: number;
}

export const PROPHETS: Prophet[] = [
  {
    id: 1, name: "Adam", arabicName: "آدَم", title: "Father of Humanity", period: "Beginning of time",
    quranVerses: ["2:30-38", "7:11-25", "20:115-123"],
    story: "Adam (AS) was the first human being and prophet, created by Allah from clay. Allah breathed His spirit into him and commanded the angels to prostrate before him. He was placed in Paradise with his wife Hawwa, but was forbidden from approaching a particular tree. Iblis (Shaytan), out of arrogance, refused to prostrate and vowed to mislead humanity. Adam and Hawwa were deceived by Shaytan and ate from the forbidden tree. They repented sincerely, and Allah forgave them and sent them to Earth as His khalifah (vicegerents). Allah taught Adam the names of all things, showing his special status.",
    lessons: ["Repentance is always accepted when sincere", "Arrogance leads to destruction (lesson of Iblis)", "Humans are Allah's vicegerents on Earth", "Mistakes do not define us — our response to them does"],
    mentionedIn: 25,
  },
  {
    id: 2, name: "Idris", arabicName: "إِدْرِيس", title: "The Patient Scholar", period: "Before Nuh (AS)",
    quranVerses: ["19:56-57", "21:85-86"],
    story: "Idris (AS) was a prophet known for his great patience and righteousness. He was elevated to a high station by Allah. He is considered by many scholars to be among the earliest prophets and is associated with knowledge and wisdom. The Quran praises him as truthful, patient, and a man of God.",
    lessons: ["Knowledge and patience are noble virtues", "Allah elevates those of high moral character", "Truthfulness is a mark of the prophets"],
    mentionedIn: 2,
  },
  {
    id: 3, name: "Nuh", arabicName: "نُوح", title: "The Grateful Servant", period: "~3000 BCE",
    quranVerses: ["11:25-49", "71:1-28", "26:105-122"],
    story: "Nuh (AS) preached to his people for 950 years, inviting them to worship Allah alone. His people were deeply entrenched in idol worship and rejected his message relentlessly, even mocking him. By Allah's command, Nuh built a great ark. When the flood came, only those who boarded the ark — believers and pairs of animals — were saved. His own son refused and drowned. After the flood, the ark rested on Mount Judi. Nuh is called 'Shaykh al-Anbiya' (Elder of the Prophets).",
    lessons: ["Never give up dawah even after centuries", "Family ties do not guarantee salvation — only faith does", "Complete trust in Allah's plan", "The believer perseveres despite ridicule"],
    mentionedIn: 43,
  },
  {
    id: 4, name: "Hud", arabicName: "هُود", title: "Prophet to 'Ad", period: "~2400 BCE",
    quranVerses: ["7:65-72", "11:50-60", "26:123-140"],
    story: "Hud (AS) was sent to the people of 'Ad, a powerful civilization in Arabia known for their great strength and towering structures. Despite his warnings, they rejected him with arrogance, boasting of their might. Allah destroyed them with a furious wind that raged for seven nights and eight days, leaving nothing standing. Hud and the believers were saved.",
    lessons: ["Pride in worldly power leads to destruction", "Strength is meaningless against Allah's will", "Gratitude for blessings is obligatory"],
    mentionedIn: 7,
  },
  {
    id: 5, name: "Salih", arabicName: "صَالِح", title: "Prophet to Thamud", period: "~2000 BCE",
    quranVerses: ["7:73-79", "11:61-68", "26:141-159"],
    story: "Salih (AS) was sent to the people of Thamud in the region of al-Hijr. As a sign, Allah produced a miraculous she-camel from a rock. Salih warned his people not to harm the camel and let it graze freely. However, the disbelievers hamstrung the camel defiantly. As a result, Allah destroyed them with a mighty blast after a warning of three days. The ruins of their civilization (Mada'in Salih) still exist in Saudi Arabia.",
    lessons: ["Divine signs must be respected", "Defying Allah's commands brings swift consequences", "The few who follow truth will be saved"],
    mentionedIn: 9,
  },
  {
    id: 6, name: "Ibrahim", arabicName: "إِبْرَاهِيم", title: "Khalilullah — Friend of Allah", period: "~2000 BCE",
    quranVerses: ["2:124-132", "6:74-83", "21:51-73", "37:83-113"],
    story: "Ibrahim (AS) is one of the greatest prophets and is given the title 'Khalilullah' — the intimate friend of Allah. Born in Ur (Iraq), he realized the falsehood of idol worship from a young age through rational contemplation. He smashed his people's idols and was thrown into a massive fire — which Allah made cool and peaceful for him. He migrated to the holy land, settled his wife Hajar and infant son Ismail in the barren valley of Makkah, and later built the Ka'bah with Ismail. His greatest test was the command to sacrifice his son, which he obeyed without hesitation before Allah ransomed Ismail with a ram. Ibrahim established the Hajj pilgrimage.",
    lessons: ["Use reason to find truth", "Total submission to Allah — even the hardest sacrifice", "Migration for the sake of Allah brings great reward", "Monotheism is the natural disposition of humanity"],
    mentionedIn: 69,
  },
  {
    id: 7, name: "Lut", arabicName: "لُوط", title: "Nephew of Ibrahim", period: "~2000 BCE",
    quranVerses: ["7:80-84", "11:77-83", "26:160-175"],
    story: "Lut (AS) was sent to the people of Sodom who had fallen into grave immorality including the sin that has since borne his name. Despite his persistent warnings and invitations, they refused to reform and even threatened him. Angels visited in human form; the people tried to assault them. Allah commanded Lut to leave with his family before dawn, and the cities were destroyed by a rain of stones and turned upside down. Lut's wife, who had sympathy for the disbelievers, was also destroyed.",
    lessons: ["Moral corruption destroys societies", "Loyalty is to Allah's command, not to sinful community", "Allah protects His prophets"],
    mentionedIn: 27,
  },
  {
    id: 8, name: "Ismail", arabicName: "إِسْمَاعِيل", title: "The Patient, the Truthful", period: "~1900 BCE",
    quranVerses: ["2:127-129", "14:35-41", "37:100-111"],
    story: "Ismail (AS), son of Ibrahim, was left as an infant in the barren valley of Makkah with his mother Hajar. When Hajar ran between Safa and Marwa seeking water, Allah caused the spring of Zamzam to gush forth. Ismail grew up and helped his father build the Ka'bah. When Ibrahim told him of the divine command to sacrifice him, Ismail willingly submitted, saying 'Do as you are commanded.' Allah ransomed him with a great sacrifice. Ismail is an ancestor of Prophet Muhammad ﷺ.",
    lessons: ["Complete submission to Allah's will", "Trust in Allah's provision even in barren situations", "Obedience and patience are the marks of the faithful"],
    mentionedIn: 12,
  },
  {
    id: 9, name: "Ishaq", arabicName: "إِسْحَاق", title: "Son of Ibrahim, Father of Ya'qub", period: "~1900 BCE",
    quranVerses: ["11:71-73", "37:112-113"],
    story: "Ishaq (AS) was the second son of Ibrahim and Sarah, born miraculously when both were very old — a direct promise and gift from Allah. He was a prophet and continued his father's mission of monotheism, and from him descended the line of prophets among the Children of Israel.",
    lessons: ["Allah's promise is always fulfilled", "Old age is no barrier to Allah's blessings", "Prophethood is a divine gift, not inherited"],
    mentionedIn: 17,
  },
  {
    id: 10, name: "Yaqub", arabicName: "يَعْقُوب", title: "Israel — Father of the Twelve Tribes", period: "~1800 BCE",
    quranVerses: ["12:4-68", "19:49"],
    story: "Yaqub (AS), also known as Israel, was the son of Ishaq and grandson of Ibrahim. He had twelve sons who became the patriarchs of the twelve tribes of Israel. He suffered greatly when his sons conspired against his beloved son Yusuf, but he maintained extraordinary patience, never losing hope in Allah. When Yusuf was eventually revealed alive and successful in Egypt, Yaqub's sight was restored by touching Yusuf's shirt.",
    lessons: ["Patient grief is rewarded", "Never despair of Allah's mercy", "Family tests are among the greatest trials"],
    mentionedIn: 16,
  },
  {
    id: 11, name: "Yusuf", arabicName: "يُوسُف", title: "The Most Beautiful of Stories", period: "~1800 BCE",
    quranVerses: ["12:1-111"],
    story: "Yusuf (AS) is given the honor of having his entire story told in one Surah, called 'the best of stories.' As a boy, he had a vision of eleven stars, the sun, and moon bowing to him. Out of jealousy, his brothers threw him into a well and sold him into slavery in Egypt. He was falsely accused by his master's wife and imprisoned for years. In prison he interpreted dreams, and eventually his gift reached the Pharaoh. He became a powerful minister and was able to save Egypt and surrounding regions from famine. He forgave his brothers completely, reuniting the family in one of the most moving scenes in all of scripture.",
    lessons: ["Chastity and integrity are preserved by Allah", "Dreams of the righteous can be divine messages", "Forgiveness is the highest station", "Allah plans — the believer only needs to be patient"],
    mentionedIn: 27,
  },
  {
    id: 12, name: "Shuaib", arabicName: "شُعَيْب", title: "The Eloquent Prophet", period: "~1600 BCE",
    quranVerses: ["7:85-93", "11:84-95", "26:176-191"],
    story: "Shuaib (AS) was sent to the people of Madyan who were notorious for cheating in trade and giving short measure. He was known for his eloquence and was called 'Khatib al-Anbiya' (the Orator among Prophets). His people rejected him and met their destruction through a thunderous blast and earthquake, while Shuaib and the believers were spared.",
    lessons: ["Business ethics are an Islamic obligation", "Fraud and cheating are major sins", "Eloquent preaching should serve truth"],
    mentionedIn: 11,
  },
  {
    id: 13, name: "Ayyub", arabicName: "أَيُّوب", title: "Symbol of Patience", period: "~1600 BCE",
    quranVerses: ["21:83-84", "38:41-44"],
    story: "Ayyub (AS) is the supreme example of patience in the face of affliction. He was blessed with health, wealth, and family — all of which were taken away as a test. For 18 years (some say more) he endured terrible illness without complaint. He never attributed injustice to Allah; instead he made a humble supplication: 'Adversity has touched me, and You are the Most Merciful.' Allah responded and restored his health, family, and wealth doubled.",
    lessons: ["The greatest test is given to the greatest believers", "Never blame Allah in times of difficulty", "Relief always follows hardship", "The du'a of distress: 'Rabbi inni massaniya al-durr wa anta arham al-rahimin'"],
    mentionedIn: 4,
  },
  {
    id: 14, name: "Dhul-Kifl", arabicName: "ذُو الْكِفْل", title: "Man of the Double Portion", period: "~1200 BCE",
    quranVerses: ["21:85-86", "38:48"],
    story: "Dhul-Kifl (AS) is mentioned in the Quran among the patient and righteous. Some scholars identify him with the prophet Ezekiel. He is praised for his patience, constancy, and righteousness. His name suggests he was given a double portion — either of reward, or of responsibility.",
    lessons: ["Patience and constancy are divine virtues", "The righteous are remembered across time"],
    mentionedIn: 2,
  },
  {
    id: 15, name: "Musa", arabicName: "مُوسَىٰ", title: "Kalimullah — He Who Spoke to Allah", period: "~1300 BCE",
    quranVerses: ["2:49-61", "7:103-162", "20:9-98", "26:10-68", "28:1-43"],
    story: "Musa (AS) is the most frequently mentioned prophet in the Quran. Born during Pharaoh's genocide of Israelite males, his mother placed him in a basket on the Nile. He was raised in Pharaoh's own palace. After accidentally killing a man, he fled to Madyan, married Shuaib's daughter, and spent years in quiet service. Allah spoke to him directly from a burning bush on Mount Tur, commanding him to return to Egypt. Despite his self-doubt, Musa confronted the mighty Pharaoh with the truth. He performed great miracles — the staff-snake, glowing hand — defeated Pharaoh's magicians who themselves believed. He led the Children of Israel out of Egypt; the sea split for them and closed on Pharaoh's army. He received the Torah on Mount Sinai. His encounters with Al-Khidr are a profound lesson in knowledge and trust.",
    lessons: ["Allah's plan works even through the enemy's house", "True strength is in divine support, not military might", "The sea of difficulty parts for those who trust Allah", "Seeking knowledge requires humility"],
    mentionedIn: 136,
  },
  {
    id: 16, name: "Harun", arabicName: "هَارُون", title: "Brother and Helper of Musa", period: "~1300 BCE",
    quranVerses: ["7:142", "20:29-36", "28:34"],
    story: "Harun (AS) was the brother of Musa who was granted prophethood as Musa's assistant. He was more eloquent and was entrusted with leading the Children of Israel while Musa went to receive the Torah. When the people fell into idol worship of the golden calf, Harun had tried to restrain them but was overpowered. He is a model of the faithful assistant and loyal helper.",
    lessons: ["Supporting a leader in truth is a noble role", "Loyalty between brothers is a great blessing", "Leading people is a heavy responsibility"],
    mentionedIn: 20,
  },
  {
    id: 17, name: "Dawud", arabicName: "دَاوُود", title: "King, Prophet, Psalmist", period: "~1000 BCE",
    quranVerses: ["2:251", "21:78-80", "27:15-16", "34:10-11", "38:17-26"],
    story: "Dawud (AS) started as a young shepherd boy in the army of the Children of Israel. When the giant Goliath challenged, it was Dawud who came forward and slew him with a sling. He became a great king and prophet, granted the Psalms (Zabur) by Allah. He could speak with birds and animals, and iron became soft in his hands — he used it to make armor. He was known for his beautiful voice and his intense devotion; he would fast alternating days and stand in night prayer for half the night.",
    lessons: ["Courage in facing tyrants is a prophetic quality", "Gratitude for gifts: use them in Allah's service", "Justice is the foundation of true leadership"],
    mentionedIn: 16,
  },
  {
    id: 18, name: "Sulaiman", arabicName: "سُلَيْمَان", title: "The Wise King", period: "~970 BCE",
    quranVerses: ["21:81-82", "27:15-44", "34:12-14", "38:30-40"],
    story: "Sulaiman (AS) was the son of Dawud and one of the wealthiest, most powerful kings in history. He was given control over the wind, jinn, birds, and animals — all submitted to his command by Allah's permission. He famously adjudicated a dispute with wisdom (the two women and the baby). He received a message from the Queen of Sheba, Bilqis, via the hoopoe bird, and through wisdom and a display of divine power, brought her to faith in Allah. He built the First Temple of Jerusalem. He is a model of a ruler who combines knowledge, justice, and gratitude.",
    lessons: ["True power is in gratitude, not pride", "Wisdom in leadership serves all of creation", "Asking for unique gifts from Allah is not arrogance if done with the right intent"],
    mentionedIn: 17,
  },
  {
    id: 19, name: "Ilyas", arabicName: "إِلْيَاس", title: "Prophet to Baal Worshippers", period: "~900 BCE",
    quranVerses: ["6:85", "37:123-132"],
    story: "Ilyas (AS) (Elijah) was sent to the people of Baalbek in present-day Lebanon who had fallen into the worship of the idol Baal. He called them to monotheism but was rejected. The Quran praises him with: 'Peace be upon Ilyas!' — a greeting of honor from Allah.",
    lessons: ["Standing alone for truth is a prophetic quality", "The call to monotheism transcends all cultures and times"],
    mentionedIn: 2,
  },
  {
    id: 20, name: "Al-Yasa", arabicName: "الْيَسَع", title: "Successor of Ilyas", period: "~850 BCE",
    quranVerses: ["6:86", "38:48"],
    story: "Al-Yasa (AS) (Elisha) was the disciple and successor of Ilyas. He continued the prophetic mission after Ilyas departed. The Quran praises him alongside Dhul-Kifl as among the best of people.",
    lessons: ["Continuing the work of a righteous mentor is noble", "Perseverance in dawah brings divine reward"],
    mentionedIn: 2,
  },
  {
    id: 21, name: "Yunus", arabicName: "يُونُس", title: "Dhul-Nun — Companion of the Whale", period: "~800 BCE",
    quranVerses: ["10:98", "21:87-88", "37:139-148", "68:48-50"],
    story: "Yunus (AS) was sent to the people of Nineveh (modern Mosul, Iraq). In frustration at his people's rejection, he left without Allah's leave. He boarded a ship; when lots were cast in a storm, his name came up and he was thrown overboard. A great whale swallowed him. In the belly of the whale in utter darkness, he called out the famous du'a: 'La ilaha illa anta, subhanaka, inni kuntu min al-zalimin' (There is no god but You, Glory be to You, indeed I have been among the wrongdoers). Allah responded, the whale released him, and he returned to his people who had repented — 100,000 of them believed.",
    lessons: ["The du'a of distress in darkness is answered", "No one can flee from Allah's decree", "Repentance and humility open all closed doors", "Mass repentance is possible — never underestimate your people"],
    mentionedIn: 4,
  },
  {
    id: 22, name: "Zakariyya", arabicName: "زَكَرِيَّا", title: "Guardian of Maryam", period: "~100 BCE",
    quranVerses: ["3:37-41", "19:2-11", "21:89-90"],
    story: "Zakariyya (AS) was a devout prophet and priest who was the guardian of Maryam (Mary). Witnessing Maryam miraculously provided out-of-season fruits in her prayer chamber, he was inspired to supplicate to Allah for a child, despite his old age and his wife's barrenness. Allah answered his prayer and promised him a son, Yahya. He asked for a sign and was told he would not be able to speak for three days. His son Yahya (John the Baptist) was born and became a great prophet.",
    lessons: ["Never stop supplicating — at any age", "Allah's power transcends natural laws", "Witnessing miracles should inspire personal du'a"],
    mentionedIn: 7,
  },
  {
    id: 23, name: "Yahya", arabicName: "يَحْيَىٰ", title: "John the Baptist", period: "~5 BCE",
    quranVerses: ["3:39", "6:85", "19:7-15"],
    story: "Yahya (AS) was the son of Zakariyya, born of a miraculous conception. He was given prophethood while still a child. The Quran says he was given wisdom as a boy, was compassionate and pure, dutiful to his parents, and not arrogant or disobedient. He lived in asceticism and prepared the way for Isa (AS). He recognized the prophethood of Isa before his birth.",
    lessons: ["Piety and wisdom can be given at any age", "Asceticism and devotion are noble", "Respect for parents is part of righteousness"],
    mentionedIn: 5,
  },
  {
    id: 24, name: "Isa", arabicName: "عِيسَىٰ", title: "Ruhullah — Spirit of Allah, Messiah", period: "~1 CE",
    quranVerses: ["3:45-59", "4:157-159", "5:110-120", "19:16-40", "61:6"],
    story: "Isa (AS) (Jesus) was born miraculously to the Virgin Maryam. Allah breathed His spirit into her, and Isa was born without a father — a sign of Allah's power. As an infant, he spoke in the cradle to defend his mother's honor. He was given the Injeel (Gospel) and performed extraordinary miracles: healing the blind and lepers, raising the dead, creating birds from clay — all by Allah's permission. He foretold the coming of the final prophet 'Ahmad' (Muhammad ﷺ). He was raised alive to the heavens by Allah, not crucified as claimed by his enemies. He will return before the Day of Judgment.",
    lessons: ["Miracles are Allah's support for His messengers", "Pure monotheism was the original message of Isa", "Allah protects His prophets from being killed by enemies", "The miraculous birth teaches that nothing is impossible for Allah"],
    mentionedIn: 25,
  },
  {
    id: 25, name: "Muhammad", arabicName: "مُحَمَّد", title: "Seal of the Prophets ﷺ", period: "570–632 CE",
    quranVerses: ["33:40", "33:21", "68:4", "21:107", "3:144"],
    story: "Muhammad ﷺ, born in Makkah in 570 CE, is the final prophet and messenger of Allah. Orphaned young and raised by his grandfather then uncle, he was known as Al-Amin (The Trustworthy) before revelation. At age 40, revelation began in the Cave of Hira with the words: 'Iqra — Read.' For 13 years in Makkah he called to tawhid, enduring persecution and boycotts. He migrated to Madinah in 622 CE (the Hijra), establishing the first Islamic state, brotherhood between Ansar and Muhajirun, and the Constitution of Madinah. He fought defensive battles — Badr, Uhud, Khandaq — and ultimately returned to Makkah in 630 CE in a peaceful conquest, forgiving his enemies. He performed his Farewell Hajj in 632 CE, delivering his landmark Farewell Sermon. He passed away at age 63, leaving behind the Quran and his Sunnah as a mercy to all worlds.",
    lessons: ["His character (Akhlaq) is the living Quran", "Patience and wisdom are inseparable", "Forgiveness of enemies is the highest station", "The Ummah is one body — united in faith"],
    mentionedIn: 4,
  },
];
