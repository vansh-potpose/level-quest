import Item from "./components/Item";
import Reward from "./components/Reward";
import dayjs from 'dayjs';

// --- Example User ---
export const exampleUser = (claimItems) => {
    // Import dayjs at the top of  your file if not already imported
    // import dayjs from 'dayjs';

    const currentMonth = dayjs().month() + 1; // month is 0-indexed
    const currentYear = dayjs().format('YY');

    return {
        name: "User Name",
        profilePic: "/jinwoo-solo-leveling.webp",
        level: 1,
        exp: 50,
        health: 100,
        coins: 30000,
        job: "Hunter",
        stats: [
            { skill: "strength", level: 1, value: 50 },
            { skill: "agility", level: 1, value: 40 },
            { skill: "intelligence", level: 1, value: 60 },
            { skill: "Skill", level: 1, value: 70 },
            { skill: "stamina", level: 1, value: 80 },
            { skill: "luck", level: 1, value: 30 }
        ],
        about: "Commit2Hab1t is a powerful habit-tracking app designed to help you stay on top of your goals. It combines task tracking, data analysis, and AI-generated reports to provide deep insights into your habits and performance. The app is inspired by the 'Solo-Leveling' system, where users gain points and level up by completing tasks.",
        stregth: "discipline",
        weakness: "procrastination",
        masterObjective: "doing nothing",
        minorObjective: "doing nothing",
        inventory: [
            new Item({
                id: 19,
                name: "Health Potion",
                price: 100,
                description: "Restores 50 health points.",
                image: "/images.jpeg",
                type: "Magical Item",
                amount: 50,
                claimed: false,
                attribute_name: "health",
            }, claimItems),
            new Item({
                id: 20,
                name: "Mana Potion",
                price: 150,
                description: "Restores 30 mana points.",
                image: "/images.jpeg",
                type: "Magical_Item",
                amount: 50,
                claimed: false,
                attribute_name: "experience",
            }, claimItems),
        ],
        Tasks: [
            {
                id: 'task-1',
                name: 'Buy groceries',
                isCompleted: false,
                date: `3-${currentMonth}-${currentYear}`
            },
            {
                id: 'task-2',
                name: 'Doctor appointment',
                isCompleted: true,
                date: `7-${currentMonth}-${currentYear}`
            },
            {
                id: 'task-3',
                name: 'Team meeting',
                isCompleted: false,
                date: `12-${currentMonth}-${currentYear}`
            },
            {
                id: 'task-4',
                name: 'Workout session',
                isCompleted: false,
                date: `18-${currentMonth}-${currentYear}`
            },
            {
                id: 'task-5',
                name: 'Read a book',
                isCompleted: true,
                date: `25-${currentMonth}-${currentYear}`
            }
        ]
    };
};

// --- Example Store Items ---
export const exampleStoreItems = (claimItems, claimObjects) => [
    new Item({ id: 1, name: "Shadow Fight Game", price: 300, description: "Epic battles and martial arts.", image: "/shadow_fight.webp", type: "Object", amount: 1, claimed: false, attribute_name: "agility" }, claimObjects),
    new Item({ id: 2, name: "Playing Mobile Game", price: 300, description: "Immersive gaming experience.", image: "/mobile_game.jpg", type: "Object", amount: 1, claimed: false, attribute_name: "intelligence" }, claimObjects),
    new Item({ id: 3, name: "Gali Cricket", price: 300, description: "Play with friends in streets.", image: "/gali_cricket.jpeg", type: "Object", amount: 1, claimed: false, attribute_name: "strength" }, claimObjects),
    new Item({ id: 4, name: "Casio MTP 1183", price: 1000, description: "Stylish wristwatch with leather strap.", image: "/casio.webp", type: "Object", amount: 1, claimed: false, attribute_name: "luck" }, claimObjects),
    new Item({ id: 5, name: "Chatting With Her", price: 500, description: "Romantic texting session.", image: "/chatting.jpg", type: "Object", amount: 1, claimed: false, attribute_name: "health" }, claimObjects),
    new Item({ id: 6, name: "Butter Scotch Ice Cream", price: 300, description: "Delicious frozen dessert.", image: "/butterscotch-ice-cream.jpg", type: "Object", amount: 1, claimed: false, attribute_name: "health" }, claimObjects),
    new Item({ id: 7, name: "Meeting Her", price: 1500, description: "Calling her and asking her to meet, you both can talk, walk, dance, etc.", image: "/image_b.jpg", type: "Object", amount: 1, claimed: false, attribute_name: "stamina" }, claimObjects),
    new Item({ id: 8, name: "GYM membership", price: 500, description: "A gym membership that boosts your strength and stamina.", image: "/gym.webp", type: "Magical Item", amount: 60, claimed: false, attribute_name: "strength" }, claimItems),
    new Item({ id: 9, name: "Obstacle is the way", price: 400, description: "A book by that teaches how to turn adversity into advantage.", image: "/obstacle-is-the-way.jpg", type: "Magical Item", amount: 100, claimed: false, attribute_name: "experience" }, claimItems),
    new Item({ id: 10, name: "Movie night", price: 600, description: "Enjoy a relaxing evening watching your favorite movies together.", image: "/movie-night.webp", type: "Magical Item", amount: 100, claimed: false, attribute_name: "health" }, claimItems),
];

