"""Ishq (love between Allah and the human) and Kainaat (the universe in Sufism).
Classical verses quoted here were published before 1929. Pieces marked as
written for this project are original."""

# ------------------------------------------------------------------ verses
ISHQ_CLASSICAL = [
    {
        "ur": "عشق ہی عشق ہے جہاں دیکھو\nسارے عالم میں بھر رہا ہے عشق",
        "roman": "Ishq hi ishq hai jahan dekho\nSaare aalam mein bhar raha hai ishq",
        "en": "Wherever you look, there is only love. Love is filling the whole universe.",
        "credit": "Mir Taqi Mir (1723 to 1810)",
    },
    {
        "ur": "عشق پر زور نہیں ہے یہ وہ آتش غالبؔ\nکہ لگائے نہ لگے اور بجھائے نہ بنے",
        "roman": "Ishq par zor nahin hai, yeh woh aatish Ghalib\nKe lagaye na lage aur bujhaye na bane",
        "en": "No one has power over love, Ghalib. It is a fire that will not light when you try, and will not go out when you want it to.",
        "credit": "Mirza Ghalib (1797 to 1869)",
    },
    {
        "ur": "بے خطر کود پڑا آتشِ نمرود میں عشق\nعقل ہے محوِ تماشائے لبِ بام ابھی",
        "roman": "Be-khatar kood para aatish-e-Namrood mein ishq\nAql hai mahw-e-tamasha-e-lab-e-baam abhi",
        "en": "Love leapt fearlessly into Nimrod's fire, while reason is still standing on the rooftop, watching.",
        "credit": "Allama Iqbal, Bang-e-Dra (1924)",
    },
]

ISHQ_ORIGINAL = [
    {
        "ur": "ہم ایک قدم چلیں تو دوڑ کے آتا ہے وہ\nروٹھیں جو ہم تو پیار سے بلاتا ہے وہ",
        "roman": "Hum ek qadam chalein to daur ke aata hai woh\nRoothein jo hum to pyar se bulata hai woh",
        "en": "If we walk one step, He comes running. If we turn away sulking, He calls us back with love.",
    },
    {
        "ur": "ماں سے بھی بڑھ کے جس کی رحمت ہے بے کنار\nگرتے ہیں ہم تو تھام کے اٹھاتا ہے وہ",
        "roman": "Maa se bhi barh ke jis ki rehmat hai be-kinaar\nGirte hain hum to thaam ke uthata hai woh",
        "en": "His mercy is shoreless, greater than a mother's. When we fall, He holds us and lifts us up.",
    },
    {
        "ur": "ہم نے کہاں سے سیکھا محبت کا یہ ہنر\nپہلے ہمیں ہی چاہ کے سکھاتا ہے وہ",
        "roman": "Hum ne kahan se seekha mohabbat ka yeh hunar\nPehle humein hi chaah ke sikhata hai woh",
        "en": "Where did we learn this art of love? He teaches it by loving us first.",
    },
]

KAINAAT_CLASSICAL = [
    {
        "ur": "اصلِ شہود و شاہد و مشہود ایک ہے\nحیراں ہوں پھر مشاہدہ ہے کس حساب میں",
        "roman": "Asl-e-shuhood-o-shahid-o-mashhood ek hai\nHairaan hoon phir mushahida hai kis hisaab mein",
        "en": "The seeing, the seer and the seen are in essence one. I am bewildered: then what is this act of seeing?",
        "credit": "Mirza Ghalib (1797 to 1869)",
    },
    {
        "ur": "ہے غیب غیب جس کو سمجھتے ہیں ہم شہود\nہیں خواب میں ہنوز جو جاگے ہیں خواب میں",
        "roman": "Hai ghaib-e-ghaib jis ko samajhte hain hum shuhood\nHain khwab mein hanoz jo jaage hain khwab mein",
        "en": "What we take to be the visible is the unseen of the unseen. Those who wake up inside a dream are still dreaming.",
        "credit": "Mirza Ghalib (1797 to 1869)",
    },
]

KAINAAT_NAZM = {
    "ur": "ستارے بھی گردش میں ہیں ذکر کرتے\nیہ ذرّے بھی رقصاں ہیں تیری ثنا میں\nمیں انساں ہوں میں بھی اسی دائرے میں\nمرا دل بھی گھومے تری ہی ہوا میں",
    "roman": "Sitare bhi gardish mein hain zikr karte\nYeh zarre bhi raqsaan hain teri sana mein\nMain insaan hoon, main bhi isi daire mein\nMera dil bhi ghoome teri hi hawa mein",
    "en": "The stars turn in their orbits, remembering. The atoms dance in Your praise. I am human, and I am in this same circle. My heart too turns, in Your air alone.",
}


