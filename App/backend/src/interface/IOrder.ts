export interface pivotInfo {
  id: number,
  name: string,
  description: string,
  ['Order_Products']: {
    quantity: number,
    product_id: number
  }
}

export interface IOrder{
	id: number,
	userId: number,
	products: pivotInfo[]
}
