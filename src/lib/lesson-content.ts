
export interface Lesson {
    lessonID: string;
    title: string;
    order: number;
    objective: string;
    duration_minutes: number;
    content_sections: ContentSection[];
    resources: Resource[];
    assessment: Assessment;
}

interface ContentSection {
    type: string;
    heading: string;
    text?: string;
    verse?: string;
    commentary?: string;
    points?: { sub_heading: string; text: string }[];
    activity_type?: string;
    prompt?: string;
    challenge_details?: string;
}

interface Resource {
    type: string;
    title: string;
    url: string;
}

interface Assessment {
    type: string;
    quiz_id?: string;
    questions?: QuizQuestion[];
    question_text?: string;
    expected_keywords?: string[];
}

interface QuizQuestion {
    question_text: string;
    options: string[];
    correct_answer_index: number;
}


export const lessonContent = [
    {
        "moduleID": "KP_GodFirst_M1",
        "title": "Module 1: KP God First - Foundations of Kingdom Principles",
        "description": "This module lays the foundational understanding of putting God first in all aspects of life, particularly as it relates to Kingdom Principles (KP) and their application in entrepreneurship and daily living. It emphasizes the spiritual bedrock for a successful and purpose-driven life.",
        "order": 1,
        "lessons": [
            {
                "lessonID": "KP_GodFirst_M1_L1",
                "title": "The Supremacy of God: Understanding 'God First'",
                "order": 1,
                "objective": "Learners will understand the biblical concept of putting God first and its foundational importance for living a life aligned with Kingdom Principles.",
                "duration_minutes": 45,
                "content_sections": [
                    {
                        "type": "introduction",
                        "heading": "Welcome to Module 1: God First!",
                        "text": "Welcome to the start of our journey into Kingdom Principles. Before we build anything, we must lay a solid foundation. For us, that foundation is putting God first. This isn't just a religious phrase; it's a powerful principle for success in every area of your life, including your entrepreneurial ventures."
                    },
                    {
                        "type": "scripture_focus",
                        "heading": "Key Scripture: Matthew 6:33",
                        "verse": "'But seek first his kingdom and his righteousness, and all these things will be given to you as well.'",
                        "commentary": "This verse is central to understanding 'God First.' It teaches us that when our priority is God's Kingdom and His way of doing things, everything else we need for life and success will follow. It's an invitation to reorder our priorities."
                    },
                    {
                        "type": "teaching_point",
                        "heading": "What 'God First' Truly Means",
                        "points": [
                            {
                                "sub_heading": "Priority in All Things:",
                                "text": "It means intentionally placing God's will, His word, and His character above our own desires, plans, and ambitions. This applies to our time, finances, relationships, and business decisions."
                            },
                            {
                                "sub_heading": "Trust and Surrender:",
                                "text": "It's an act of faith – trusting that His ways are higher and ultimately lead to our greatest good, even when we don't fully understand. It's surrendering control to divine wisdom."
                            },
                            {
                                "sub_heading": "Foundation for Kingdom Principles:",
                                "text": "Without putting God first, Kingdom Principles become mere strategies. With God first, they become powerful tools for transformation and exponential growth that go beyond human understanding."
                            }
                        ]
                    },
                    {
                        "type": "interactive_activity",
                        "heading": "Reflection & Discussion Prompt:",
                        "activity_type": "text_input_or_discussion",
                        "prompt": "In what specific area of your life or your business currently do you find it most challenging to truly put God first? Why do you think this is, and what small step could you take this week to shift your priority?"
                    },
                    {
                        "type": "application_challenge",
                        "heading": "Weekly Challenge: The 'First Fruits' Principle (Time & Focus)",
                        "challenge_details": "For the next 7 days, commit to dedicating the 'first fruits' of your most energetic time each day to God. This could be 15-30 minutes of prayer, scripture reading, or quiet reflection *before* you dive into emails, social media, or work tasks. Observe how this shift impacts your day."
                    }
                ],
                "resources": [
                    {
                        "type": "video",
                        "title": "Introduction to Kingdom Principles & God First",
                        "url": "https://example.com/video-link-1"
                    },
                    {
                        "type": "article",
                        "title": "The Power of Prioritizing God in Entrepreneurship",
                        "url": "https://your-blog-link.com/god-first-entrepreneurship"
                    }
                ],
                "assessment": {
                    "type": "quiz",
                    "quiz_id": "M1_L1_Quiz",
                    "questions": [
                        {
                            "question_text": "According to Matthew 6:33, what should we seek first?",
                            "options": ["Wealth and success", "His kingdom and his righteousness", "Personal happiness", "Financial security"],
                            "correct_answer_index": 1
                        },
                        {
                            "question_text": "What does 'putting God first' primarily involve?",
                            "options": ["Attending church every Sunday", "Making Him the intentional priority in all areas of life", "Only praying when you need something", "Ignoring personal ambitions"],
                            "correct_answer_index": 1
                        }
                    ]
                }
            }
        ]
    },
    {
      "moduleID": "KP_KnowingYourWhy_M2",
      "title": "Module 2: Knowing Your Why - Unearthing Your Purpose",
      "description": "This module guides learners through a process of self-discovery to identify their core 'Why' – their deepest purpose, motivation, and values. Understanding this 'Why' is crucial for aligning personal and entrepreneurial pursuits with Kingdom Principles, ensuring sustainable passion and impact.",
      "order": 2,
      "lessons": [
        {
          "lessonID": "KP_KnowingYourWhy_M2_L1",
          "title": "The Power of Purpose: Discovering Your 'Why'",
          "order": 1,
          "objective": "Learners will understand the significance of identifying their personal and Kingdom-aligned 'Why' and begin the process of articulating it clearly.",
          "duration_minutes": 50,
          "content_sections": [
            {
              "type": "introduction",
              "heading": "Welcome to Module 2: Knowing Your Why!",
              "text": "Module 1 laid the foundational truth: God First. Now, we build on that by exploring *your* unique purpose within His grand design. Understanding your 'Why' is the fuel that will sustain you through challenges and clarify your direction, whether in life or business. It's about finding your Kingdom-aligned purpose."
            },
            {
              "type": "scripture_focus",
              "heading": "Key Scripture: Proverbs 29:18a",
              "verse": "'Where there is no revelation, people cast off restraint.' (NIV)",
              "commentary": "This verse highlights the importance of vision and purpose. Without a clear 'Why' (revelation or vision), we lack direction and can become aimless or unfocused. A Kingdom 'Why' provides divine restraint and guidance, leading to fruitfulness."
            },
            {
              "type": "teaching_point",
              "heading": "Why Your 'Why' Matters for Kingdom Principles",
              "points": [
                {
                  "sub_heading": "Clarity and Direction:",
                  "text": "Your 'Why' acts as a compass, ensuring your decisions and actions are aligned with your ultimate purpose, preventing distractions and wasted effort."
                },
                {
                  "sub_heading": "Resilience and Perseverance:",
                  "text": "When challenges arise (and they will!), your 'Why' provides the intrinsic motivation to keep going. It's the reason you started, and the reason you'll persist."
                },
                {
                  "sub_heading": "Impact and Legacy:",
                  "text": "A clear 'Why' rooted in Kingdom values allows you to measure true success not just by profit, but by the positive, God-honoring impact you make in the world."
                },
                {
                  "sub_heading": "Attracting Alignment:",
                  "text": "People, resources, and opportunities are drawn to clarity of purpose. Articulating your 'Why' helps you attract partners and clients who resonate with your values."
                }
              ]
            },
            {
              "type": "interactive_activity",
              "heading": "Exercise: The 5 Whys (Kingdom Edition)",
              "activity_type": "text_input",
              "prompt": "Start with something you want to achieve or build (e.g., 'I want to start a business.' or 'I want to improve my community.'). Then, ask 'Why?' five times, digging deeper into your motivations each time, always bringing it back to a Kingdom perspective. \n\nExample:\n1. I want to build a business. Why?\n2. To gain financial freedom. Why?\n3. To be able to bless others and fund Kingdom initiatives. Why?\n4. Because I believe God has called me to be a steward of resources for His glory. Why?\n5. To demonstrate His generosity and advance His Kingdom on Earth."
            },
            {
              "type": "application_challenge",
              "heading": "Weekly Challenge: Craft Your Draft 'Why' Statement",
              "challenge_details": "Based on today's lesson and the '5 Whys' exercise, draft a concise 'Why' statement for your life or your primary venture. It should be inspiring, purpose-driven, and reflect your commitment to putting God first. (Example format: 'To [contribute/impact/inspire] by [action/method] so that [desired outcome/Kingdom impact].')"
            }
          ],
          "resources": [
            {
              "type": "video",
              "title": "Finding Your God-Given Purpose (Sermon/Talk)",
              "url": "https://example.com/video-link-2"
            },
            {
              "type": "article",
              "title": "The Importance of Purpose-Driven Leadership",
              "url": "https://your-blog-link.com/purpose-driven-leadership"
            },
            {
              "type": "template",
              "title": "Why Statement Worksheet",
              "url": "https://your-resource-link.com/why-worksheet.pdf"
            }
          ],
          "assessment": {
            "type": "short_answer",
            "question_text": "In your own words, explain how understanding your 'Why' can contribute to resilience in the face of entrepreneurial challenges.",
            "expected_keywords": ["motivation", "perseverance", "clarity", "purpose", "God-given", "endurance"]
          }
        }
      ]
    },
    {
        "moduleID": "KP_BallIsLife_M3",
        "title": "Module 3: Ball Is Life - Life Lessons from the Court",
        "description": "This module explores the profound parallels between the game of basketball and the journey of life. Learners will discover how principles of teamwork, discipline, resilience, strategy, and continuous improvement, evident on the court, can be applied to transform their outlook, achieve personal goals, and fulfill their Kingdom purpose.",
        "order": 3,
        "lessons": [
            {
            "lessonID": "KP_BallIsLife_M3_L1",
            "title": "Court to Life: Mindset & Resilience",
            "order": 1,
            "objective": "Learners will identify key mindset principles from basketball (e.g., resilience, adaptability, focus) and understand how to apply them to daily life challenges and entrepreneurial endeavors.",
            "duration_minutes": 55,
            "content_sections": [
                {
                "type": "introduction",
                "heading": "Welcome to Module 3: Ball Is Life!",
                "text": "For many, basketball is more than a game; it's a metaphor for life. The court becomes a classroom for crucial lessons in strategy, teamwork, discipline, and especially, mindset. In this module, we'll draw parallels between the highs and lows of the game and the realities of your personal and professional journey, equipping you with a winning outlook rooted in Kingdom Principles."
                },
                {
                "type": "scripture_focus",
                "heading": "Key Scripture: Philippians 4:13",
                "verse": "'I can do all this through him who gives me strength.'",
                "commentary": "This verse is the ultimate 'game-winner' mindset. Just as an athlete relies on training and team, we rely on divine strength. It speaks to the resilience and inner fortitude available to us, regardless of the 'score' or the 'opponent' we face in life. It's not about our ability, but His power working through us."
                },
                {
                "type": "teaching_point",
                "heading": "Lessons from the Hardwood: Mindset in Action",
                "points": [
                    {
                    "sub_heading": "Resilience: Bouncing Back from Turnovers & Missed Shots",
                    "text": "In basketball, mistakes happen constantly. The best players don't dwell; they have short memories, learn, and immediately refocus on the next play. In life and business, failures and setbacks are inevitable. Resilience is about quickly recovering, adjusting, and moving forward with faith, knowing God is still in control."
                    },
                    {
                    "sub_heading": "Adaptability: Adjusting to the Defense",
                    "text": "No game plan survives first contact with the opponent. Players must adapt on the fly to new defensive schemes, injuries, or changing momentum. Life is no different. Flexibility, willingness to pivot, and relying on divine guidance when plans change are crucial Kingdom principles for success."
                    },
                    {
                    "sub_heading": "Focus & Awareness: Blocking Out the Crowd",
                    "text": "Elite players maintain focus amidst noise, pressure, and distractions. They are aware of their teammates, opponents, and the clock. In life, staying focused on your 'Why' (Module 2) and God's leading, while being aware of your surroundings, helps you perform optimally and avoid unnecessary pressure."
                    },
                    {
                    "sub_heading": "Confidence (Rooted in Training, Not Arrogance):",
                    "text": "True athletic confidence comes from consistent practice and knowing you've put in the work. For us, confidence comes from faithfully seeking God first (Module 1), understanding our purpose, and trusting in His strength, not solely our own abilities. This isn't pride, but assurance."
                    }
                ]
                },
                {
                "type": "interactive_activity",
                "heading": "Reflection & Application: Your 'Game Time' Moment",
                "activity_type": "text_input_or_discussion",
                "prompt": "Think of a recent setback or challenge you faced in your personal life or business. How did you react? Applying the basketball principles of resilience, adaptability, or focus, what's one different action or mindset shift you could have made, or will make next time, to 'win' that moment from a Kingdom perspective?"
                },
                {
                "type": "application_challenge",
                "heading": "Weekly Challenge: Practice the 'Next Play' Mentality",
                "challenge_details": "This week, when you experience a small failure, mistake, or moment of frustration (a 'turnover'), consciously pause, acknowledge it without dwelling, and immediately ask yourself: 'What's the next faithful play?' Then, take that action, trusting God with the outcome. Document your experience."
                }
            ],
            "resources": [
                {
                "type": "video",
                "title": "Interview: NBA Coach on Mindset & Faith",
                "url": "https://example.com/ballislife-mindset-video"
                },
                {
                "type": "article",
                "title": "The Spiritual Discipline of Resilience",
                "url": "https://your-blog-link.com/spiritual-resilience"
                },
                {
                "type": "podcast",
                "title": "From the Court to the Kingdom: Athlete Testimonies",
                "url": "https://example.com/athlete-testimony-podcast"
                }
            ],
            "assessment": {
                "type": "quiz",
                "quiz_id": "M3_L1_Quiz",
                "questions": [
                {
                    "question_text": "According to the lesson, what is a key takeaway from how basketball players handle missed shots?",
                    "options": ["They dwell on their mistakes", "They immediately blame teammates", "They practice a 'short memory' and focus on the next play", "They quit the game"],
                    "correct_answer_index": 2
                },
                {
                    "question_text": "Philippians 4:13 emphasizes strength from what source?",
                    "options": ["Personal willpower", "Team support", "Human connections", "Christ who gives strength"],
                    "correct_answer_index": 3
                }
                ]
            }
            }
        ]
    },
    {
        "moduleID": "KP_ArtOfWhatIf_M4",
        "title": "Module 4: The Art of What If",
        "description": "This module encourages reframing thinking, focusing on positive possibilities, weighing choices, and embracing calculated risks.",
        "order": 4,
        "lessons": [
            {
                "lessonID": "KP_ArtOfWhatIf_M4_L1",
                "title": "The Art of What If",
                "order": 1,
                "objective": "Learners will be able to reframe negative 'what if' scenarios into positive possibilities and make informed, calculated risks.",
                "duration_minutes": 40,
                "content_sections": [
                    {
                        "type": "teaching_point",
                        "heading": "Exploring Possibilities",
                        "points": [
                            { 
                                "sub_heading": "Beyond the Negative 'What If'", 
                                "text": "Often, our minds jump to the worst-case 'what if' scenarios. We imagine all the things that could go wrong, paralyzing us from taking action. But what if we flipped that script? This lesson will challenge you to identify your negative 'what ifs' and then intentionally reframe them into positive possibilities. Remember, the regret of not trying at all often outweighs the fear of failure."
                            },
                            { 
                                "sub_heading": "Weighing the Good with the Bad", 
                                "text": "Life is full of choices, and every choice comes with potential risks and rewards. This lesson will teach you how to conduct a 'What If' assessment. For any decision you're facing, list out the potential positive outcomes ('what if it goes right?') and the potential negative outcomes ('what if it goes wrong?'). You'll likely discover that for many things you're contemplating, the potential good far outweighs the bad."
                            },
                            { 
                                "sub_heading": "Embracing Calculated Risks", 
                                "text": "Once you've analyzed your 'what ifs,' this lesson encourages you to embrace calculated risks. A calculated risk isn't about recklessness; it's about making informed decisions where the potential upside is significant, and the downside is manageable. We'll explore strategies for mitigating potential negative outcomes while still pushing yourself beyond your comfort zone."
                            },
                            { 
                                "sub_heading": "Stories of 'What If' Success", 
                                "text": "Throughout history, countless individuals have achieved extraordinary things by daring to ask 'what if' and taking a chance. This lesson will feature inspiring success stories of people who took a leap of faith, faced their fears, and reaped incredible rewards. Their journeys will demonstrate the transformative power of focusing on positive possibilities and taking action."
                            }
                        ]
                    }
                ],
                "resources": [],
                "assessment": {
                    "type": "quiz",
                    "quiz_id": "M4_L1_Quiz",
                    "questions": [
                        {
                            "question_text": "Which of the following best describes the core idea of 'The Art of What If'?",
                            "options": [
                                "Always expecting the worst-case scenario.",
                                "Reframing negative thoughts into positive possibilities.",
                                "Avoiding all risks in life.",
                                "Only focusing on the past."
                            ],
                            "correct_answer_index": 1
                        }
                    ]
                }
            }
        ]
    },
    {
        "moduleID": "KP_LinkedIn_M5",
        "title": "Module 5: LinkedIn - Professional Networking",
        "description": "This module covers the importance of professional networking, crafting a compelling online presence, and finding mentors.",
        "order": 5,
        "lessons": [
            {
                "lessonID": "KP_LinkedIn_M5_L1",
                "title": "LinkedIn: Build Your Professional Brand",
                "order": 1,
                "objective": "Learners will understand how to build and maintain a professional online presence using platforms like LinkedIn.",
                "duration_minutes": 35,
                "content_sections": [
                     {
                        "type": "teaching_point",
                        "heading": "Professional Branding and Networking",
                        "points": [
                            { 
                                "sub_heading": "Beyond Social Media: Your Professional Hub", 
                                "text": "Just as you curate your social media for personal connections, LinkedIn is your dedicated platform for professional growth. This lesson will help you understand why treating your LinkedIn profile with the same, if not more, importance as your TikTok or Instagram can open doors to incredible opportunities. We'll explore how to view LinkedIn not just as a job board, but as a dynamic space for building your professional brand and making meaningful connections."
                            },
                            { 
                                "sub_heading": "Crafting a Compelling Online Presence", 
                                "text": "Your LinkedIn profile is your digital resume and professional storefront. This lesson will guide you through creating a profile that stands out. We'll cover optimizing your headline, writing an engaging summary, showcasing your skills and experience effectively, and choosing a professional profile picture. The goal is to make your profile a magnet for opportunities and connections in your desired field."
                            },
                            { 
                                "sub_heading": "Building Genuine Connections, Not Just Contacts", 
                                "text": "Networking isn't just about collecting contacts; it's about building genuine relationships. This lesson will teach you strategies for connecting with real people in professions you aspire to enter. We'll discuss how to send personalized connection requests, engage meaningfully with content, and initiate conversations that can lead to valuable mentorships and collaborations. Remember, the quality of your network often dictates the quality of your opportunities."
                            },
                            { 
                                "sub_heading": "The Power of Playing Up: Mentorship and Growth", 
                                "text": "Think about sports: athletes who 'play up' with more experienced players often develop faster. The same principle applies in the professional world. This lesson will emphasize the immense value of connecting with and learning from seasoned professionals. We'll provide tips on identifying potential mentors, reaching out effectively, and nurturing these relationships to accelerate your professional growth."
                            }
                        ]
                    }
                ],
                "resources": [],
                "assessment": {
                    "type": "quiz",
                    "quiz_id": "M5_L1_Quiz",
                    "questions": [
                        {
                            "question_text": "What is the primary purpose of LinkedIn as discussed in the lesson?",
                            "options": [
                                "Sharing personal life updates with friends.",
                                "Building a professional brand and network.",
                                "Watching viral videos.",
                                "Playing games."
                            ],
                            "correct_answer_index": 1
                        }
                    ]
                }
            }
        ]
    },
    {
        "moduleID": "KP_ConsistencyDiscipline_M6",
        "title": "Module 6: Consistency and Discipline",
        "description": "This module teaches the power of daily habits, the compound effect of consistent effort, and how discipline builds mental toughness.",
        "order": 6,
        "lessons": [
            {
                "lessonID": "KP_ConsistencyDiscipline_M6_L1",
                "title": "The Power of Showing Up",
                "order": 1,
                "objective": "Learners will understand that consistency is their greatest ally and how small, daily efforts lead to exponential growth.",
                "duration_minutes": 30,
                "content_sections": [
                    {
                        "type": "teaching_point",
                        "heading": "The Foundations of Achievement",
                        "points": [
                             { 
                                "sub_heading": "Your Most Reliable Ally: Showing Up for Yourself", 
                                "text": "In life, circumstances and people can change, but there are two constants: yourself and God. This lesson emphasizes the profound truth that the only person guaranteed to show up for you, every single day, is you. We'll explore how consistent effort and unwavering discipline build an unshakeable foundation of self-reliance, ensuring you are never truly alone on your journey. It's about cultivating an inner commitment that fuels your progress regardless of external factors."
                            },
                            { 
                                "sub_heading": "The Magic of Compound Interest (Beyond Money)", 
                                "text": "You've likely heard of compound interest in finance, where small investments grow exponentially over time. This lesson reveals that the same powerful principle applies to your personal growth. We'll illustrate how someone who commits to daily, consistent action will progress significantly faster—often ten times faster—than someone who works sporadically. Discover how small, consistent efforts accumulate into massive, transformative results in every area of your life."
                            },
                            { 
                                "sub_heading": "Forging Mental Toughness Through Discipline", 
                                "text": "Discipline isn't about punishment; it's about empowerment. This lesson delves into how"
                            }
                        ]
                    }
                ],
                "resources": [],
                "assessment": { "type": "none" }
            }
        ]
    },
    {
        "moduleID": "KP_Authenticity_M7",
        "title": "Module 7: Authenticity",
        "description": "This module explores the power of being your true self, embracing unique strengths, and building genuine confidence.",
        "order": 7,
        "lessons": [
            {
                "lessonID": "KP_Authenticity_M7_L1",
                "title": "Authenticity: Your Greatest Asset",
                "order": 1,
                "objective": "Learners will understand the importance of authenticity and gain strategies to embrace their unique strengths and overcome imposter syndrome.",
                "duration_minutes": 40,
                "content_sections": [
                     {
                        "type": "teaching_point",
                        "heading": "Embracing Your True Self",
                        "points": [
                            { 
                                "sub_heading": "The Power of Being Your True Self", 
                                "text": "In a world that often pressures us to conform, this lesson highlights the liberating power of authenticity. We'll explore why staying true to your core values and morals, regardless of the situation or audience, is fundamental to inner peace and lasting success. Whether you're in a professional setting requiring a different tone or a casual social gathering, your authentic self is your greatest asset. Discover how genuine self-expression can build trust and deeper connections."
                            },
                            { 
                                "sub_heading": "Embracing Your Unique Strengths", 
                                "text": "Each of us possesses a unique combination of talents, perspectives, and experiences. This lesson is dedicated to helping you identify and celebrate your individual strengths. We'll guide you through exercises designed to uncover what makes you uniquely you, fostering a deeper appreciation for your capabilities and contributions. Understanding your strengths is the first step towards confidently leveraging them in all areas of your life."
                            },
                            { 
                                "sub_heading": "Conquering Imposter Syndrome: You Belong Here", 
                                "text": "Imposter syndrome—the nagging feeling that you're not good enough or don't belong, despite evidence of your competence—can be debilitating. This lesson confronts imposter syndrome head-on. We'll help you recognize its signs and provide strategies to challenge those self-defeating thoughts. Remember, if you've been placed in a certain room or position, it's because you earned it and God has a purpose for you there. You are meant to be exactly where you are."
                            },
                            { 
                                "sub_heading": "Confidence in Your Core", 
                                "text": "True confidence stems from within, rooted in your authentic self. This lesson explores how embracing who you are naturally boosts your self-esteem and influences how others perceive you. We'll discuss practical ways to project genuine confidence, not arrogance, by being comfortable in your own skin. Learn to stand firm in your convictions and express yourself with clarity and conviction, knowing your value."
                            }
                        ]
                    }
                ],
                "resources": [],
                "assessment": {
                    "type": "quiz",
                    "quiz_id": "M7_L1_Quiz",
                    "questions": [
                        {
                            "question_text": "What is the core message of the 'Authenticity' module?",
                            "options": [
                                "Always conform to others' expectations.",
                                "You should change your core values based on the situation.",
                                "Always be yourself and be confident in your core values and morals.",
                                "Only show your true self in casual settings."
                            ],
                            "correct_answer_index": 2
                        },
                        {
                            "question_text": "What is a key benefit of embracing your unique strengths?",
                            "options": [
                                "It makes you exactly like everyone else.",
                                "It helps you avoid any challenges.",
                                "It fosters a deeper appreciation for your capabilities and contributions.",
                                "It means you don't need to develop new skills."
                            ],
                            "correct_answer_index": 2
                        },
                        {
                            "question_text": "What is 'Imposter Syndrome'?",
                            "options": [
                                "The feeling that you are more qualified than others.",
                                "The nagging feeling that you are not good enough or don't belong.",
                                "A type of confidence.",
                                "A feeling of excitement about new opportunities."
                            ],
                            "correct_answer_index": 1
                        },
                        {
                            "question_text": "Where does true confidence originate from, according to this module?",
                            "options": [
                                "External validation from others.",
                                "Conforming to popular trends.",
                                "Your authentic self and core values.",
                                "Avoiding all difficult situations."
                            ],
                            "correct_answer_index": 2
                        }
                    ]
                }
            }
        ]
    },
    {
        "moduleID": "KP_Togetherness_M8",
        "title": "Module 8: Togetherness",
        "description": "This module emphasizes the power of community, collaboration, and collective effort.",
        "order": 8,
        "lessons": [
            {
                "lessonID": "KP_Togetherness_M8_L1",
                "title": "The Power of Collective Effort",
                "order": 1,
                "objective": "Learners will understand the exponential impact of teamwork and community in achieving personal and collective goals.",
                "duration_minutes": 40,
                "content_sections": [
                    {
                        "type": "teaching_point",
                        "heading": "Stronger Together",
                        "points": [
                            {
                                "sub_heading": "The Dream of Collective Effort",
                                "text": "Imagine a world where everyone played their role perfectly, gave 100% effort, and worked together seamlessly. While perfect global harmony might be an ideal, this lesson encourages you to envision and build such micro-communities in your own life. We'll explore the profound potential that unlocks when individuals unite, demonstrating that collective effort is the fastest and most impactful way to achieve significant growth and positive change."
                            },
                            {
                                "sub_heading": "Why You Can't Do Everything Alone",
                                "text": "While personal initiative is vital, true mastery and large-scale impact rarely happen in isolation. This lesson emphasizes the limits of solo effort and the exponential power of collaboration. We'll discuss the wisdom in the adage, 'the more, the merrier,' illustrating how diverse skills, perspectives, and energies amplify results far beyond what any single person could achieve."
                            },
                            {
                                "sub_heading": "Building Strong, Supportive Communities",
                                "text": "This lesson provides practical strategies for cultivating strong and supportive relationships, whether in your professional life, personal circles, or within your broader community. We'll explore effective communication, mutual respect, shared vision, and the importance of active participation in building cohesive and productive groups. Learn how to foster an environment where everyone feels valued and empowered to contribute."
                            },
                            {
                                "sub_heading": "Case Studies in Collaboration: Changing the World Together",
                                "text": "From groundbreaking scientific discoveries to successful social movements, history is rich with examples of what's possible when people work together. This lesson will showcase inspiring stories of impactful collaborations that have transformed industries, communities, and even the world. These real-world examples will serve as powerful testaments to the idea that we are all stronger together, and that unity can overcome seemingly insurmountable challenges."
                            }
                        ]
                    }
                ],
                "resources": [],
                "assessment": {
                    "type": "quiz",
                    "quiz_id": "M8_L1_Quiz",
                    "questions": [
                        {
                            "question_text": "What is the core message of the 'Togetherness' module?",
                            "options": [
                                "It's always best to work alone.",
                                "Collaboration and community lead to greater success and growth.",
                                "Individual effort is the only thing that matters.",
                                "Working with others makes things more complicated."
                            ],
                            "correct_answer_index": 1
                        },
                        {
                            "question_text": "According to the module, what is often the fastest way to grow something?",
                            "options": [
                                "Doing everything by yourself.",
                                "Avoiding all group projects.",
                                "Working together in small communities.",
                                "Competing against everyone else."
                            ],
                            "correct_answer_index": 2
                        },
                        {
                            "question_text": "Why is it emphasized that you cannot do everything alone?",
                            "options": [
                                "Because other people always know better than you.",
                                "To highlight the exponential power of diverse skills and energies working together.",
                                "Because working alone is boring.",
                                "To suggest you should never try anything on your own."
                            ],
                            "correct_answer_index": 1
                        },
                        {
                            "question_text": "Which of the following is crucial for building strong, supportive communities?",
                            "options": [
                                "Focusing only on your own needs.",
                                "Avoiding communication and shared goals.",
                                "Fostering effective communication and mutual respect.",
                                "Only interacting with people exactly like yourself."
                            ],
                            "correct_answer_index": 2
                        }
                    ]
                }
            }
        ]
    },
    {
        "moduleID": "KP_Perfection_M9",
        "title": "Module 9: Perfection - A Journey of Continuous Improvement",
        "description": "This module redefines perfection as a continuous journey of growth, not a static destination, encouraging users to embrace imperfection and strive for constant betterment.",
        "order": 9,
        "lessons": [
            {
                "lessonID": "KP_Perfection_M9_L1",
                "title": "Perfection: A Journey, Not a Destination",
                "order": 1,
                "objective": "Learners will redefine 'perfection' as a continuous journey of improvement and embrace imperfection as a key part of growth.",
                "duration_minutes": 40,
                "content_sections": [
                    {
                        "type": "teaching_point",
                        "heading": "The Path to Excellence",
                        "points": [
                            {
                                "sub_heading": "Perfection: A Journey, Not a Destination",
                                "text": "This lesson challenges the common misconception that perfection is a static state to be achieved. Instead, we'll explore 'perfection' as a dynamic and ongoing journey of continuous improvement. The goal isn't to reach an unattainable ideal, but to constantly strive for 'something better.' Embrace the understanding that true growth means never being comfortable or complacent with where you are, always seeking new heights and deeper understanding."
                            },
                            {
                                "sub_heading": "The Infinite Room to Grow",
                                "text": "No matter how accomplished you become, there is always, always room for growth. This lesson draws parallels with high-achievers, like LeBron James, who despite being arguably the greatest basketball player of all time, still embodies consistency and discipline (linking back to Module 6) by showing up every day to polish his game. This illustrates that continuous dedication, even at the pinnacle of success, is the pathway to sustained excellence. We'll inspire you to adopt this mindset of endless learning and refinement in your own life."
                            },
                            {
                                "sub_heading": "Embracing Imperfections and Action Over Procrastination",
                                "text": "The pursuit of 'perfection' can often lead to procrastination and discouragement, as individuals fear not meeting an impossible standard. This lesson emphasizes that nobody is perfect, and imperfection is a natural, essential part of the growth process. We'll encourage you to release the burden of needing to be flawless before you start. The key is to simply try what you want to try, knowing that every attempt, every mistake, and every step provides valuable lessons for continuous improvement. Start imperfectly, improve consistently."
                            },
                            {
                                "sub_heading": "Setting Realistic Expectations and Celebrating Progress",
                                "text": "This lesson provides tools for setting realistic expectations for your journey of growth, rather than striving for an immediate, flawless outcome. We'll guide you on how to break down larger goals into manageable steps, making the pursuit of 'better' less daunting and more achievable. Crucially, we'll also focus on the importance of acknowledging and celebrating your progress along the way. Recognizing your achievements, no matter how small, fuels motivation and reinforces the joy of continuous self-improvement."
                            }
                        ]
                    }
                ],
                "resources": [],
                "assessment": {
                    "type": "quiz",
                    "quiz_id": "M9_L1_Quiz",
                    "questions": [
                        {
                            "question_text": "What is the core idea of 'perfection' as discussed in this module?",
                            "options": [
                                "It's a fixed destination you eventually reach.",
                                "It means never making any mistakes.",
                                "It's a continuous journey of growth and improvement.",
                                "It only applies to a select few individuals."
                            ],
                            "correct_answer_index": 2
                        },
                        {
                            "question_text": "Why should you never be comfortable or complacent, even after achieving success?",
                            "options": [
                                "Because success is fleeting and always disappears.",
                                "Because there is always room to grow and improve.",
                                "Because you should always compare yourself to others.",
                                "Because being comfortable means you've failed."
                            ],
                            "correct_answer_index": 1
                        },
                        {
                            "question_text": "What is a common pitfall of striving for an unattainable 'perfect' outcome?",
                            "options": [
                                "It makes you try harder.",
                                "It leads to instant success.",
                                "It can cause procrastination and discouragement.",
                                "It ensures you will never make a mistake."
                            ],
                            "correct_answer_index": 2
                        }
                    ]
                }
            }
        ]
    }
];
