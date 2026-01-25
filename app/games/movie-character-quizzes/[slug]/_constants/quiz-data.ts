export interface QuizQuestion {
  id: string;
  characterName: string;
  correctAnswer: string;
  options: string[];
  imageUrl?: string;
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  questions: QuizQuestion[];
}

export interface Opponent {
  id: string;
  name: string;
  country: string;
  avatarEmoji: string;
  difficulty: "easy" | "medium" | "hard";
}

// Computer opponents with varying difficulty
export const computerOpponents: Opponent[] = [
  {
    id: "opponent-1",
    name: "Sophia",
    country: "United States",
    avatarEmoji: "👩‍🦰",
    difficulty: "easy",
  },
  {
    id: "opponent-2",
    name: "Marcus",
    country: "Germany",
    avatarEmoji: "👨‍🦱",
    difficulty: "medium",
  },
  {
    id: "opponent-3",
    name: "Yuki",
    country: "Japan",
    avatarEmoji: "👩‍🦳",
    difficulty: "hard",
  },
];

// Quiz questions for different years
export const quizDataBySlug: Record<string, QuizData> = {
  "film-characters-2024": {
    id: "film-characters-2024",
    title: "Film Characters 2024",
    description: "Name the 2024 movies in which you can find these characters",
    totalQuestions: 15,
    questions: [
      {
        id: "q1",
        characterName: "Anxiety",
        correctAnswer: "Inside Out 2",
        options: [
          "Inside Out 2",
          "Moana 2",
          "Ghostbusters: Frozen Empire",
          "The Garfield Movie",
        ],
      },
      {
        id: "q2",
        characterName: "Optimus Prime",
        correctAnswer: "Transformers One",
        options: [
          "Gladiator II",
          "Deadpool and Wolverine",
          "Transformers One",
          "Dune: Part Two",
        ],
      },
      {
        id: "q3",
        characterName: "Wade Wilson",
        correctAnswer: "Deadpool & Wolverine",
        options: [
          "Deadpool & Wolverine",
          "Madame Web",
          "Kraven the Hunter",
          "Venom: The Last Dance",
        ],
      },
      {
        id: "q4",
        characterName: "Paul Atreides",
        correctAnswer: "Dune: Part Two",
        options: [
          "Kingdom of the Planet of the Apes",
          "Dune: Part Two",
          "Furiosa",
          "Gladiator II",
        ],
      },
      {
        id: "q5",
        characterName: "Beetlejuice",
        correctAnswer: "Beetlejuice Beetlejuice",
        options: [
          "Beetlejuice Beetlejuice",
          "A Quiet Place: Day One",
          "Alien: Romulus",
          "Nosferatu",
        ],
      },
      {
        id: "q6",
        characterName: "Maximus",
        correctAnswer: "Gladiator II",
        options: [
          "Gladiator II",
          "Dune: Part Two",
          "Kingdom of the Planet of the Apes",
          "Napoleon",
        ],
      },
      {
        id: "q7",
        characterName: "Furiosa",
        correctAnswer: "Furiosa: A Mad Max Saga",
        options: [
          "Furiosa: A Mad Max Saga",
          "The Fall Guy",
          "Rebel Moon",
          "Civil War",
        ],
      },
      {
        id: "q8",
        characterName: "Garfield",
        correctAnswer: "The Garfield Movie",
        options: ["Kung Fu Panda 4", "The Garfield Movie", "Migration", "IF"],
      },
      {
        id: "q9",
        characterName: "Po",
        correctAnswer: "Kung Fu Panda 4",
        options: [
          "Kung Fu Panda 4",
          "Migration",
          "The Wild Robot",
          "Despicable Me 4",
        ],
      },
      {
        id: "q10",
        characterName: "Gru",
        correctAnswer: "Despicable Me 4",
        options: ["The Garfield Movie", "Migration", "Despicable Me 4", "IF"],
      },
      {
        id: "q11",
        characterName: "Roz",
        correctAnswer: "The Wild Robot",
        options: ["The Wild Robot", "Migration", "Wish", "IF"],
      },
      {
        id: "q12",
        characterName: "Eddie Brock",
        correctAnswer: "Venom: The Last Dance",
        options: [
          "Kraven the Hunter",
          "Madame Web",
          "Joker: Folie à Deux",
          "Venom: The Last Dance",
        ],
      },
      {
        id: "q13",
        characterName: "Arthur Fleck",
        correctAnswer: "Joker: Folie à Deux",
        options: ["Joker: Folie à Deux", "The Crow", "Nosferatu", "Smile 2"],
      },
      {
        id: "q14",
        characterName: "Count Orlok",
        correctAnswer: "Nosferatu",
        options: ["The Crow", "Nosferatu", "Salem's Lot", "Abigail"],
      },
      {
        id: "q15",
        characterName: "Moana",
        correctAnswer: "Moana 2",
        options: ["The Little Mermaid", "Moana 2", "Wish", "Wonka"],
      },
    ],
  },
  "film-characters-2023": {
    id: "film-characters-2023",
    title: "Film Characters 2023",
    description: "Name the 2023 movies in which you can find these characters",
    totalQuestions: 15,
    questions: [
      {
        id: "q1",
        characterName: "Barbie",
        correctAnswer: "Barbie",
        options: ["Barbie", "Poor Things", "The Iron Claw", "Priscilla"],
      },
      {
        id: "q2",
        characterName: "J. Robert Oppenheimer",
        correctAnswer: "Oppenheimer",
        options: [
          "Oppenheimer",
          "Napoleon",
          "Killers of the Flower Moon",
          "Maestro",
        ],
      },
      {
        id: "q3",
        characterName: "Asha",
        correctAnswer: "Wish",
        options: ["Wish", "Elemental", "Strange World", "Nimona"],
      },
      {
        id: "q4",
        characterName: "Ember",
        correctAnswer: "Elemental",
        options: ["Wish", "Elemental", "Ruby Gillman", "Trolls Band Together"],
      },
      {
        id: "q5",
        characterName: "Miles Morales",
        correctAnswer: "Across the Spider-Verse",
        options: [
          "Across the Spider-Verse",
          "The Flash",
          "Blue Beetle",
          "Aquaman 2",
        ],
      },
      {
        id: "q6",
        characterName: "Bella Baxter",
        correctAnswer: "Poor Things",
        options: ["Saltburn", "Poor Things", "May December", "Priscilla"],
      },
      {
        id: "q7",
        characterName: "Caesar",
        correctAnswer: "Kingdom of the Planet of the Apes",
        options: [
          "65",
          "Kingdom of the Planet of the Apes",
          "The Creator",
          "Rebel Moon",
        ],
      },
      {
        id: "q8",
        characterName: "Indiana Jones",
        correctAnswer: "Indiana Jones and the Dial of Destiny",
        options: [
          "Indiana Jones and the Dial of Destiny",
          "Mission: Impossible",
          "The Marvels",
          "Fast X",
        ],
      },
      {
        id: "q9",
        characterName: "Ethan Hunt",
        correctAnswer: "Mission: Impossible - Dead Reckoning",
        options: [
          "John Wick 4",
          "Mission: Impossible - Dead Reckoning",
          "Fast X",
          "Equalizer 3",
        ],
      },
      {
        id: "q10",
        characterName: "John Wick",
        correctAnswer: "John Wick: Chapter 4",
        options: [
          "John Wick: Chapter 4",
          "The Expendables 4",
          "Equalizer 3",
          "The Beekeeper",
        ],
      },
      {
        id: "q11",
        characterName: "Mario",
        correctAnswer: "The Super Mario Bros. Movie",
        options: [
          "The Super Mario Bros. Movie",
          "Migration",
          "TMNT: Mutant Mayhem",
          "Puss in Boots",
        ],
      },
      {
        id: "q12",
        characterName: "Wonka",
        correctAnswer: "Wonka",
        options: [
          "Charlie and the Chocolate Factory",
          "Wonka",
          "Poor Things",
          "Saltburn",
        ],
      },
      {
        id: "q13",
        characterName: "Colt Seavers",
        correctAnswer: "The Fall Guy",
        options: [
          "The Fall Guy",
          "Bullet Train",
          "Anyone But You",
          "The Beekeeper",
        ],
      },
      {
        id: "q14",
        characterName: "Napoleon Bonaparte",
        correctAnswer: "Napoleon",
        options: [
          "Oppenheimer",
          "Napoleon",
          "Killers of the Flower Moon",
          "The Holdovers",
        ],
      },
      {
        id: "q15",
        characterName: "Groot",
        correctAnswer: "Guardians of the Galaxy Vol. 3",
        options: [
          "Guardians of the Galaxy Vol. 3",
          "The Marvels",
          "Ant-Man: Quantumania",
          "Secret Invasion",
        ],
      },
    ],
  },
  "film-characters-2022": {
    id: "film-characters-2022",
    title: "Film Characters 2022",
    description: "Name the 2022 movies in which you can find these characters",
    totalQuestions: 15,
    questions: [
      {
        id: "q1",
        characterName: "Maverick",
        correctAnswer: "Top Gun: Maverick",
        options: [
          "Top Gun: Maverick",
          "The Gray Man",
          "The Adam Project",
          "Bullet Train",
        ],
      },
      {
        id: "q2",
        characterName: "T'Challa",
        correctAnswer: "Black Panther: Wakanda Forever",
        options: [
          "Black Panther: Wakanda Forever",
          "Thor: Love and Thunder",
          "Doctor Strange 2",
          "The Batman",
        ],
      },
      {
        id: "q3",
        characterName: "Pinocchio",
        correctAnswer: "Guillermo del Toro's Pinocchio",
        options: [
          "Guillermo del Toro's Pinocchio",
          "Pinocchio (Disney)",
          "Wendell & Wild",
          "Strange World",
        ],
      },
      {
        id: "q4",
        characterName: "Jake Sully",
        correctAnswer: "Avatar: The Way of Water",
        options: [
          "Avatar: The Way of Water",
          "Jurassic World Dominion",
          "Black Adam",
          "Morbius",
        ],
      },
      {
        id: "q5",
        characterName: "Elvis Presley",
        correctAnswer: "Elvis",
        options: ["Elvis", "Blonde", "Babylon", "Amsterdam"],
      },
      {
        id: "q6",
        characterName: "Buzz Lightyear",
        correctAnswer: "Lightyear",
        options: [
          "Toy Story 5",
          "Lightyear",
          "Minions: Rise of Gru",
          "DC League of Super-Pets",
        ],
      },
      {
        id: "q7",
        characterName: "Mei Lee",
        correctAnswer: "Turning Red",
        options: ["Turning Red", "Encanto", "The Bad Guys", "Luca"],
      },
      {
        id: "q8",
        characterName: "Puss in Boots",
        correctAnswer: "Puss in Boots: The Last Wish",
        options: [
          "Puss in Boots: The Last Wish",
          "Shrek 5",
          "The Bad Guys",
          "Minions: Rise of Gru",
        ],
      },
      {
        id: "q9",
        characterName: "Bruce Wayne",
        correctAnswer: "The Batman",
        options: ["The Batman", "Black Adam", "The Flash", "Morbius"],
      },
      {
        id: "q10",
        characterName: "Gorr",
        correctAnswer: "Thor: Love and Thunder",
        options: [
          "Thor: Love and Thunder",
          "Doctor Strange 2",
          "Black Panther 2",
          "Eternals",
        ],
      },
      {
        id: "q11",
        characterName: "Wanda Maximoff",
        correctAnswer: "Doctor Strange in the Multiverse of Madness",
        options: [
          "Doctor Strange in the Multiverse of Madness",
          "Thor: Love and Thunder",
          "WandaVision",
          "Black Widow",
        ],
      },
      {
        id: "q12",
        characterName: "Sonic",
        correctAnswer: "Sonic the Hedgehog 2",
        options: [
          "Sonic the Hedgehog 2",
          "Chip 'n Dale",
          "Minions: Rise of Gru",
          "The Bad Guys",
        ],
      },
      {
        id: "q13",
        characterName: "Jack Sparrow",
        correctAnswer: "Pirates of the Caribbean: Dead Men Tell No Tales",
        options: [
          "Pirates of the Caribbean",
          "Amsterdam",
          "The Gray Man",
          "Glass Onion",
        ],
      },
      {
        id: "q14",
        characterName: "Minions",
        correctAnswer: "Minions: The Rise of Gru",
        options: [
          "Minions: The Rise of Gru",
          "Despicable Me 4",
          "The Bad Guys",
          "Lightyear",
        ],
      },
      {
        id: "q15",
        characterName: "Enola Holmes",
        correctAnswer: "Enola Holmes 2",
        options: [
          "Enola Holmes 2",
          "Glass Onion",
          "See How They Run",
          "Death on the Nile",
        ],
      },
    ],
  },
};

// Get quiz data by slug with fallback
export function getQuizData(slug: string): QuizData | null {
  return quizDataBySlug[slug] || null;
}
