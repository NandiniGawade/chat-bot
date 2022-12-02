import * as _ from "lodash";
import { MAX, SUM } from "../constants/question.constant";

export const mathUtil = (operation: string, question: string): string | undefined => {
    let answer = '';
    switch(operation) {

        case SUM:
            answer = _.sum((question.match(/\d+/g) || []).map(n => parseInt(n))).toString();
            break;

        case MAX:
            answer = _.max((question.match(/\d+/g) || []).map(n => parseInt(n)))?.toString() || '0';
            break;
    }
    return answer;
}