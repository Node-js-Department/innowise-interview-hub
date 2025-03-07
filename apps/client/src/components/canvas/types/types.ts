export interface IQuestion {
  id: string;
  weight?: number;
  tags?: TagType[];
  title: string;
  followUpQuestions?: IQuestion[];
}

export interface ITheme {
  title: string;
  questions: IQuestion[];
  id: string;
}

export interface ITopic {
  themes: ITheme[];
  title: string;
  id: string;
}

export interface ISetInterview {
  title: string;
  topics: ITopic[];
  id: string;
}

export type TagType = "middle" | "senior" | "junior";

export type NodeType = "questionNode" | "domainNode" | "themeNode" | "topicNode" | "followUpNode"

export interface INode {
  id: string;
  type: NodeType;
  data: {
    label: string;
    weight?: number;
    tags?: TagType[];
  };
  coreTitle?: string;
  topicTitle?: string;
  themeTitle?: string;
  questionTitle?: string;
}

export interface INodeContent {
  label: string;
}

export interface ILayoutNode extends INode {
  targetPosition: string
  sourcePosition: string
  position: {
    x: number;
    y: number;
  };
}

export type VariableFilterByTypeType = Omit<INode, "targetPosition">;

export interface IEdge {
  id: string;
  target: string;
  source: string;
}
