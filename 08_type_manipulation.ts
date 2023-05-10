const languages = [
  {
    name: "Java",
    staticTyping: "nominal",
    coolness: 3,
  },
  {
    name: "JavaScript",
    staticTyping: "none",
    coolness: 1,
  },
  {
    name: "TypeScript",
    staticTyping: "structural",
    coolness: 6,
  },
];

type LanguageArray = typeof languages;

type Language = LanguageArray[number];

type LanguageName = Language["name"];

const bestLanguage: LanguageName = "typescript";



const coolnessDescriptions = [
  "super uncool",
  "uncool",
  "tolerable",
  "decent",
  "cool",
  "splendid",
];

function describe(language: Language): string {
  return language.name + " is " + coolnessDescriptions[language.coolness];
}
