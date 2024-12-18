import { z } from "zod";

export const CleanSourceFlashcardSchema = z.object({
	language: z.enum(["it", "es", "fr"]),
	front: z.string().min(1, { message: "cannot be empty" }),
	back: z.string().min(1, { message: "cannot be empty" }),
	whenCreated: z
		.string()
		.refine(
			(value) => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value),
			{
				message:
					"Invalid date/time format. Expected YYYY-MM-DD HH:mm:ss",
			}
		),
	extras: z.string(),
});

export type CleanSourceFlashcard = z.infer<typeof CleanSourceFlashcardSchema>;

export type RawLineItem = {
	chapter: number;
	lineNumber: number;
	rawText: string;
};

export type SmartLine = {
	number: number;
	rawTexts: {
		fr: string;
		sp: string;
		it: string;
	};
	plainTexts: {
		fr: string;
		sp: string;
		it: string;
	};
};

export type SmartBookChapter = {
	number: number;
	summary: string;
	smartLines: SmartLine[];
	rawLineItems: RawLineItem[];
};

export type SmartBook = {
	chapters: SmartBookChapter[];
};

export const smartBookInitialValue = {
	chapters: [],
};

export type RawFlashcard = {
	front: string;
	back: string;
};

export type Flashcard = {
	idCode: string;
	language: string;
	front: string;
	back: string;
	whenCreated: string;
	extras: string;
	bulkSearch: string;
};

export const emptyFlashcard: Flashcard = {
	idCode: "",
	language: "",
	front: "",
	back: "",
	whenCreated: "",
	extras: "",
	bulkSearch: "",
};

export type TestingStatus =
	| "typingAnswer"
	| "lookingAtWrongAnswer"
	| "lookingAtRightAnswer";

export type FlashcardAttempt = {
	when: string;
	answer: string;
	status: "right" | "wrong";
};

export type FlashcardHistoryItem = {
	attempts: FlashcardAttempt[];
	notes: string;
	timesAnsweredRight: number;
	timesAnsweredWrong: number;
	rank: number;
};

export const blankFlashcardHistoryItem: FlashcardHistoryItem = {
	attempts: [],
	notes: "",
	timesAnsweredRight: 0,
	timesAnsweredWrong: 0,
	rank: 2.5,
};

export type FlashcardHistory = {
	[key: string]: FlashcardHistoryItem;
};

export type User = {
	idCode: string;
	firstName: string;
	lastName: string;
	totalScore: number;
	flashcardHistory: FlashcardHistory;
};

export const blankUser = {
	idCode: "anonymous",
	firstName: "Guest",
	lastName: "User",
	totalScore: 0,
	flashcardHistory: {},
};

export type SiteLocation = "local" | "vercel";

export type FlashcardFilterItem = {
	idCode: string;
	label: string;
}