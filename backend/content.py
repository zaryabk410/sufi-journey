"""All page content. Served by /api/pages/{slug}.

Each chapter:
  id, title, scene (canvas scene key), body (list of paragraphs),
  narration (text spoken by speechSynthesis), optional cards, verses, genz.
Verse fields: ur (Urdu script), roman, en (meaning).
"""

PAGES = {
    # ------------------------------------------------------------------ HOME
    "sufism": {
        "slug": "sufism",
        "title": "Tasawwuf",
        "subtitle": "The inward side of Islam, explained for a generation that lives online.",
        "ambience": "dervish",
        "hero_scene": "whirl",
        "chapters": [
            {
                "id": "what",
                "title": "What Sufism actually is",
                "scene": "whirl",
                "body": [
                    "Sufism, or tasawwuf, is the inner dimension of Islam. It is the work of cleaning the heart so that prayer becomes presence and not routine. It is not a separate religion, not an aesthetic, and not only music and whirling.",
                    "Its root is the Hadith of Jibril, where the Prophet defines ihsan: to worship Allah as if you see Him, and if you do not see Him, to know that He sees you. Every Sufi practice is an attempt to live inside that sentence.",
                    "Junayd of Baghdad, one of the earliest masters, described it as God making you die to yourself and live through Him.",
                ],
                "genz": "Being online is not the same as being present. Sufism is the training for being present, with God and with yourself.",
                "narration": "Sufism, or tasawwuf, is the inner dimension of Islam. It is the work of cleaning the heart, so that prayer becomes presence and not routine. Its root is ihsan: to worship Allah as if you see Him, and if you do not see Him, to know that He sees you.",
            },
            {
                "id": "layers",
                "title": "Four layers of one path",
                "scene": "path",
                "body": [
                    "Classical Sufis describe the religion in four layers that sit inside each other. None of them cancels the one before it.",
                ],
                "cards": [
                    {"title": "Shariah", "text": "The law and the outer form: prayer, fasting, honesty, rights of people. The boat."},
                    {"title": "Tariqah", "text": "The path and its discipline under a guide: remembrance, self-watching, service. The voyage."},
                    {"title": "Haqiqah", "text": "Reality: seeing what the forms point to. The depth of the sea."},
                    {"title": "Ma'rifah", "text": "Gnosis: direct, tasted knowing of God. The pearl found in the depth."},
                ],
                "genz": "Anyone who tells you the inner path lets you skip the outer one is selling something. The great masters rejected that idea themselves.",
                "narration": "Sufis describe four layers. Shariah, the law, is the boat. Tariqah, the path, is the voyage. Haqiqah, reality, is the depth of the sea. And Ma'rifah, gnosis, is the pearl. You cannot reach the pearl by throwing away the boat.",
            },
            {
                "id": "nafs",
                "title": "Your ego has levels",
                "scene": "nafs",
                "body": [
                    "The Quran names stages of the nafs, the lower self. Sufi training is the slow climb from the first to the last.",
                ],
                "cards": [
                    {"title": "Nafs al-ammarah", "text": "The self that commands toward wrong (Quran 12:53). Pure impulse, no brakes."},
                    {"title": "Nafs al-lawwamah", "text": "The self that blames itself (Quran 75:2). Conscience wakes up and argues back."},
                    {"title": "Nafs al-mutma'innah", "text": "The self at peace (Quran 89:27). It no longer needs what used to control it."},
                ],
                "genz": "Ammarah is the urge to doomscroll at 3 am. Lawwamah is the guilt after. Mutma'innah is not needing the scroll at all.",
                "narration": "The Quran names three stages of the self. The commanding self, which pushes toward wrong. The blaming self, where conscience wakes up. And the self at peace, which no longer needs what used to control it.",
            },
            {
                "id": "mirror",
                "title": "Polishing the mirror of the heart",
                "scene": "mirror",
                "body": [
                    "Imam al-Ghazali compared the heart to a mirror. Sin and heedlessness settle on it like rust, until it reflects nothing. Remembrance and repentance polish it until it reflects divine light again.",
                    "A narration reported by al-Bayhaqi says that everything has a polish, and the polish of hearts is the remembrance of Allah.",
                ],
                "genz": "You are not broken. You are dusty. The work is cleaning, not replacing.",
                "narration": "Imam al-Ghazali compared the heart to a mirror. Heedlessness settles on it like rust. Remembrance polishes it, until it reflects light again. You are not broken. You are dusty.",
            },
            {
                "id": "dhikr",
                "title": "Dhikr: remembrance as breath",
                "scene": "dhikr",
                "body": [
                    "Dhikr is the repeated remembrance of God, often a phrase like La ilaha illallah, joined to the breath. The Quran says that in the remembrance of Allah hearts find rest (13:28).",
                    "Try it with the circle beside you. Breathe in as it grows, breathe out as it shrinks. Press the pulse button to hear the rhythm.",
                ],
                "genz": "Your phone pings for attention all day. Dhikr is choosing what your attention returns to.",
                "narration": "Dhikr is remembrance. A phrase joined to the breath. Breathe in as the circle grows. Breathe out as it shrinks. In the remembrance of Allah, hearts find rest.",
                "interactive": "breath",
            },
            {
                "id": "stations",
                "title": "Stations and states",
                "scene": "path",
                "body": [
                    "Sufi manuals separate maqamat, stations you reach through effort and keep, from ahwal, states that arrive as gifts and leave. A seeker walks through stations in order.",
                ],
                "cards": [
                    {"title": "Tawbah", "text": "Turning back. The door every journey starts from."},
                    {"title": "Wara'", "text": "Carefulness about what is doubtful, not only what is forbidden."},
                    {"title": "Zuhd", "text": "Holding the world in the hand, not in the heart."},
                    {"title": "Sabr", "text": "Patience that stays steady when things break."},
                    {"title": "Tawakkul", "text": "Doing your part, then trusting the outcome to God."},
                    {"title": "Rida", "text": "Contentment with what God decrees. The quiet summit."},
                ],
                "narration": "Stations are earned and kept. States arrive as gifts and leave. The path moves from repentance, to carefulness, to detachment, to patience, to trust, and finally to contentment.",
            },
            {
                "id": "ishq",
                "title": "Ishq: love as the engine",
                "scene": "moth",
                "body": [
                    "Sufi poetry keeps returning to the moth and the candle, parwana and shama. The moth circles the flame until it gives itself up to it. That is ishq: a love that does not bargain.",
                    "Rabia al-Adawiyya of Basra taught that if she worshipped out of fear of hell or desire for paradise, both should be taken from her, and that God should be worshipped for Himself alone.",
                ],
                "genz": "Transactional love keeps score. Ishq stops counting.",
                "narration": "The moth circles the candle until it gives itself to the flame. That is ishq. A love that does not bargain. Rabia of Basra asked to worship God not for fear, not for reward, but for Him alone.",
            },
            {
                "id": "fana",
                "title": "Fana and baqa",
                "scene": "fana",
                "body": [
                    "Fana means the passing away of the ego: its claims of ownership, its constant self-reference. It does not mean the person stops existing.",
                    "Baqa is what remains after: a person who returns to ordinary life, works, marries, serves, but now lives through God and not through the ego. The drop does not vanish into the ocean. It finally knows what it is made of.",
                ],
                "genz": "Not deleting yourself. Uninstalling the ego's admin rights.",
                "narration": "Fana is the passing away of the ego, not of the person. Baqa is what remains: someone who returns to ordinary life, but now lives through God. The drop does not vanish into the ocean. It finally knows what it is made of.",
            },
            {
                "id": "murshid",
                "title": "The guide and the chain",
                "scene": "chain",
                "body": [
                    "Sufism is learned from a murshid, a guide, the way a craft is learned from a master. Each guide is linked to the one before in a silsila, a chain that reaches back to the Prophet.",
                    "The major orders include the Qadiri, Chishti, Naqshbandi and Suhrawardi. In South Asia the tradition lives through Data Ganj Bakhsh Ali Hujwiri, author of Kashf al-Mahjub, Khwaja Moinuddin Chishti, Baba Farid, Bulleh Shah, Sultan Bahu and Shah Abdul Latif.",
                ],
                "narration": "Sufism is learned from a guide, a murshid. Each guide is linked to the one before in a chain, a silsila, that reaches back to the Prophet.",
            },
            {
                "id": "myths",
                "title": "Myths and what is real",
                "scene": "whirl",
                "body": [
                    "A lot of what circulates online as Sufism is aesthetic without substance. Here is the correction.",
                ],
                "cards": [
                    {"title": "Myth: it rejects religion", "text": "Real: the masters were scholars of law and hadith first."},
                    {"title": "Myth: it is just music", "text": "Real: sama is one practice among many, and many orders never used it."},
                    {"title": "Myth: you must leave the world", "text": "Real: the Naqshbandi rule is dast ba kar, dil ba yar. Hands at work, heart with the Beloved."},
                    {"title": "Myth: it is a vibe", "text": "Real: it is discipline. Daily, slow, often boring, and that is the point."},
                ],
                "narration": "Sufism is not a vibe and not a rejection of religion. It is discipline. Hands at work, heart with the Beloved.",
            },
        ],
    },
    # ------------------------------------------------------------ PEER-E-KAMIL
    "peer-e-kamil": {
        "slug": "peer-e-kamil",
        "title": "Peer-e-Kamil",
        "title_ur": "پیرِ کامل",
        "subtitle": "Umera Ahmed's novel about the search for the perfect guide, and who that guide turns out to be.",
        "ambience": "lamp",
        "hero_scene": "twopaths",
        "note": "This page explains the novel's story and themes in our own words. It does not reproduce the text. Read the original.",
        "chapters": [
            {
                "id": "why",
                "title": "Why this novel matters",
                "scene": "twopaths",
                "body": [
                    "Peer-e-Kamil was first serialised in an Urdu digest and published as a book in 2004. It became one of the most widely read Urdu novels of its generation.",
                    "It follows two young people on opposite paths, Imama and Salar, whose lives cross and pull apart. Both are searching. The book asks one question underneath every scene: who is the perfect guide, the peer-e-kamil?",
                    "Its answer is the Prophet Muhammad \ufdfa, and belief in the finality of his prophethood, Khatm-e-Nabuwwat, is the spine of the story.",
                ],
                "narration": "Peer-e-Kamil follows two young people on opposite paths, Imama and Salar. Both are searching. The book asks one question: who is the perfect guide? Its answer is the Prophet Muhammad, peace be upon him.",
            },
            {
                "id": "imama",
                "title": "Imama Hashim: conviction over comfort",
                "scene": "lamp",
                "body": [
                    "Imama grows up in a wealthy Ahmadi family in Islamabad. Through her own reading and questioning she comes to believe in the finality of prophethood, and that belief puts her at odds with everything she was raised inside.",
                    "She gives up her home, her family's protection, her comfort and an arranged future rather than let go of what she believes is true. The novel treats her faith as something chosen at great cost, not inherited.",
                    "In Sufi language this is tawbah and tark: turning, and leaving behind. Her story is the lamp held up in a storm.",
                ],
                "genz": "Your identity is not your feed or your family's label. It is what you are willing to pay for.",
                "narration": "Imama grows up in comfort. Through her own questioning, she comes to believe in the finality of prophethood. She gives up home, safety and future rather than let go of what she believes is true. Her faith is chosen, at great cost.",
            },
            {
                "id": "salar",
                "title": "Salar Sikandar: brilliant and empty",
                "scene": "void",
                "body": [
                    "Salar is a prodigy with an extraordinary mind, a rich family, and nothing that gives his life weight. He questions everything, provokes everyone, and keeps pushing himself toward dangerous edges because nothing satisfies him.",
                    "He is the novel's picture of the nafs left to itself: restless, clever, and lost. His intelligence answers every question except the one that matters.",
                ],
                "genz": "High IQ, zero peace. Information without meaning is just noise at a higher volume.",
                "narration": "Salar has a brilliant mind, wealth, and nothing that gives his life weight. He questions everything and is satisfied by nothing. His intelligence answers every question, except the one that matters.",
            },
            {
                "id": "turning",
                "title": "The turning",
                "scene": "mirror",
                "body": [
                    "Salar is drawn into Imama's crisis almost by accident and ends up giving her the protection of a nikah so she can escape. He sees in her a certainty he does not have and cannot buy.",
                    "Through a series of encounters with fear, darkness and unexpected mercy, his arrogance breaks. The rust on the mirror starts to come off. He begins to pray, to study, and to change, slowly and without drama.",
                ],
                "narration": "Salar sees in Imama a certainty he does not have and cannot buy. Through fear, darkness and unexpected mercy, his arrogance breaks. The mirror starts to clear.",
            },
            {
                "id": "guide",
                "title": "What a Peer-e-Kamil really is",
                "scene": "chain",
                "body": [
                    "Salar finds a teacher, Dr. Sibt-e-Ali, who becomes the guide figure of the novel. Imama finds shelter and dignity in the home of an elderly woman, Saeeda Amma.",
                    "But the book refuses to let any human be the final destination. Every true guide points beyond himself. The chain of every silsila ends at the Prophet \ufdfa, and he alone is the perfect guide. That is the novel's thesis, and it is classical Sufi teaching.",
                ],
                "narration": "Every true guide points beyond himself. The chain of every Sufi order ends at the Prophet, peace be upon him. He alone is the perfect guide. That is the novel's thesis, and it is classical Sufi teaching.",
            },
            {
                "id": "lessons",
                "title": "What it teaches",
                "scene": "twopaths",
                "body": ["The core of Peer-e-Kamil, distilled."],
                "cards": [
                    {"title": "Truth over belonging", "text": "Imama chooses conviction even when it costs her every comfort."},
                    {"title": "Mind is not meaning", "text": "Salar's genius cannot fill his emptiness. Only submission does."},
                    {"title": "Sabr", "text": "Years pass. Patience is not waiting, it is staying faithful while you wait."},
                    {"title": "Love redirected", "text": "Human love becomes a doorway to divine love, not a replacement for it."},
                    {"title": "The final guide", "text": "Every teacher is a window. The Prophet \ufdfa is the light."},
                ],
                "narration": "Truth over belonging. Mind is not meaning. Patience is staying faithful while you wait. Human love becomes a doorway to divine love. And every teacher is a window, while the Prophet is the light.",
            },
        ],
    },
    # ----------------------------------------------------------------- SHIKWA
    "shikwa": {
        "slug": "shikwa",
        "title": "Shikwa and Jawab-e-Shikwa",
        "title_ur": "شکوہ ، جوابِ شکوہ",
        "subtitle": "Allama Muhammad Iqbal speaks to God on behalf of his people, and then writes God's reply.",
        "ambience": "sky",
        "hero_scene": "ascend",
        "chapters": [
            {
                "id": "context",
                "title": "A conversation with God",
                "scene": "ascend",
                "body": [
                    "In 1909 Iqbal recited Shikwa, The Complaint, at the annual session of the Anjuman-e-Himayat-e-Islam in Lahore. Muslims were politically weak, colonised and poor. Iqbal gave voice to their question: we carried Your name across the world, so why have You left us?",
                    "Many religious scholars were outraged. How could a believer complain to God? In 1913, during the Balkan wars, Iqbal answered with Jawab-e-Shikwa, The Reply, written in God's voice.",
                ],
                "narration": "In 1909, Iqbal recited Shikwa, the Complaint, in Lahore. His people were weak and colonised, and he asked God why. Four years later, he wrote the Reply, in God's own voice.",
            },
            {
                "id": "shikwa",
                "title": "The complaint",
                "scene": "ascend",
                "body": [
                    "The poem opens with the poet refusing to stay silent while even the nightingale is allowed to cry.",
                ],
                "verses": [
                    {
                        "ur": "کیوں زیاں کار بنوں سود فراموش رہوں\nفکرِ فردا نہ کروں محوِ غمِ دوش رہوں",
                        "roman": "Kyun ziyan-kar banun, sood-faramosh rahun\nFikr-e-farda na karun, mahw-e-gham-e-dosh rahun",
                        "en": "Why should I accept loss and forget what I could gain? Why should I not think of tomorrow, and stay lost in yesterday's grief?",
                    },
                    {
                        "ur": "نالے بلبل کے سنوں اور ہمہ تن گوش رہوں\nہمنوا میں بھی کوئی گل ہوں کہ خاموش رہوں",
                        "roman": "Naale bulbul ke sunun aur hama-tan gosh rahun\nHamnawa main bhi koi gul hun ke khamosh rahun",
                        "en": "Shall I only listen to the nightingale's cries? Companion, am I a flower, that I should stay silent?",
                    },
                    {
                        "ur": "آ گیا عین لڑائی میں اگر وقتِ نماز\nقبلہ رو ہو کے زمیں بوس ہوئی قومِ حجاز",
                        "roman": "Aa gaya ain laraai mein agar waqt-e-namaz\nQibla-ru ho ke zameen-bos hui qaum-e-Hijaz",
                        "en": "If the time of prayer came in the middle of battle, the people of Hijaz turned to the qibla and put their foreheads to the ground.",
                    },
                    {
                        "ur": "ایک ہی صف میں کھڑے ہو گئے محمود و ایاز\nنہ کوئی بندہ رہا اور نہ کوئی بندہ نواز",
                        "roman": "Ek hi saf mein khare ho gaye Mahmood-o-Ayaz\nNa koi banda raha aur na koi banda-nawaz",
                        "en": "The king Mahmud and his slave Ayaz stood in one row. No one remained a servant, and no one a master.",
                    },
                ],
                "narration": "Why should I accept loss, and stay lost in yesterday's grief? Am I a flower, that I should stay silent? In battle, when prayer time came, they bowed to the ground. King and slave stood in one row, and no one was master over another.",
            },
            {
                "id": "naz",
                "title": "Complaint as intimacy",
                "scene": "moth",
                "body": [
                    "Read through a Sufi lens, Shikwa is not rebellion. In the language of love, the lover is allowed naz, the bold complaint that only intimacy permits. You only complain to someone you believe is listening.",
                    "Iqbal argues with God the way a child argues with a parent: loudly, because the bond is real.",
                ],
                "genz": "Being honest with God about your anger is not the opposite of faith. Silence and distance are.",
                "narration": "In the language of love, the lover is allowed a bold complaint. You only complain to someone you believe is listening.",
            },
            {
                "id": "jawab",
                "title": "The reply descends",
                "scene": "descend",
                "body": [
                    "Jawab-e-Shikwa begins with the complaint rising through the heavens until the angels hear it. Then God answers, and the answer turns the mirror back on the complainer.",
                ],
                "verses": [
                    {
                        "ur": "دل سے جو بات نکلتی ہے اثر رکھتی ہے\nپر نہیں طاقتِ پرواز مگر رکھتی ہے",
                        "roman": "Dil se jo baat nikalti hai asar rakhti hai\nPar nahin, taqat-e-parwaz magar rakhti hai",
                        "en": "Words that come from the heart have power. They have no wings, and still they have the strength to fly.",
                    },
                    {
                        "ur": "ہم تو مائل بہ کرم ہیں کوئی سائل ہی نہیں\nراہ دکھلائیں کسے رہروِ منزل ہی نہیں",
                        "roman": "Hum to mail-ba-karam hain, koi sail hi nahin\nRaah dikhlayen kise, rahrav-e-manzil hi nahin",
                        "en": "We are ready to give, but no one is asking. To whom shall We show the road, when no one is travelling toward the destination?",
                    },
                ],
                "narration": "Words from the heart have no wings, and still they fly. God replies: We are ready to give, but no one is asking. To whom shall We show the road, when no one is travelling?",
            },
            {
                "id": "promise",
                "title": "The final promise",
                "scene": "descend",
                "body": [
                    "The reply ends with the most quoted couplet Iqbal ever wrote. The decline was never God's abandonment. The way back is faithfulness to the Prophet \ufdfa.",
                ],
                "verses": [
                    {
                        "ur": "کی محمدؐ سے وفا تو نے تو ہم تیرے ہیں\nیہ جہاں چیز ہے کیا لوح و قلم تیرے ہیں",
                        "roman": "Ki Muhammad se wafa tu ne to hum tere hain\nYeh jahan cheez hai kya, lauh-o-qalam tere hain",
                        "en": "If you are faithful to Muhammad, then We are yours. What is this world? The Tablet and the Pen are yours.",
                    }
                ],
                "narration": "If you are faithful to Muhammad, then We are yours. What is this world? The Tablet and the Pen themselves are yours.",
            },
            {
                "id": "khudi",
                "title": "Iqbal's Sufism: khudi",
                "scene": "fana",
                "body": [
                    "Iqbal criticised a passive Sufism that taught people to dissolve and give up on the world. He called Rumi his guide, Pir-e-Rumi, but he turned the idea of fana around.",
                    "His concept of khudi, the self, says the ego should not be erased but refined and strengthened until it becomes worthy of carrying God's purpose in the world. The drop does not disappear. It becomes a pearl.",
                ],
                "cards": [
                    {"title": "Ask honestly", "text": "Shikwa shows that real questions are part of faith."},
                    {"title": "Listen to the answer", "text": "Jawab shows that the answer may be about you, not about God."},
                    {"title": "Wafa", "text": "Faithfulness is the key that turns everything back."},
                    {"title": "Khudi", "text": "Become strong enough to carry purpose, not weak enough to vanish."},
                ],
                "narration": "Iqbal called Rumi his guide, but he turned fana around. Khudi, the self, should not be erased. It should be refined until it is worthy of carrying God's purpose. The drop does not disappear. It becomes a pearl.",
            },
        ],
    },
    # ---------------------------------------------------------------- MAIKADA
    "maikada": {
        "slug": "maikada",
        "title": "Yeh hai maikada",
        "title_ur": "یہ ہے میکدہ",
        "subtitle": "Jigar Moradabadi's ghazal, and why a tavern in Urdu poetry is almost never a tavern.",
        "ambience": "qawwali",
        "hero_scene": "tavern",
        "note": "Jigar's ghazal is explained here in paraphrase. Listen to a full recitation or a qawwali performance to hear it in his words.",
        "chapters": [
            {
                "id": "jigar",
                "title": "Who was Jigar",
                "scene": "lamp",
                "body": [
                    "Jigar Moradabadi, born Ali Sikandar (1890 to 1960), was one of the great ghazal poets of the twentieth century. His verse is full of wine, the tavern and burning love, and he lived much of that imagery literally.",
                    "Later in life he gave up drinking and turned devout, and his late collection Atish-e-Gul won the Sahitya Akademi Award. His own life became a story of the rind who finds the real wine.",
                ],
                "narration": "Jigar Moradabadi was one of the great ghazal poets of the twentieth century. His verse is full of wine and burning love. Late in life he gave up drinking and turned devout. His life became the story of a rind who found the real wine.",
            },
            {
                "id": "tavern",
                "title": "The tavern is not a bar",
                "scene": "tavern",
                "body": [
                    "In Persian and Urdu Sufi poetry, wine imagery is a code. The maikada is the gathering of seekers, or the heart itself. The wine is divine love. Getting drunk is losing yourself in that love.",
                    "Jigar's opening plays on one word with two meanings. Haram is a sanctuary, and haraam is forbidden. In paraphrase: this is the tavern, the saqi is everyone's imam here, and this is no sanctuary of yours, Sheikh, because here it is pious pretence that is forbidden.",
                ],
                "genz": "The line is not anti-religion. It is anti-performance. Faith made for an audience is the one thing the tavern bans.",
                "narration": "In Sufi poetry, the tavern is the gathering of seekers, or the heart itself. The wine is divine love. Jigar plays on one word. This is no sanctuary of yours, Sheikh. Here, it is pious pretence that is forbidden.",
            },
            {
                "id": "symbols",
                "title": "The symbol dictionary",
                "scene": "tavern",
                "body": ["Tap a card while the tavern scene runs. Every object in the ghazal points somewhere else."],
                "cards": [
                    {"title": "Maikada", "text": "The tavern: the khanqah, the circle of seekers, or the heart."},
                    {"title": "Saqi", "text": "The cup-bearer: the murshid who serves the wine, or the Beloved Himself."},
                    {"title": "Sharab", "text": "Wine: divine love and direct knowledge of God."},
                    {"title": "Jaam, paimana", "text": "The cup: the seeker's heart, and how much it can hold."},
                    {"title": "Rind", "text": "The free drinker: sincere, unbothered by reputation, honest about need."},
                    {"title": "Sheikh, zahid", "text": "The preacher or ascetic who guards the outer form and misses the heart."},
                    {"title": "Nasha, sukr", "text": "Intoxication: the state where the ego forgets itself."},
                ],
                "narration": "The tavern is the heart. The cup-bearer is the guide. The wine is divine love. The cup is how much your heart can hold. The rind is sincere. The preacher guards the form and misses the heart.",
            },
            {
                "id": "rind",
                "title": "Rind and zahid",
                "scene": "twopaths",
                "body": [
                    "Urdu poetry stages a long argument between the rind and the zahid. The zahid is outwardly perfect and inwardly proud. The rind looks like a sinner but carries a broken, honest heart.",
                    "This is not a licence to sin. It is a warning that arrogance in worship can be worse than the sin it looks down on. The poets aimed this criticism at hypocrisy, never at the religion itself.",
                ],
                "narration": "The zahid is outwardly perfect and inwardly proud. The rind looks like a sinner but carries an honest heart. This is not a licence to sin. It is a warning against arrogance in worship.",
            },
            {
                "id": "sukr",
                "title": "Sukr and sahw",
                "scene": "fana",
                "body": [
                    "Early Sufis debated two ways of meeting God. Sukr, intoxication, was linked to Bayazid Bistami: overwhelmed, ecstatic, speaking strange words. Sahw, sobriety, was linked to Junayd: fully present, composed, returned to the world.",
                    "Most masters taught that sobriety after intoxication is the higher state. You drink, you lose yourself, and then you come back steady enough to serve. Jigar's own life followed that arc.",
                ],
                "cards": [
                    {"title": "Sukr", "text": "Ecstasy. The ego drowns in love."},
                    {"title": "Sahw", "text": "Sobriety after ecstasy. You return, transformed, to serve."},
                ],
                "narration": "Intoxication, sukr, is when the ego drowns in love. Sobriety, sahw, is when you return transformed to serve. Most masters taught that sobriety after intoxication is the higher state.",
            },
            {
                "id": "vibe",
                "title": "The vibe check",
                "scene": "moth",
                "body": ["What this ghazal says to anyone living on camera."],
                "cards": [
                    {"title": "Authenticity", "text": "God looks at hearts, not at captions."},
                    {"title": "No gatekeeping", "text": "In the tavern, the saqi leads everyone. Status stays at the door."},
                    {"title": "Real intoxication", "text": "The high the poets meant does not wear off and does not need a refill."},
                ],
                "narration": "God looks at hearts, not captions. In the tavern, status stays at the door. And the intoxication the poets meant never wears off.",
            },
        ],
    },
}

