export interface FeedbackRequest {
  rating: number;
  comment: string;
}

export interface FeedbackResponse {
  feedbackUuid: string;
  orderUuid: string;
  rating: number;
  comment: string;
  createdAt: string;
}


