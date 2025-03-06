export interface IFollowup {
  id: string,
  tags: string[],
  title: string,
  weight: number,
}

export interface IQuestion {
  id: string,
  tags: string[],
  title: string,
  weight: number,
  followUpQuestions: IFollowup[],
}

export interface ITheme {
  id: string,
  title: string,
  questions: Map<string, IQuestion>,
}

export interface ITopic {
  id: string,
  title: string,
  themes: Map<string, ITheme>,
}

export interface IDomain {
  id: string,
  title: string,
  topics: Map<string, ITopic>,
}
