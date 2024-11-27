import React, { useState, useEffect } from "react";
import { Slider, Button, Input, Select, message, TreeSelect } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters, setFilter } from "@redux/slices/search.slice";
import CategoryService from "@services/category.service";
import provincesData from "@assets/json/address.json";
import _ from "lodash";

const { Option } = Select;

const Filter = () => {
  const filters = useSelector(selectFilters);
  const [localFilters, setLocalFilters] = useState(
    _.pick(filters, ["minPrice", "maxPrice", "categoryId", "province"])
  );
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  function setLocalFilter(field, value) {
    setLocalFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  }

  useEffect(() => {
    setLocalFilters(
      _.pick(filters, ["minPrice", "maxPrice", "categoryId", "province"])
    );
  }, [filters]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const [res, err] = await CategoryService.getTree();
    if (err) {
      message.error("Không thể tải danh mục.");
      return;
    }
    setCategories(res.data);
  }

  const handlePriceChange = (value) => {
    setLocalFilter("minPrice", value[0]);
    setLocalFilter("maxPrice", value[1]);
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setLocalFilter("minPrice", value ? parseInt(value, 10) : 0);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setLocalFilter("maxPrice", value ? parseInt(value, 10) : 0);
  };

  const handleFilter = () => {
    if (localFilters.minPrice > localFilters.maxPrice) {
      message.error("Giá trị tối thiểu không thể lớn hơn giá trị tối đa.");
      return;
    }
    if (
      localFilters.minPrice !== filters.minPrice ||
      localFilters.maxPrice !== filters.maxPrice ||
      localFilters.categoryId !== filters.categoryId ||
      localFilters.province !== filters.province
    ) {
      dispatch(
        setFilter({ name: "minPrice", value: localFilters.minPrice || 0 })
      );
      dispatch(
        setFilter({ name: "maxPrice", value: localFilters.maxPrice || 0 })
      );
      dispatch(
        setFilter({ name: "categoryId", value: localFilters.categoryId })
      );
      dispatch(setFilter({ name: "province", value: localFilters.province }));
      dispatch(setFilter({ name: "page", value: 1 }));
    }
  };

  useEffect(() => {
    setLocalFilter("minPrice", filters.minPrice);
    setLocalFilter("maxPrice", filters.maxPrice);
    setLocalFilter("categoryId", filters.categoryId);
  }, [filters.minPrice, filters.maxPrice, filters.categoryId]);

  const renderTreeNodes = (data) => {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item) => ({
      title: item.name,
      value: item.id,
      isLeaf: item.level == 2,
      disabled: item.level == 1,
      children: item.categoryChildren
        ? renderTreeNodes(item.categoryChildren)
        : [],
    }));
  };

  return (
    <div className="w-1/4 pl-4 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Bộ lọc</h2>

      <div className="mb-4">
        <label className="block mb-2">Khoảng giá (VNĐ):</label>
        <Slider
          range
          min={0}
          max={100000000}
          step={100000}
          value={[localFilters.minPrice, localFilters.maxPrice]}
          onChange={handlePriceChange}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Giá tối thiểu:</label>
        <Input
          type="text"
          value={localFilters.minPrice.toLocaleString()}
          onChange={handleMinPriceChange}
          placeholder="Nhập giá tối thiểu"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Giá tối đa:</label>
        <Input
          type="text"
          value={localFilters.maxPrice.toLocaleString()}
          onChange={handleMaxPriceChange}
          placeholder="Nhập giá tối đa"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Chọn danh mục:</label>
        <TreeSelect
          style={{ width: "100%" }}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Chọn danh mục"
          treeData={renderTreeNodes(categories)}
          value={localFilters.categoryId}
          filterTreeNode={(inputValue, treeNode) =>
            treeNode.title.toLowerCase().includes(inputValue.toLowerCase())
          }
          onChange={(cId) => setLocalFilter("categoryId", cId)}
          allowClear
          showSearch
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Chọn địa chỉ:</label>
        <Select
          style={{ width: "100%" }}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Chọn địa chỉ"
          onChange={(pId) => setLocalFilter("province", pId)}
          value={localFilters.province}
          options={Object.keys(provincesData)
            .map((provinceKey) => {
              const province = provincesData[provinceKey];
              return {
                value: province.code,
                label: province.name,
              };
            })
            .sort((a, b) => a.label.localeCompare(b.label))} // Sort provinces by name
          filterOption={
            (inputValue, option) =>
              option.label.toLowerCase().includes(inputValue.toLowerCase()) // Filter by name
          }
          allowClear
          showSearch
        />
      </div>

      <Button type="primary" block onClick={handleFilter}>
        Lọc
      </Button>
    </div>
  );
};

export default Filter;
