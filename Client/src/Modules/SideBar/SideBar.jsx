import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { listCategoryApi } from "../../api/categoryApi";
import { listSubCategoryApi } from "../../api/subCategoryApi";

export default function SideBar({ onSubcategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await listCategoryApi();
        setCategories(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await listSubCategoryApi();
        setSubCategories(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);

  const getSubcategoriesForCategory = (categoryId) => {
    return subCategories.filter(
      (subCategory) => subCategory.categoryId === categoryId
    );
  };

  const handleSubcategoryChange = (subcategoryId) => {
    const updatedSelectedSubcategories = [...selectedSubcategories];
    const index = updatedSelectedSubcategories.indexOf(subcategoryId);

    if (index !== -1) {
      // Subcategory is already selected, remove it
      updatedSelectedSubcategories.splice(index, 1);
    } else {
      // Subcategory is not selected, add it
      updatedSelectedSubcategories.push(subcategoryId);
    }

    setSelectedSubcategories(updatedSelectedSubcategories);
    onSubcategoryChange(subcategoryId);
  };
  console.log(selectedSubcategories);

  return (
    <div
      style={{
        width: "300px",
        padding: "20px",
        background: "white",
        height: "100vh",
        borderRight: "1px solid #ddd",
      }}
    >
      {categories.map((category) => (
        <div key={category._id}>
          <Accordion
            style={{
              border: "none",
              boxShadow: "none",
              marginBottom: "20px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              style={{
                border: "none",
              }}
            >
              <Typography>{category.categoryName}</Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{
                border: "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {getSubcategoriesForCategory(category._id).map((subCategory) => (
                <div
                  key={subCategory._id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox
                    checked={selectedSubcategories.includes(subCategory._id)}
                    onChange={() => handleSubcategoryChange(subCategory._id)}
                  />
                  <Typography>{subCategory.subCategoryName}</Typography>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