// --- Example Quests ---
export const exampleQuests = (claimItems) => [
    {
        id: 1,
        image: "/focus.png",
        name: "Deep Work Sprint",
        endDate: new Date(Date.now() + 3 * 86400000).toISOString(),
        description: "Work deeply on a single project for 3 hours without multitasking. Silence notifications and set a timer.",
        priority: "High",
        status: "Active",
        rewards: [
            new Reward("coins", { amount: 1500 }),
            new Reward("experience", { amount: 900 }),
            new Reward("skill", { skill: "focus", amount: 7 }),
        ],
        sub_quests: [
            {
                id: 1,
                name: "First 90 Minutes",
                completed: false,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: 75 }),
                    new Reward("experience", { amount: 45 }),
                ],
            },
            {
                id: 2,
                name: "Second 90 Minutes",
                completed: false,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: 75 }),
                    new Reward("experience", { amount: 45 }),
                ],
            },
        ],
    },
    {
        id: 2,
        image: "/hydra.jpg",
        name: "Ultimate Hydration",
        endDate: new Date(Date.now() + 2 * 86400000).toISOString(),
        description: "Drink 3 liters of water over two days. Log your intake after each bottle.",
        priority: "Medium",
        status: "Active",
        rewards: [
            new Reward("coins", { amount: 700 }),
            new Reward("experience", { amount: 350 }),
            new Reward("item", { item: new Item({ id: 202, name: "Smart Water Bottle", price: 200, description: "Tracks your hydration automatically.", image: "/smart-bottle.webp", type: "Object", amount: 1, claimed: false, attribute_name: "none" }, claimItems) }),
        ],
        sub_quests: [
            {
                id: 1,
                name: "Drink 1.5 Liters (Day 1)",
                completed: false,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: 35 }),
                    new Reward("experience", { amount: 18 }),
                ],
            },
            {
                id: 2,
                name: "Drink 1.5 Liters (Day 2)",
                completed: false,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: 35 }),
                    new Reward("experience", { amount: 17 }),
                ],
            },
        ],
    },
    {
        id: 3,
        image: "/images.jpeg",
        name: "Quest 3",
        endDate: new Date().toISOString(),
        description: "Just complete the quest page today itself, as it is important and needs to be completed today",
        priority: "High",
        status: "Completed",
        rewards: [
            new Reward("coins", { amount: 2000 }),
            new Reward("experience", { amount: 1000 }),
            new Reward("item", { item: new Item({ id: 102, name: "Sword", price: 2000, description: "A sharp blade for battle.", image: "/images.jpeg", type: "Weapon", amount: 1, claimed: false, attribute_name: "strength" }, claimItems) }),
        ],
        sub_quests: [
            {
                id: 1,
                name: "Sub-quest 1",
                completed: true,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: Math.floor(2000 * 0.05) }),
                    new Reward("experience", { amount: Math.floor(1000 * 0.05) }),
                ],
            },
            {
                id: 2,
                name: "Sub-quest 2",
                completed: false,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: Math.floor(2000 * 0.05) }),
                    new Reward("experience", { amount: Math.floor(1000 * 0.05) }),
                ],
            },
        ],
    },
    {
        id: 4,
        image: "/reading_book.jpg",
        name: "Read a Book",
        endDate: new Date(Date.now() + 86400000).toISOString(),
        description: "Finish reading at least 50 pages of a new book.",
        priority: "Medium",
        status: "Active",
        rewards: [
            new Reward("experience", { amount: 200 }),
            new Reward("skill", { skill: "intelligence", amount: 3 }),
        ],
        sub_quests: [
            {
                id: 1,
                name: "Read 25 pages",
                completed: true,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: 0 }),
                    new Reward("experience", { amount: Math.floor(200 * 0.05) }),
                ],
            },
            {
                id: 2,
                name: "Read 25 more pages",
                completed: false,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: 0 }),
                    new Reward("experience", { amount: Math.floor(200 * 0.05) }),
                ],
            },
        ],
    },
    {
        id: 5,
        image: "/morning-routine.webp",
        name: "Morning Routine",
        endDate: new Date(Date.now() + 2 * 86400000).toISOString(),
        description: "Complete your morning routine for two consecutive days.",
        priority: "High",
        status: "Active",
        rewards: [
            new Reward("coins", { amount: 800 }),
            new Reward("item", { item: new Item({ id: 104, name: "Coffee Mug", price: 200, description: "A mug to start your day.", image: "/images.jpeg", type: "Object", amount: 1, claimed: false, attribute_name: "none" }, claimItems) }),
        ],
        sub_quests: [
            {
                id: 1,
                name: "Day 1 Routine",
                completed: false,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: Math.floor(800 * 0.05) }),
                    new Reward("experience", { amount: 0 }),
                ],
            },
            {
                id: 2,
                name: "Day 2 Routine",
                completed: false,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: Math.floor(800 * 0.05) }),
                    new Reward("experience", { amount: 0 }),
                ],
            },
        ],
    },
    {
        id: 6,
        image: "/workout.jpg",
        name: "Workout Challenge",
        endDate: new Date(Date.now() + 3 * 86400000).toISOString(),
        description: "Complete a 30-minute workout for three days.",
        priority: "High",
        status: "Active",
        rewards: [
            new Reward("experience", { amount: 600 }),
            new Reward("skill", { skill: "strength", amount: 10 }),
        ],
        sub_quests: [
            {
                id: 1,
                name: "Day 1 Workout",
                completed: true,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: 0 }),
                    new Reward("experience", { amount: Math.floor(600 * 0.05) }),
                ],
            },
            {
                id: 2,
                name: "Day 2 Workout",
                completed: false,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: 0 }),
                    new Reward("experience", { amount: Math.floor(600 * 0.05) }),
                ],
            },
            {
                id: 3,
                name: "Day 3 Workout",
                completed: false,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: 0 }),
                    new Reward("experience", { amount: Math.floor(600 * 0.05) }),
                ],
            },
        ],
    },
    {
        id: 7,
        image: "/coding.jpg",
        name: "Code for 1 Hour",
        endDate: new Date(Date.now() + 3600000).toISOString(),
        description: "Spend at least 1 hour coding today.",
        priority: "Low",
        status: "Active",
        rewards: [
            new Reward("coins", { amount: 300 }),
            new Reward("experience", { amount: 150 }),
        ],
        sub_quests: [
            {
                id: 1,
                name: "30 minutes coding",
                completed: false,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: Math.floor(300 * 0.05) }),
                    new Reward("experience", { amount: Math.floor(150 * 0.05) }),
                ],
            },
            {
                id: 2,
                name: "Another 30 minutes coding",
                completed: false,
                claim: false,
                rewards: [
                    new Reward("coins", { amount: Math.floor(300 * 0.05) }),
                    new Reward("experience", { amount: Math.floor(150 * 0.05) }),
                ],
            },
        ],
    },
];


