import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';

const ShoppingProductCard = ({product,handleAddToCart,handleOpenDetails}) => {
  return (
   <Card className="w-full max-w-sm mx-auto cursor-pointer" >
      <div onClick={()=>handleOpenDetails(product._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />

        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className='flex justify-between'>
          <p>{product?.category}</p>
          <span>{product?.brand} </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
      </div>
        <CardFooter className="flex justify-between items-center">
          {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
        </CardFooter>
    </Card>
  )
}

export default ShoppingProductCard
