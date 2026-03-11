export interface GenerateOptions {
    includePunctuation?: boolean;
    includeNumbers?: boolean;
}

const punctuation = '.,?!:;\'"()-_'.split('');
const numbers = '0123456789'.split('');

export const modifyWordset = (words: string[], options: GenerateOptions): string[] => {
    let result = [...words];

    if (options.includeNumbers) {
        result = result.map(word => {
            if (Math.random() > 0.8) {
                const num = numbers[Math.floor(Math.random() * numbers.length)];
                return Math.random() > 0.5 ? word + num : num + word;
            }
            return word;
        });
    }

    if (options.includePunctuation) {
        result = result.map((word, i) => {
            if (Math.random() > 0.85) {
                const punc = punctuation[Math.floor(Math.random() * punctuation.length)];
                // Capitalize if it follows strong punc
                if (i > 0 && ['.', '!', '?'].includes(result[i - 1].slice(-1))) {
                    word = word.charAt(0).toUpperCase() + word.slice(1);
                }
                return word + punc;
            }
            return word;
        });

        // Always capitalize first word if punctuation is on
        if (result.length > 0) {
            result[0] = result[0].charAt(0).toUpperCase() + result[0].slice(1);
        }
    }

    return result;
};

export const sampleWords = [
    "the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog",
    "and", "then", "decides", "to", "have", "a", "little", "nap", "under",
    "the", "warm", "sun", "while", "the", "birds", "sing", "beautifully",
    "in", "the", "trees", "nearby", "everything", "seems", "perfect",
    "in", "this", "moment", "of", "pure", "serenity", "as", "time", "slows",
    "down", "and", "the", "world", "fades", "away"
];
