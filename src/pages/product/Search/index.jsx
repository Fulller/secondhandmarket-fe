import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "@services/product.service";
import {
  setFilter,
  selectFilters,
  selectResult,
  setResult,
} from "@redux/slices/search.slice";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import Pagination from "@components/Pagination";
import ProductList from "../components/ProductList";

import Filter from "./Filter";

const Search = () => {
  const filter = useSelector(selectFilters);
  const result = useSelector(selectResult);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
    filtersToUrlParms();
  }, [JSON.stringify(filter)]);

  function filtersToUrlParms() {
    const params = new URLSearchParams();
    Object.keys(filter).forEach((key) => {
      return params.set(key, filter[key]);
    });
    navigate({
      search: params.toString(),
    });
  }

  async function fetchProduct() {
    setLoading(true);
    const [res, err] = await ProductService.searchProducts(filter);
    setLoading(false);
    if (err) {
      return;
    }
    dispatch(setResult(res.data));
  }

  function handePageChange(page) {
    dispatch(setFilter({ name: "page", value: page }));
  }

  return (
    <div className="container mx-auto p-4 flex">
      <Filter></Filter>
      <div className="w-3/4 pr-4">
        <h1 className="text-2xl font-bold mb-4">
          Kết quả tìm kiếm cho "{filter.q}"
        </h1>
        <Spin spinning={loading}>
          <ProductList products={result.content} />
          <Pagination
            current={filter.page}
            total={result.totalElements}
            pageSize={filter.size}
            onChange={handePageChange}
          />
        </Spin>
      </div>
    </div>
  );
};

export default Search;
