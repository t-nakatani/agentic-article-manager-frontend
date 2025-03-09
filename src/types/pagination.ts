export interface PaginationState {
  currentPage: number
  pageSize: number
  totalItems: number
}

export interface PaginationProps extends PaginationState {
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