// --- Daily Challenge Example Data Structure ---
export const dailyChallenge = () => {
    // Rewards for completing all daily challenges
    const claimedDate = new Date(Date.now() - 86400000).toISOString(); // Example: yesterday's date
    const rewards = [
        new Reward("coins", { amount: 10 }),
        new Reward("experience", { amount: 10 }),
        new Reward("health", { amount: 5 }),
    ];

    // Template for today's daily challenges
    const challenges = [
        {
            id: 1,
            name: "Complete 5 Tasks",
            description: "Finish any 5 tasks from your to-do list today.",
            completed: false,
            skill: "Skill",
        },
        {
            id: 2,
            name: "Read for 30 Minutes",
            description: "Spend at least 30 minutes reading any book.",
            completed: false,
            skill: "intelligence",
        },
        {
            id: 3,
            name: "Drink 2L Water",
            description: "Stay hydrated by drinking at least 2 liters of water.",
            completed: false,
            skill: "stamina",
        },
        {
            id: 4,
            name: "Meditate for 10 Minutes",
            description: "Take a break and meditate for at least 10 minutes.",
            completed: false,
            skill: null,
        }
    ];

    // History of last 10 daily challenges
    const history = [
        
        {
            date: new Date(Date.now() -  86400000).toISOString(),
            challenges: [
                { id: 1, name: "Complete 5 Tasks", completed: true },
                { id: 2, name: "Read for 30 Minutes", completed: true },
                { id: 3, name: "Drink 2L Water", completed: true },
            ],
            rewardsClaimed: false,
        },

        {
            date: new Date(Date.now() - 2 * 86400000).toISOString(),
            challenges: [
                { id: 1, name: "Complete 5 Tasks", completed: false },
                { id: 2, name: "Read for 30 Minutes", completed: false },
                { id: 3, name: "Drink 2L Water", completed: false },
            ],
            rewardsClaimed: false,
        },


        {
            date: new Date(Date.now() - 3 * 86400000).toISOString(),
            challenges: [
                { id: 1, name: "Complete 5 Tasks", completed: false },
                { id: 2, name: "Read for 30 Minutes", completed: false },
                { id: 3, name: "Drink 2L Water", completed: false },
            ],
            rewardsClaimed: false,
        },
        {
            date: new Date(Date.now() - 4 * 86400000).toISOString(),
            challenges: [
                { id: 1, name: "Complete 5 Tasks", completed: true },
                { id: 2, name: "Read for 30 Minutes", completed: true },
                { id: 3, name: "Drink 2L Water", completed: true },
            ],
            rewardsClaimed: true,
        },
        {
            date: new Date(Date.now() - 5 * 86400000).toISOString(),
            challenges: [
                { id: 1, name: "Complete 5 Tasks", completed: false },
                { id: 2, name: "Read for 30 Minutes", completed: true },
                { id: 3, name: "Drink 2L Water", completed: false },
            ],
            rewardsClaimed: false,
        },
        {
            date: new Date(Date.now() - 6 * 86400000).toISOString(),
            challenges: [
                { id: 1, name: "Complete 5 Tasks", completed: true },
                { id: 2, name: "Read for 30 Minutes", completed: true },
                { id: 3, name: "Drink 2L Water", completed: true },
            ],
            rewardsClaimed: true,
        },
        {
            date: new Date(Date.now() - 7 * 86400000).toISOString(),
            challenges: [
                { id: 1, name: "Complete 5 Tasks", completed: false },
                { id: 2, name: "Read for 30 Minutes", completed: false },
                { id: 3, name: "Drink 2L Water", completed: true },
            ],
            rewardsClaimed: false,
        },
        {
            date: new Date(Date.now() - 8 * 86400000).toISOString(),
            challenges: [
                { id: 1, name: "Complete 5 Tasks", completed: true },
                { id: 2, name: "Read for 30 Minutes", completed: true },
                { id: 3, name: "Drink 2L Water", completed: true },
            ],
            rewardsClaimed: true,
        },
        {
            date: new Date(Date.now() - 9 * 86400000).toISOString(),
            challenges: [
                { id: 1, name: "Complete 5 Tasks", completed: false },
                { id: 2, name: "Read for 30 Minutes", completed: true },
                { id: 3, name: "Drink 2L Water", completed: false },
            ],
            rewardsClaimed: false,
        },
        {
            date: new Date(Date.now() - 10 * 86400000).toISOString(),
            challenges: [
                { id: 1, name: "Complete 5 Tasks", completed: true },
                { id: 2, name: "Read for 30 Minutes", completed: false },
                { id: 3, name: "Drink 2L Water", completed: true },
            ],
            rewardsClaimed: true,
        }
    ];

    return {
        date: new Date().toISOString(),
        challenges,
        rewards,
        history,
        claimedDate,
    };
};