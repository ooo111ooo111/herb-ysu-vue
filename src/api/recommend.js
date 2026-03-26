import request from "@/utils/request";

export const pcmRecommendService = (question) => {
    return request.get('/recommend?question=' + question)
}