NAV = [
    {"slug": "sufism", "label": "Tasawwuf", "href": "index.html"},
    {"slug": "peer-e-kamil", "label": "Peer-e-Kamil", "href": "peer-e-kamil.html"},
    {"slug": "shikwa", "label": "Shikwa", "href": "shikwa.html"},
    {"slug": "maikada", "label": "Maikada", "href": "maikada.html"},
]


# ====================================================================== POETRY
# Classical verses are public domain. "Aaina-e-Dil" and "Allah Hu" are original
# pieces written for this project.
CLASSICAL = [
    {
        "ur": "جگ میں آ کر اِدھر اُدھر دیکھا\nتو ہی آیا نظر جدھر دیکھا",
        "roman": "Jag mein aa kar idhar udhar dekha\nTu hi aaya nazar jidhar dekha",
        "en": "I came into the world and looked here and there. Wherever I looked, only You appeared.",
        "credit": "Khwaja Mir Dard (1721 to 1785)",
    },
    {
        "ur": "درد دل کے واسطے پیدا کیا انسان کو\nورنہ طاعت کے لیے کچھ کم نہ تھے کرّوبیاں",
        "roman": "Dard-e-dil ke waaste paida kiya insaan ko\nWarna taa'at ke liye kuch kam na the karr-o-bayaan",
        "en": "Man was created for the ache of the heart. For worship alone, the angels were already enough.",
        "credit": "Khwaja Mir Dard (1721 to 1785)",
    },
    {
        "ur": "نہ تھا کچھ تو خدا تھا کچھ نہ ہوتا تو خدا ہوتا\nڈبویا مجھ کو ہونے نے نہ ہوتا میں تو کیا ہوتا",
        "roman": "Na tha kuch to Khuda tha, kuch na hota to Khuda hota\nDuboya mujh ko hone ne, na hota main to kya hota",
        "en": "When there was nothing, God was. Had there been nothing, God would be. My own being drowned me. Had I not been, what would I have been?",
        "credit": "Mirza Ghalib (1797 to 1869)",
    },
    {
        "ur": "عشرتِ قطرہ ہے دریا میں فنا ہو جانا\nدرد کا حد سے گزرنا ہے دوا ہو جانا",
        "roman": "Ishrat-e-qatra hai darya mein fana ho jaana\nDard ka hadd se guzarna hai dawa ho jaana",
        "en": "The joy of a drop is to pass away into the river. When pain crosses its limit, it becomes the cure.",
        "credit": "Mirza Ghalib (1797 to 1869)",
    },
    {
        "ur": "علموں بس کریں او یار\nاِکّو الف تیرے درکار",
        "roman": "Ilmon bas karin o yaar\nIkko alif tere darkaar",
        "en": "Enough of learning, my friend. All you need is one Alif, the letter that stands for the One.",
        "credit": "Bulleh Shah (1680 to 1757), Punjabi",
    },
]

