import { ALPHABETIZE, CONFIRMATION_QUESTION, CONTINUE_CHALLENGE, EVEN_NUMBER_OF_LETTER, MAX, SUM, TEAMS_QUESTION, TEAMS_YEAR_QUESTION, WORD_CONFIRMATION_QUESTION } from "../constants/question.constant";
import { ALL_LEAGUES, ALL_SPORTS } from "../constants/sport-data.constant";
import { mathUtil } from "./math.utility";
import data from "../data/data.json";
import { wordsUtil } from "./words.utility";


export const evaluateQuestion = (question: string): string | undefined => {
    if (question === CONFIRMATION_QUESTION || question === WORD_CONFIRMATION_QUESTION
        || question === CONTINUE_CHALLENGE) {
        return 'yes';
    } else if (question.includes(SUM) || question.includes(MAX)) {
        if(question.includes(MAX)) {
            return mathUtil(MAX, question);
        } else {
            return mathUtil(SUM, question);
        }
    } else if (question.includes(EVEN_NUMBER_OF_LETTER) || question.includes(ALPHABETIZE)) {
        if(question.includes(EVEN_NUMBER_OF_LETTER)) {
            return wordsUtil(EVEN_NUMBER_OF_LETTER, question);
        } else {
            return wordsUtil(ALPHABETIZE, question); 
        }
        
    } else if (question.includes(TEAMS_QUESTION) && question.includes("team:")) {
        const que = question.split('team')[0].trim().split(' ');
        const searchedTeam = que[que.length - 1];
        let result: any = null, teams: any = null;
        let searchTeam: any = question.split(':')[1]?.slice(0, -1).split(',');
        searchTeam = searchTeam.map((ele: string) => ele.trim());
        if (ALL_LEAGUES.includes(searchedTeam)) {
            result = data.filter(team => team.teamLeague === searchedTeam);
            teams = result.map((a: any) => a.teamName);
        } else {
            if (ALL_SPORTS.includes(searchedTeam)) {
                result = data.filter(team => team.sport === searchedTeam);
                teams = result.map((a: any) => a.teamName);
            }
        }
        const filteredArray = searchTeam.filter(function (n: any) {
            return teams.indexOf(n) !== -1;
        });
        return filteredArray.toString();
    } else if (question.includes(TEAMS_YEAR_QUESTION) && question.includes("established")) {
        const searchParam = question.slice(0, -1).split(' ');
        const year = searchParam[searchParam.length - 1];
        const result = data.filter(team => team.yearFounded === year);
        const teams = result.map((a: any) => a.teamName);
        return teams.toString();
    } else {
        return undefined;
    }
}