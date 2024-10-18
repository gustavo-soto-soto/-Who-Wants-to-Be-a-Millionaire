export default interface IQuestionRequest {
    amount?: number,
    category?: number | string,
    difficulty?: string,
    type?: string,
    token?: string,
}