GHAZAL = [
    {
        "ur": "دل کے آئینے پہ جمی گرد ہٹا کر دیکھو\nاپنے اندر بھی کبھی شمع جلا کر دیکھو",
        "roman": "Dil ke aaine pe jami gard hata kar dekho\nApne andar bhi kabhi shama jala kar dekho",
        "en": "Wipe the dust that has settled on the mirror of your heart. Light a candle inside yourself, just once.",
    },
    {
        "ur": "شور دنیا کا بہت ہے یہ صدا مدھم ہے\nایک لمحے کو ذرا اسکرین بجھا کر دیکھو",
        "roman": "Shor duniya ka bohat hai, yeh sada maddham hai\nEk lamhe ko zara screen bujha kar dekho",
        "en": "The world is loud and this voice is soft. Turn off the screen for one moment, and see.",
    },
    {
        "ur": "وہ تو شہ رگ سے بھی نزدیک ہے ڈھونڈو نہ کہیں\nاپنی \"میں\" کا یہ پردہ تو گرا کر دیکھو",
        "roman": "Woh to sheh-rag se bhi nazdeek hai, dhoondo na kahin\nApni \"main\" ka yeh parda to gira kar dekho",
        "en": "He is nearer than your jugular vein, so do not search far away. Just let the veil of your own \"I\" fall.",
    },
    {
        "ur": "قطرہ دریا سے جدا ہو کے بھی دریا ہی تو ہے\nاپنی ہستی کو سمندر میں ملا کر دیکھو",
        "roman": "Qatra darya se juda ho ke bhi darya hi to hai\nApni hasti ko samandar mein mila kar dekho",
        "en": "Even apart from the river, the drop is still river. Let your being merge into the ocean, and see.",
    },
    {
        "ur": "سر تو جھکتا ہے مگر دل ہے ابھی تک اکڑا\nدل کو بھی ساتھ کبھی سر کے جھکا کر دیکھو",
        "roman": "Sar to jhukta hai magar dil hai abhi tak akra\nDil ko bhi saath kabhi sar ke jhuka kar dekho",
        "en": "The head bows down, but the heart still stands stiff. Let the heart bow with the head, just once.",
    },
]

