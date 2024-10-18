export interface ICategory {
    id: number,
    name: string
}

export interface ICategoryResponse {
    trivia_categories : Array<ICategory>
}

