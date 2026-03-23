import React from "react";
import { ItemFormClient } from "./item-form-client";

type ItemFormProps = {
  itemId?: string;
  initialValues?: {
    title?: string;
    category?: string;
    season?: string[];
    color?: string;
    styleTags?: string[];
    sourceUrl?: string;
    imageUrl?: string;
    notes?: string;
  };
};

export function ItemForm({ itemId, initialValues }: ItemFormProps) {
  return <ItemFormClient itemId={itemId} initialValues={initialValues} />;
}