NAZM = {
    "ur": "ہر آتی سانس کہے اللہ\nہر جاتی سانس کہے ھُو\nبیچ کا یہ چھوٹا سا لمحہ\nبس یہی ہے میں اور تو",
    "roman": "Har aati saans kahe: Allah\nHar jaati saans kahe: Hu\nBeech ka yeh chhota sa lamha\nBas yahi hai main aur tu",
    "en": "Every breath in says Allah. Every breath out says Hu. This small moment in between is all there is of me and You.",
}

_poetry_chapters = [
    {
        "id": "poetry",
        "title": "Poetry of the path",
        "scene": "moth",
        "body": [
            "In South Asia, Sufism travelled through poetry more than through books of theory. A single couplet could carry a whole doctrine, and people who never read a treatise knew these lines by heart.",
            "Press Recite under any couplet. Every verse here was written before 1900.",
        ],
        "verses": CLASSICAL,
        "narration": "In South Asia, Sufism travelled through poetry. A single couplet could carry a whole doctrine. Mir Dard saw only God wherever he looked. Ghalib said his own existence drowned him. And Bulleh Shah told the scholars: enough learning, you need only one Alif.",
    },
    {
        "id": "ghazal",
        "title": "Aaina-e-Dil: a new ghazal",
        "scene": "mirror",
        "body": [
            "A ghazal written for this project in the classical form, with the radif \"kar dekho\". Each couplet holds one idea from this page: the mirror, dhikr, nearness, fana and sincere prostration. It ends with a short nazm on the breath.",
        ],
        "verses": GHAZAL + [NAZM],
        "genz": "The same tradition, written for a generation that has to switch its screen off to hear itself.",
        "narration": "Aaina-e-Dil, the mirror of the heart. A ghazal written for this project. Wipe the dust from the mirror of your heart. Turn off the screen for one moment. He is nearer than your jugular vein. Let your being merge into the ocean. And let the heart bow with the head.",
    },
]
_ch = PAGES["sufism"]["chapters"]
_myth = next(i for i, c in enumerate(_ch) if c["id"] == "myths")
_ch[_myth:_myth] = _poetry_chapters


