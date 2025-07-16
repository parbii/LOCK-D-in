
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
    }
];
