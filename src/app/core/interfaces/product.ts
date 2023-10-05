export interface Product {
  title: string
  _id:string
  price: number
  imageCover: string
  category: Category
  ratingsAverage: number
}

export interface Category {
  name: string
}