def _v(v, scene, narration=None, dur=9):
    return {"scene": scene, "ur": v["ur"], "roman": v["roman"], "caption": v["en"],
            "credit": v.get("credit", ""), "narration": narration or v["en"], "dur": dur}


# ======================================================================= FILMS
PAGES["sufism"]["film"] = {
    "title": "Mushaira of the Heart",
    "intro": "An animated film of Sufi poetry: three classical masters, then a new ghazal and nazm written for this project.",
    "shots": [
        {"scene": "whirl", "caption": "For centuries, Sufis in South Asia did not teach with lectures. They taught with couplets.", "dur": 6},
        _v(CLASSICAL[0], "heavens", "Khwaja Mir Dard. I came into the world and looked here and there. Wherever I looked, only You appeared."),
        _v(CLASSICAL[1], "heartlight", "Mir Dard again. Angels can worship. Only a human can love and ache. Man was created for the ache of the heart."),
        _v(CLASSICAL[2], "veil", "Mirza Ghalib. When there was nothing, God was. My own being drowned me. The ego is the veil."),
        _v(CLASSICAL[3], "fana", "Ghalib. The joy of a drop is to pass away into the river. When pain crosses its limit, it becomes the cure."),
        _v(CLASSICAL[4], "alif", "Bulleh Shah, in Punjabi. Enough of learning, my friend. All you need is one Alif, the One."),
        {"scene": "mirror", "caption": "Now a new ghazal, written for this project: Aaina-e-Dil, the mirror of the heart.", "dur": 6},
        _v(GHAZAL[0], "mirror"),
        _v(GHAZAL[1], "screenoff"),
        _v(GHAZAL[2], "veil"),
        _v(GHAZAL[3], "fana"),
        _v(GHAZAL[4], "onerow"),
        _v(NAZM, "dhikr", "And a nazm on the breath. Every breath in says Allah. Every breath out says Hu. The moment in between is all there is of me and You.", 12),
        {"scene": "whirl", "caption": "The poets are gone. The path is still open.", "dur": 6},
    ],
}