def _v(v, scene, narration=None, dur=9):
    return {"scene": scene, "ur": v["ur"], "roman": v["roman"], "caption": v["en"],
            "credit": v.get("credit", ""), "narration": narration or v["en"], "dur": dur}


# ==================================================================== ISHQ
ISHQ = {
    "slug": "ishq",
    "title": "Ishq",
    "title_ur": "عشق",
    "subtitle": "The love between Allah and the human being: who loves first, how it grows, and how it is proved.",
    "ambience": "ney",
    "hero_scene": "approach",
    "chapters": [
        {
            "id": "first",
            "title": "He loved first",
            "scene": "approach",
            "body": [
                "The Quran describes a people whom Allah loves and who love Him (5:54). Sufis noticed the order of the words: His love is mentioned before theirs. Human love for God is always a response.",
                "Sufis also love a saying in which God says: I was a hidden treasure and I loved to be known, so I created creation. Hadith scholars say it has no reliable chain, so it is not a hadith, but Sufis use it as a summary of their worldview: creation begins with love.",
            ],
            "genz": "You are not chasing someone who ignores you. You are answering someone who messaged first.",
            "narration": "The Quran speaks of a people whom Allah loves, and who love Him. His love comes first. Human love for God is always an answer to a love that was already there.",
        },
        {
            "id": "running",
            "title": "Walk to Him and He runs",
            "scene": "approach",
            "body": [
                "In a hadith qudsi reported by al-Bukhari and Muslim, Allah says that He is as His servant thinks of Him, and that if the servant comes to Him walking, He comes to the servant running.",
                "This is the heart of Sufi hope. The seeker's effort is small and slow. The response is fast and large.",
            ],
            "narration": "Allah says: if My servant comes to Me walking, I come to him running. The seeker's step is small. The answer is always greater.",
        },
        {
            "id": "mercy",
            "title": "More merciful than a mother",
            "scene": "mercyrain",
            "body": [
                "The Prophet saw a mother among captives frantically searching for her baby, and when she found it she held it to her chest. He asked whether she would ever throw her child into a fire. When the companions said no, he said Allah is more merciful to His servants than this mother is to her child (al-Bukhari).",
                "Another hadith says Allah divided mercy into a hundred parts and sent only one part into the world. All the mercy between mothers and children, and between all creatures, comes from that one part.",
            ],
            "genz": "Think of the most protective love you have ever seen. It is one percent.",
            "narration": "Allah is more merciful to His servants than a mother to her child. And all the mercy in this world is one part out of a hundred.",
        },
        {
            "id": "majazi",
            "title": "From human love to divine love",
            "scene": "layla",
            "body": [
                "Sufi poets speak of ishq-e-majazi, love for a human being, and ishq-e-haqiqi, love for God. The first can become a bridge to the second when it teaches the heart longing, loyalty and self-forgetting.",
                "The classic image is Majnun at the house of Layla. In lines attributed to him, he says he kisses one wall of her house and then another, but it is not the walls he loves. It is the one who lives inside. Sufis read the whole universe as Layla's house.",
                "The masters were clear that this bridge is only real when it stays within what is lawful and pure. Otherwise it is just desire wearing poetry.",
            ],
            "narration": "Majnun kissed the walls of Layla's house, but he did not love the walls. He loved the one who lived inside. Sufis read the whole universe as that house.",
        },
        {
            "id": "reed",
            "title": "The song of the reed",
            "scene": "reed",
            "body": [
                "Rumi's Masnavi opens with a reed flute, the ney. It sings sadly because it was cut from its reed bed, and everyone who is far from their origin longs to return.",
                "For Rumi, the longing you feel is itself proof of where you came from. You cannot miss a home you never had. Turn on the ambience to hear a ney-like melody synthesised in your browser.",
            ],
            "genz": "That feeling of homesickness for a place you cannot name? Rumi says it has an address.",
            "narration": "Rumi's Masnavi begins with the reed flute. It sings because it was cut from its reed bed. Everyone far from their origin longs to go back. Your longing is proof of where you came from.",
        },
        {
            "id": "proof",
            "title": "How love is proved",
            "scene": "chain",
            "body": [
                "The Quran gives the test directly: if you love Allah, follow the Prophet, and Allah will love you (3:31). In Islam, love is not only a feeling. It is a way of living.",
                "And love of God shows in how you treat people. The Prophet said none of you truly believes until he loves for his brother what he loves for himself (al-Bukhari).",
            ],
            "narration": "If you love Allah, follow the Prophet, and Allah will love you. Love is proved by how you live, and by how you treat people.",
        },
        {
            "id": "beloved",
            "title": "When He loves you",
            "scene": "mirror",
            "body": [
                "In a hadith qudsi in al-Bukhari, Allah says His servant keeps coming closer through voluntary worship until He loves him, and when He loves him He becomes the hearing with which he hears, the sight with which he sees, the hand with which he grasps and the foot with which he walks.",
                "Sufis understand this not as the human becoming God, but as a person so aligned with God that he no longer hears, sees or acts from the ego.",
            ],
            "narration": "When Allah loves His servant, He becomes the hearing with which he hears, and the sight with which he sees. Not that the human becomes God, but that the ego no longer steers.",
        },
        {
            "id": "signs",
            "title": "Signs of a lover",
            "scene": "moth",
            "body": ["Sufi manuals list the marks of real love. Tap one to hear it."],
            "cards": [
                {"title": "Dhikr", "text": "You remember the one you love without being reminded."},
                {"title": "Shawq", "text": "Longing: the ache to be closer, even after prayer."},
                {"title": "Uns", "text": "Intimacy: solitude with God feels like company, not emptiness."},
                {"title": "Rida", "text": "You accept the Beloved's decisions, even the hard ones."},
                {"title": "Khidmat", "text": "Service to His creation, because they belong to Him."},
                {"title": "Haya", "text": "A loving shyness: you do not want to be seen by Him doing wrong."},
            ],
            "narration": "The signs of a lover: remembrance, longing, intimacy, contentment, service, and a loving shyness before the Beloved.",
        },
        {
            "id": "ishq-poetry",
            "title": "Love in Urdu poetry",
            "scene": "firevalley",
            "body": ["Three masters on love, and a new ghazal written for this project, \"Daur ke aata hai woh\", He comes running."],
            "verses": ISHQ_CLASSICAL + ISHQ_ORIGINAL,
            "narration": "Mir says love fills the whole universe. Ghalib says it is a fire no one controls. Iqbal says love leapt into Nimrod's fire while reason stood on the rooftop watching.",
        },
    ],
    "film": {
        "title": "The Thirty Birds",
        "intro": "An animated retelling of Fariduddin Attar's Conference of the Birds, the great allegory of the soul's journey of love, followed by love poetry.",
        "shots": [
            {"scene": "birds", "caption": "Once, all the birds of the world gathered. Their world had no king, and they longed for one.", "dur": 8},
            {"scene": "hoopoe", "caption": "The hoopoe, who had served the Prophet Sulaiman, told them of the Simurgh, the true king, who lives beyond Mount Qaf.", "dur": 9},
            {"scene": "birds", "caption": "The birds made excuses. The nightingale could not leave its rose. The parrot loved its golden cage. The duck would not leave its water.", "dur": 9},
            {"scene": "valleys", "caption": "Those who set out faced seven valleys: the Quest, Love, Knowledge, Detachment, Unity, Bewilderment, and finally Passing Away.", "narration": "Those who set out faced seven valleys. The Quest. Love. Knowledge. Detachment. Unity. Bewilderment. And finally, passing away.", "dur": 17},
            {"scene": "firevalley", "caption": "In the valley of Love the road is fire. A lover does not ask how far it is, only how near.", "dur": 9},
            _v(ISHQ_CLASSICAL[2], "firevalley", "Iqbal says the same. Love leapt fearlessly into Nimrod's fire, while reason stood on the rooftop, watching. And the fire became cool."),
            {"scene": "valleys", "caption": "Thousands set out. Most turned back or fell along the way. Only thirty birds arrived.", "dur": 8},
            {"scene": "lake", "caption": "At the court of the Simurgh they found only a still lake. In it they saw thirty birds. In Persian, thirty birds is si murgh.", "dur": 11},
            {"scene": "mirror", "caption": "The journey had cleaned their hearts until they could reflect His light. They had not become the King. Every veil between them had simply fallen.", "dur": 10},
            _v(ISHQ_ORIGINAL[0], "approach", "And the secret of the whole journey: if we walk one step, He comes running."),
            _v(ISHQ_ORIGINAL[2], "approach", "Where did we learn this art of love? He taught it by loving us first."),
            _v(ISHQ_CLASSICAL[0], "moth", "Mir Taqi Mir. Wherever you look, there is only love."),
        ],
    },
}

