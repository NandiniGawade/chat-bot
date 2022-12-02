import { evaluateQuestion } from '../utilities/question-processing';

describe("Utilities", () => {

    it("It should return team of NBA", () => {
        const question = 'Which of the following is an NBA team: Minnesota Twins, Minnesota Timberwolves, Vancouver Whitecaps FC?';
        const ans = evaluateQuestion(question);
        expect(ans).toBe('Minnesota Timberwolves')
    });

    it("It should return team of MLB", () => {
        const question = 'Which of the following is an MLB team: Houston Astros, Minnesota Timberwolves, Kansas City Royals?';
        const ans = evaluateQuestion(question);
        expect(ans).toBe('Houston Astros,Kansas City Royals')
    });
    
    it("It should return team of football", () => {
        const question = 'Which of the following is a football team: New York Giants, Jacksonville Jaguars, Detroit Tigers?';
        const ans = evaluateQuestion(question);
        expect(ans).toBe('New York Giants,Jacksonville Jaguars')
    });

    it("It should return team of soccer", () => {
        const question = 'Which of the following is a soccer team: New York Giants, Jacksonville Jaguars, Sporting Kansas City?';
        const ans = evaluateQuestion(question);
        expect(ans).toBe('Sporting Kansas City')
    });

    it("It should return team established in 2014", () => {
        const question = 'What sports teams in the data set were established in 2014?';
        const ans = evaluateQuestion(question);
        expect(ans).toBe('Ottawa Redblacks')
    });

    it("It should return team established in 1925", () => {
        const question = 'What sports teams in the data set were established in 1925?';
        const ans = evaluateQuestion(question);
        expect(ans).toBe('New York Giants')
    });

    it("It should return sum of the number 3,78,90", () => {
        const question = 'What is the sum of the following numbers: 3, 78, 90?';
        const ans = evaluateQuestion(question);
        expect(ans).toBe('171')
    });

    it("It should return largest of the number 3, -78, 90", () => {
        const question = 'What is the largest of the following numbers:: 3, -78, 90?';
        const ans = evaluateQuestion(question);
        expect(ans).toBe('90')
    });

    it("It should return even number of letters", () => {
        const question = 'Please repeat only the words with an even number of letters: ant, potato, quinine, too, five, javascript, closure, week.';
        const ans = evaluateQuestion(question);
        expect(ans).toBe(' potato, five, javascript, week')
    });

    it("It should alphabetize the following words: tea, coffee, cola, juice, water, milk.'", () => {
        const question = 'Please alphabetize the following words: tea, coffee, cola, juice, water, milk.';
        const ans = evaluateQuestion(question);
        expect(ans).toBe(' coffee, cola, juice, milk, tea, water')
    });

    it("It should alphabetize the following words: tea, Coffee, cola, juice, water, milk, Table.'", () => {
        const question = 'Please alphabetize the following words: Please alphabetize the following words: tea, Coffee, cola, juice, water, milk, Table.';
        const ans = evaluateQuestion(question);
        expect(ans).toBe(' Coffee, cola, juice, milk, Table, tea, water')
    });
});
    