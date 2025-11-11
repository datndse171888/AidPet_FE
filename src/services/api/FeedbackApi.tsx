import { api } from "../../utils/Axios";
import { FeedbackRequest, FeedbackResponse } from "../../types/Feedback";

export const feedbackApi = {
  getByOrder: (orderId: string) => {
    return api.get<FeedbackResponse>(`/feedback/${orderId}`);
  },
  create: (orderId: string, data: FeedbackRequest) => {
    return api.post<FeedbackResponse>(`/feedback/${orderId}`, data);
  },
  update: (orderId: string, data: FeedbackRequest) => {
    return api.put<FeedbackResponse>(`/feedback/${orderId}`, data);
  },
  delete: (orderId: string) => {
    return api.delete<void>(`/feedback/${orderId}`);
  }
};


