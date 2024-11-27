import { useState, useEffect } from "react";
import { Modal, List, Button } from "antd";
import { FaArrowRight } from "react-icons/fa6";
import useProduct from "../../state/useProduct";
import CategoryService from "@services/category.service";
import ModalSelect from "@components/ModalSelect";
import ".scss";

function CategorySelector() {
  const {
    data: { id, categoryId },
    dispatch,
  } = useProduct();
  const [categoryTree, setCategoryTree] = useState([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetchCategoryTree();
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      setCategoryFromId(categoryId);
    }
  }, [categoryTree]);

  async function fetchCategoryTree() {
    const [res, err] = await CategoryService.getTree();
    if (!err) {
      setCategoryTree(res.data);
    }
  }

  function setCategoryFromId(categoryId) {
    for (const parent of categoryTree) {
      for (const child of parent.categoryChildren || []) {
        if (child.id === categoryId) {
          setSelectedCategory({
            parent: parent.name,
            child: child.name,
            id: child.id,
          });
          setSelectedParentCategory(parent);
          return;
        }
      }
    }
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedParentCategory(null);
  }

  function handleParentCategorySelect(parent) {
    setSelectedParentCategory(parent);
  }

  function handleChildCategorySelect(child) {
    setSelectedCategory({
      parent: selectedParentCategory.name,
      child: child.name,
      id: child.id,
    });
    dispatch({
      type: "FIELD/UPDATE",
      payload: { field: "categoryId", value: child.id },
    });
    closeModal();
  }

  function goBackToParentLevel() {
    setSelectedParentCategory(null);
  }

  return (
    <ModalSelect
      onClick={openModal}
      isShowValue={!!selectedCategory}
      value={
        selectedCategory
          ? `${selectedCategory.parent} > ${selectedCategory.child}`
          : ""
      }
      placehoder={"Chọn danh mục hàng"}
      label="Danh mục hàng"
      disabled={!!id}
    >
      <Modal
        title={<div className="modal-title">Chọn danh mục</div>}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        className="category-modal"
        loading={categoryTree.length <= 0}
      >
        {selectedParentCategory ? (
          <>
            <Button className="back-button" onClick={goBackToParentLevel}>
              &lt; Quay lại
            </Button>
            <List
              dataSource={selectedParentCategory.categoryChildren}
              renderItem={(child) => (
                <List.Item
                  onClick={() => handleChildCategorySelect(child)}
                  className="category-item"
                >
                  <span>{child.name}</span>
                  <FaArrowRight />
                </List.Item>
              )}
            />
          </>
        ) : (
          <List
            dataSource={categoryTree}
            renderItem={(parent) => (
              <List.Item
                onClick={() => handleParentCategorySelect(parent)}
                className="category-item"
              >
                <span>{parent.name}</span>
                <FaArrowRight />
              </List.Item>
            )}
          />
        )}
      </Modal>
    </ModalSelect>
  );
}

export default CategorySelector;
