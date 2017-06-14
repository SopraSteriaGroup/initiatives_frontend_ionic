export interface Idea {
  id: number;
  name: string;
  pitch: string;
  category: string;
  logo: string;
  progress: string;
  likes: number;
}

export interface IdeaDetail {
  id: number;
  name: string;
  pitch: string;
  category: string;
  logo: string;
  progress: string;
  likes: number;
  founder: Member;
  members: Member[];
  contact: IdeaContact;
}

export interface Member {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface IdeaContact {
  website: string;
  slack: string;
  github: string;
  trello: string;
}