PAGES["shikwa"]["film"] = {
    "title": "The Complaint and the Answer",
    "intro": "The story of Shikwa and Jawab-e-Shikwa as an animated short.",
    "shots": [
        {"scene": "gathering", "caption": "Lahore, 1909. A young poet named Muhammad Iqbal stands before a crowd and does something no one expects. He complains to God.", "dur": 8},
        {"scene": "caravan", "caption": "He reminds God of the past. We carried Your name across deserts and seas, to lands that had never heard it.", "dur": 8},
        {"scene": "onerow", "ur": "ایک ہی صف میں کھڑے ہو گئے محمود و ایاز\nنہ کوئی بندہ رہا اور نہ کوئی بندہ نواز",
         "roman": "Ek hi saf mein khare ho gaye Mahmood-o-Ayaz\nNa koi banda raha aur na koi banda-nawaz",
         "caption": "The king Mahmud and his slave Ayaz stood in one row. No one remained a servant, and no one a master.",
         "narration": "When prayer time came, even in battle, they bowed. King Mahmud and his slave Ayaz stood in one row. No master, no servant.", "credit": "Shikwa", "dur": 10},
        {"scene": "ruins", "caption": "And now? Others prosper while we are poor, mocked and divided. Iqbal asks: have You forgotten us?", "dur": 8},
        {"scene": "ascend", "ur": "نالے بلبل کے سنوں اور ہمہ تن گوش رہوں\nہمنوا میں بھی کوئی گل ہوں کہ خاموش رہوں",
         "roman": "Naale bulbul ke sunun aur hama-tan gosh rahun\nHamnawa main bhi koi gul hun ke khamosh rahun",
         "caption": "Shall I only listen to the nightingale's cries? Am I a flower, that I should stay silent?", "credit": "Shikwa", "dur": 10},
        {"scene": "gathering", "caption": "The scholars were furious. How could a believer speak to God like that? Four years later, Iqbal wrote the answer, in God's own voice.", "dur": 8},
        {"scene": "heavens", "ur": "دل سے جو بات نکلتی ہے اثر رکھتی ہے\nپر نہیں طاقتِ پرواز مگر رکھتی ہے",
         "roman": "Dil se jo baat nikalti hai asar rakhti hai\nPar nahin, taqat-e-parwaz magar rakhti hai",
         "caption": "Words from the heart have power. They have no wings, and still they fly.",
         "narration": "In the Reply, the complaint rises through the skies. Words from the heart have no wings, and still they fly. The angels hear it. God answers.", "credit": "Jawab-e-Shikwa", "dur": 10},
        {"scene": "descend", "ur": "ہم تو مائل بہ کرم ہیں کوئی سائل ہی نہیں\nراہ دکھلائیں کسے رہروِ منزل ہی نہیں",
         "roman": "Hum to mail-ba-karam hain, koi sail hi nahin\nRaah dikhlayen kise, rahrav-e-manzil hi nahin",
         "caption": "We are ready to give, but no one is asking. To whom shall We show the road, when no one is travelling?", "credit": "Jawab-e-Shikwa", "dur": 10},
        {"scene": "mirror", "caption": "God turns the mirror around. The decline was never abandonment. The people kept the form and lost the spirit.", "dur": 8},
        {"scene": "pen", "ur": "کی محمدؐ سے وفا تو نے تو ہم تیرے ہیں\nیہ جہاں چیز ہے کیا لوح و قلم تیرے ہیں",
         "roman": "Ki Muhammad se wafa tu ne to hum tere hain\nYeh jahan cheez hai kya, lauh-o-qalam tere hain",
         "caption": "If you are faithful to Muhammad, then We are yours. What is this world? The Tablet and the Pen are yours.", "credit": "Jawab-e-Shikwa", "dur": 11},
        {"scene": "madina", "caption": "From complaint to answer. That is the journey of every honest heart.", "dur": 7},
    ],
}

