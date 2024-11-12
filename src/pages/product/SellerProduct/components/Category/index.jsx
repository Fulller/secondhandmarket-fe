import { useEffect, useState } from "react";
import useProduct from "../../useProduct";
import CategoryService from "@services/category.service";
import ErrorMessage from "../ErrorMessage";

function Category() {
  const {
    data: { categoryId },
    error,
    dispatch,
  } = useProduct();

  console.log({ error });

  const [categoryTree, setCategoryTree] = useState([]);

  useEffect(() => {
    fetchcategoryTree();
  }, []);

  async function fetchcategoryTree() {
    const [res, err] = await CategoryService.getTree();
    if (err) {
      return;
    }
    setCategoryTree(res.data);
  }

  return (
    <div>
      <h2>Danh mục</h2>
      <p>Category ID: {categoryId}</p>
      <ErrorMessage field="categoryId" />
    </div>
  );
}

export default Category;
