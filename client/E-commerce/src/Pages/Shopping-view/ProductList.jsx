import Filters from "@/components/Shopping-Components/filters";
import ShoppingProductCard from "@/components/Shopping-Components/product-tile";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFilteredProduct,
  getProductDetails,
} from "@/store/Shop/Shop-product-slice";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "./ProductDetailsDialog";
import { addToCart, fetchCartItems } from "@/store/Shop/Cart-Slice";
import { useToast } from "@/hooks/use-toast";

const createFilterQueryString = (filterQuery) => {
  let queryParams = [];
  for (const [key, value] of Object.entries(filterQuery)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  // console.log(queryParams, "queryParams");
  return queryParams.join("&");
};

const ProductList = () => {
  const { user } = useSelector((state) => state.auth);
  const { productsList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );

  const dispatch = useDispatch();
  const { toast } = useToast();
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const categorySearchParam = searchParams.get("category");


  const handleFilter = (sectionId, currentOption) => {
    let copyOfProducts = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyOfProducts).indexOf(sectionId);
    if (indexOfCurrentSection === -1) {
      // copyOfProducts ={...copyOfProducts, [sectionId]:[currentOption]}
      copyOfProducts[sectionId] = [currentOption];
    } else {
      const indexOfCurrentOption =
        copyOfProducts[sectionId].indexOf(currentOption);
      if (indexOfCurrentOption === -1)
        copyOfProducts[sectionId].push(currentOption);
      // copyOfProducts[sectionId] = [...copyOfProducts[sectionId],currentOption];
      else copyOfProducts[sectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(copyOfProducts);
    sessionStorage.setItem("filters", JSON.stringify(copyOfProducts));
  };


  const handleSort = (value) => {
    //onValueChange always give us the direct value, not the event from which we have to extract the value.
    setSort(value);
  };

  const handleOpenDetails = (productId) => {
    console.log("Product Details are here is here", productId);
    setOpenDetailsDialog(true);
    dispatch(getProductDetails(productId));
  };

  
  const handleAddToCart = (getproductId, totalStock) => {
    console.log("Product cart", getproductId);

    dispatch(
      addToCart({
        userId: user?._id,
        productId: getproductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?._id));
         setOpenDetailsDialog(false);
        toast({
          title: "Product added to cart",
        });
      }
    });
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    const savedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    setFilters(savedFilters);
    // console.log(filters, "Filters");
  }, [searchParams]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createFilterQueryString(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
    // console.log(filters, "Filters");
  }, [filters]);



  useEffect(() => {
    dispatch(
      getAllFilteredProduct({ filterParams: filters, sortParams: sort })
    );
  }, [dispatch, sort, filters]);

  // console.log(user._id, "user");

  return (
    <div className="h-full mx-2 grid grid-cols-[15%_85%]">
      <Filters filter={filters} handleFilter={handleFilter} />

      <div className="border flex flex-col">
        <div className="flex border justify-between items-center">
          <h1 className="text-xl font-bold">All Products</h1>
          <div className="flex border w-[15vw] justify-between items-center">
            <span>{productsList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-5">
          {productsList && productsList.length > 0
            ? productsList.map((productItem) => (
                <ShoppingProductCard
                  product={productItem}
                  key={productItem._id}
                  handleAddToCart={handleAddToCart}
                  handleOpenDetails={handleOpenDetails}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ProductList;