PAGES["maikada"]["film"] = {
    "title": "A Night in the Maikada",
    "intro": "An animated allegory inspired by Jigar's ghazal, told in our own words.",
    "shots": [
        {"scene": "nightstreet", "caption": "Night falls on the old city. A man walks toward the one door that is still glowing. People call it the maikada, the tavern.", "dur": 8},
        {"scene": "doorway", "caption": "At the door stands the sheikh, with a staff and a spotless turban. He has come to judge, not to drink. The rind walks past him and goes in.", "dur": 9},
        {"scene": "tavern", "ur": "یہ ہے میکدہ", "roman": "Yeh hai maikada",
         "caption": "This is the tavern, says Jigar, and here the saqi leads everyone, the way an imam leads a prayer.", "credit": "Jigar Moradabadi, paraphrased", "dur": 9},
        {"scene": "tavern", "caption": "Every cup is a heart. Each receives only as much as it can hold. Pride takes up room. Humility makes space.", "dur": 8},
        {"scene": "sama", "caption": "The wine is the love of God. The intoxication is the ego forgetting itself. Rich and poor, sinner and saint, sway in one circle.", "dur": 9},
        {"scene": "doorway", "caption": "The sheikh is still outside. This place is no sanctuary of his. In this tavern, the one forbidden thing is pretence.", "dur": 8},
        {"scene": "dawn", "caption": "At dawn the rind walks out, sober now, but changed. Ecstasy was the door. Service is the house. This is sahw, the sobriety after intoxication.", "dur": 9},
        {"scene": "lamp", "caption": "Jigar lived this himself. The poet of wine gave up wine, and found the drink his verses had always pointed to.", "dur": 8},
    ],
}

