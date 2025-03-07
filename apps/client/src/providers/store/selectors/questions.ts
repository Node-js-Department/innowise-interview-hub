import { TStateModel } from '..';

export const getQuestions = (state: TStateModel) => state?.questions.questions;
export const getQuestionsError = (state: TStateModel) => state?.questions.error;
export const getQuestionsIsLoading = (state: TStateModel) => state?.questions.loading;
