'use client';
import { Category, SubCategory, DetailCategory } from '@prisma/client';
import { useEffect, useMemo } from 'react';
import { UseFormResetField } from 'react-hook-form';

export const useFilteredCategories = (
    selectedCategory: Category | undefined,
    selectedSubCategory: SubCategory | undefined,
    subCategories: SubCategory[],
    detailCategories: DetailCategory[],
    resetField: UseFormResetField<any>,
) => {
    const filteredSubCategories = useMemo(() => {
        return selectedCategory
            ? subCategories.filter(
                  (subCat) => subCat.categoryId === selectedCategory.id,
              )
            : [];
    }, [selectedCategory, subCategories]);

    const filteredDetailCategories = useMemo(() => {
        return selectedSubCategory
            ? detailCategories.filter(
                  (detailCat) =>
                      detailCat.subCategoryId === selectedSubCategory.id,
              )
            : [];
    }, [selectedSubCategory, detailCategories]);

    useEffect(() => {
        if (selectedCategory) {
            resetField('subCategory');
            resetField('detailCategory');
        }
    }, [selectedCategory, resetField]);

    useEffect(() => {
        if (selectedSubCategory) {
            resetField('detailCategory');
        }
    }, [selectedSubCategory, resetField]);

    return { filteredSubCategories, filteredDetailCategories };
};