PAGES["peer-e-kamil"]["film"] = {
    "title": "The Perfect Guide",
    "intro": "Umera Ahmed's novel retold as an animated summary, in our own words.",
    "shots": [
        {"scene": "window", "caption": "Islamabad. Imama Hashim has every comfort her family can give. At night she reads, and the questions will not leave her.", "dur": 8},
        {"scene": "lamp", "caption": "Her reading leads to a conviction her family does not share: that prophethood ended with Muhammad, peace be upon him.", "dur": 8},
        {"scene": "storm", "caption": "Faith costs her everything. She leaves her home, her family's protection and the future arranged for her.", "dur": 8},
        {"scene": "highway", "caption": "Salar Sikandar is a genius with no brakes. Money, brilliance and endless restlessness. Nothing means anything to him.", "dur": 8},
        {"scene": "twopaths", "caption": "Their paths cross. Almost against his own nature, Salar helps her escape, and a nikah gives her the protection she needs.", "dur": 8},
        {"scene": "courtyard", "caption": "Imama finds shelter with Saeeda Amma, an elderly woman whose small home becomes a place of dignity and prayer.", "dur": 8},
        {"scene": "seasons", "caption": "Years pass. Imama waits with patience. Salar, alone with his emptiness, slowly begins to break.", "dur": 12},
        {"scene": "teacher", "caption": "He finds a teacher, Dr. Sibt-e-Ali, and learns that a true guide never points to himself.", "dur": 8},
        {"scene": "mirror", "caption": "The rust comes off his heart slowly. Prayer, humility, tears. The arrogant genius becomes a seeker.", "dur": 9},
        {"scene": "madina", "caption": "And the answer to the question the whole novel asks: who is the perfect guide? The Prophet Muhammad, peace be upon him. He is Peer-e-Kamil.", "dur": 10},
    ],
}


# ============================================================ ISHQ + KAINAAT
from content_extra import ISHQ, KAINAAT  # noqa: E402

PAGES["ishq"] = ISHQ
PAGES["kainaat"] = KAINAAT
NAV[1:1] = [
    {"slug": "ishq", "label": "Ishq", "href": "ishq.html"},
    {"slug": "kainaat", "label": "Kainaat", "href": "kainaat.html"},
]
