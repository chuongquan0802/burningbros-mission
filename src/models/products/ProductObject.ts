export default interface ProductObject {
  Keyword?: string
  Status?: string | number | null
  Start?: number
  Length?: number
  OrderBy?: string
  States?: string | string[]
  CategoryIds?: string
  sortByDate?: boolean
  epics?: string
  type?: number
  [x: string]: any
}
