import * as _ from "lodash";
import { ALPHABETIZE, EVEN_NUMBER_OF_LETTER } from "../constants/question.constant";

export const wordsUtil = (operation: string, question: string): string | undefined => {
    let answer = '', result, numberString;
    numberString = question.split(":").pop() || '';
    numberString = numberString.substring(0, numberString.length - 1).split(',');

    switch(operation) {

        case EVEN_NUMBER_OF_LETTER:
            result = [];
            for (var i = 0; i < numberString.length; i++) {
                if ((numberString[i].length) % 2 === 1) {
                    result.push(numberString[i])
                }
            }
            answer = result.toString();
            break;

        case ALPHABETIZE:
            const res = numberString.sort( (a: string, b: string) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            answer = res.toString();
            break;
    }
    return answer;
}