# ================================================================= KAINAAT
KAINAAT = {
    "slug": "kainaat",
    "title": "Kainaat",
    "title_ur": "کائنات",
    "subtitle": "The universe as the Sufis see it: a cosmos made of signs, light and praise.",
    "ambience": "cosmos",
    "hero_scene": "galaxy",
    "chapters": [
        {
            "id": "praise",
            "title": "A universe made of praise",
            "scene": "galaxy",
            "body": [
                "The Quran says the seven heavens and the earth and everything in them glorify Allah, and there is nothing that does not glorify Him with praise, but you do not understand their glorification (17:44).",
                "For Sufis this means the universe is not dead matter. Every galaxy, tree and atom is busy with its own dhikr. The human is the one creature that can choose to join in.",
            ],
            "genz": "The universe is not on mute. You just have not learned its language yet.",
            "narration": "There is nothing that does not glorify Him, but you do not understand their glorification. The universe is not dead matter. Everything is busy with its own dhikr.",
        },
        {
            "id": "signs",
            "title": "Signs on the horizons and within",
            "scene": "microcosm",
            "body": [
                "Allah says He will show people His signs on the horizons and within themselves (41:53). Sufis built a whole picture on this verse: the cosmos is the great world, al-alam al-kabir, and the human being is the small world, al-alam al-saghir, holding the whole universe in miniature.",
                "A couplet often attributed to Ali ibn Abi Talib puts it this way: you think you are a small body, yet the greatest world is folded up inside you.",
            ],
            "narration": "Signs on the horizons, and within yourselves. The cosmos is the great world. The human being is the small world, with the whole universe folded inside.",
        },
        {
            "id": "light",
            "title": "Light upon light",
            "scene": "niche",
            "body": [
                "The Verse of Light (24:35) says Allah is the Light of the heavens and the earth. His light is like a niche holding a lamp, the lamp inside a glass like a shining star, lit from a blessed olive tree neither of the east nor of the west. Light upon light.",
                "Imam al-Ghazali wrote a whole book on this verse, Mishkat al-Anwar. Sufis read the niche as the body, the glass as the heart and the lamp as the light of faith within it.",
            ],
            "narration": "Allah is the Light of the heavens and the earth. A niche, a lamp, a glass like a shining star. Light upon light. The niche is the body, the glass is the heart, the lamp is faith.",
        },
        {
            "id": "worlds",
            "title": "Four worlds",
            "scene": "worlds",
            "body": [
                "Many Sufi writers describe levels of existence. The exact names vary between schools, but a common South Asian scheme has four.",
            ],
            "cards": [
                {"title": "Nasut", "text": "The human, physical world of bodies and senses."},
                {"title": "Malakut", "text": "The unseen angelic world of souls and meanings."},
                {"title": "Jabarut", "text": "The world of divine power and decree."},
                {"title": "Lahut", "text": "The divine level itself, beyond every form and image."},
            ],
            "narration": "Four worlds. Nasut, the physical. Malakut, the unseen angelic world. Jabarut, the world of power. And Lahut, the divine, beyond every form.",
        },
        {
            "id": "unity",
            "title": "One sun, many mirrors",
            "scene": "mirrors",
            "body": [
                "Ibn Arabi's school is linked to wahdat al-wujud, the unity of being: only God truly exists in Himself, and everything else exists only as a manifestation of His names, like one sun reflected in countless mirrors.",
                "Shaykh Ahmad Sirhindi in India taught wahdat al-shuhud, the unity of witnessing: the oneness is in what the seeker experiences, while creation is real but only a shadow of the real.",
                "Both reject the idea that the universe is God. The sun is not the mirror, and the mirror is nothing without the sun.",
            ],
            "verses": KAINAAT_CLASSICAL[:1],
            "narration": "One sun, a thousand mirrors. Ibn Arabi spoke of the unity of being. Sirhindi spoke of the unity of witnessing. Both agree: the sun is not the mirror, and the mirror is nothing without the sun.",
        },
        {
            "id": "renewal",
            "title": "Created again every moment",
            "scene": "renewal",
            "body": [
                "The Quran says every day He is in a new matter (55:29). Ibn Arabi taught that creation is renewed at every instant: the world is being given existence again and again, so continuously that it looks solid and permanent.",
            ],
            "genz": "Like a video at a frame rate so high it looks like reality. Every frame is a gift.",
            "narration": "Every day, He is in a new matter. Creation is renewed at every instant, so fast it looks solid.",
        },
        {
            "id": "dance",
            "title": "The cosmic dance",
            "scene": "cosmicwhirl",
            "body": [
                "Seen from above the north pole, the planets travel around the sun counterclockwise. Pilgrims circle the Kaaba counterclockwise. The Mevlevi dervish turns counterclockwise too, right hand raised to receive, left hand lowered to give.",
                "Mevlevi teachers describe the sama as joining the turning of everything that exists. This is a symbol, not a scientific claim, and the Sufis themselves offered it as one.",
            ],
            "narration": "The planets circle the sun counterclockwise. Pilgrims circle the Kaaba counterclockwise. The dervish turns the same way, joining the turning of everything that exists.",
        },
        {
            "id": "hairat",
            "title": "Hairat: the station of wonder",
            "scene": "galaxy",
            "body": [
                "Astronomers now estimate that the observable universe holds hundreds of billions to trillions of galaxies. Sufism does not compete with science. It asks what to do with what science shows.",
                "The answer is hairat, bewilderment. In Attar's valleys it is the sixth station: the seeker sees so much that every certainty of the ego dissolves into awe.",
            ],
            "verses": KAINAAT_CLASSICAL[1:],
            "narration": "Hundreds of billions of galaxies. Sufism does not compete with science. It asks what you do with what you see. The answer is hairat: wonder that dissolves the ego.",
        },
        {
            "id": "nazm",
            "title": "The dhikr of the cosmos",
            "scene": "orbits",
            "body": ["A short nazm written for this project, joining the human heart to the turning universe."],
            "verses": [KAINAAT_NAZM, ISHQ_CLASSICAL[0]],
            "narration": "The stars turn in their orbits, remembering. The atoms dance in His praise. I am human, and I am in this same circle.",
        },
    ],
    "film": {
        "title": "The Dhikr of the Cosmos",
        "intro": "An animated journey from a hidden treasure to the turning galaxies, the atom and the human heart.",
        "shots": [
            {"scene": "genesis", "caption": "A saying loved by the Sufis begins it all: I was a hidden treasure, and I loved to be known, so I created creation.", "dur": 9},
            {"scene": "niche", "caption": "Allah is the Light of the heavens and the earth. Light upon light.", "dur": 8},
            {"scene": "galaxy", "caption": "Hundreds of billions of galaxies turn. There is nothing that does not glorify Him, but you do not understand their glorification.", "dur": 10},
            {"scene": "orbits", "caption": "Planets circle their sun counterclockwise.", "dur": 6},
            {"scene": "tawaf", "caption": "Pilgrims circle the Kaaba counterclockwise.", "dur": 6},
            {"scene": "atom", "caption": "Down to the smallest particle, everything is in motion.", "dur": 6},
            {"scene": "microcosm", "caption": "And the human being holds the whole universe inside: signs on the horizons, and within yourselves.", "dur": 9},
            _v(KAINAAT_CLASSICAL[0], "mirrors", "Ghalib. The seeing, the seer and the seen are one in essence. One sun, a thousand mirrors."),
            {"scene": "renewal", "caption": "Every instant, creation is given existence again. Every day He is in a new matter.", "dur": 8},
            {"scene": "worlds", "caption": "From the physical world to the unseen, to the world of power, to the divine beyond all form, the soul is invited to rise.", "dur": 10},
            _v(KAINAAT_CLASSICAL[1], "galaxy", "Ghalib again. What we call visible is the unseen of the unseen. Those who wake inside a dream are still dreaming."),
            _v(KAINAAT_NAZM, "cosmicwhirl", "And a nazm written for this project. The stars turn, remembering. The atoms dance in His praise. I am human, and I am in this same circle.", 13),
            _v(ISHQ_CLASSICAL[0], "galaxy", "Mir Taqi Mir. Wherever you look, there is only love. Love is filling the whole universe."),
        ],
    },
}
