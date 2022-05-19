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
  selected: boolean;
  id: string;
  comments: string;
}


