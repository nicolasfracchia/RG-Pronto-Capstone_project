import { ProductPrice } from "./product-price";

export interface Product {
    product: string,
    image: string,
    category: string,
    prices: ProductPrice[]
}
