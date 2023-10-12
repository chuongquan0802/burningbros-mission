export interface BaseListModel<T> {
  total: number
  limit: number
  skip: number
  entities?: T[]
  [x: string]: any
}
