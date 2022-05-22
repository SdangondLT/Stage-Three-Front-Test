export interface ShowsInterface {
  error: boolean;
  data: ShowsListResponse;
}

export interface ShowsListResponse {
  results: ShowsInfoInterface[];
  totalResults: string;
}

export interface ShowsInfoInterface {
  poster: string;
  title: string;
  type: string;
  year: string;
  id: string;
  comments: string;
  registrationDate: Date;
  selected: boolean;
}

export interface ParametersForApiInterface {
  title: string;
  type: string;
  year: string;
}


