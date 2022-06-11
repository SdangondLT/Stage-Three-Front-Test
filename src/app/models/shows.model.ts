export interface ShowsListResponse {
  error: boolean;
  data: {
    results: ShowsInterface[];
    totalResults: number;
  }
}

export interface ShowsInfoInterface {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface ShowsInterface {
  id: string;
  poster: string;
  title: string;
  type: string;
  year: string;
  comments: string;
  registrationDate: Date;
  selected: boolean;
}

export interface ParametersForApiInterface {
  title: string;
  type: string;
  year: string;
}
