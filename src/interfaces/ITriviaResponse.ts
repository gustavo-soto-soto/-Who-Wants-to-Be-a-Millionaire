import IQuestion from "./IQuestion";

export default interface ITriviaResponse {
    response_code: number,
    results: IQuestion[]
}