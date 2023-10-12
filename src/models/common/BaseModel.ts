export interface BaseModel {
  id?: string | number
  createdAt?: Date | string
  updatedAt?: Date | string
  createdBy?: any
  updatedBy?: string
  isDeleted?: boolean
}
