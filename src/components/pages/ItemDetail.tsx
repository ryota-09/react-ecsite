import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { useSelectItem } from "../../hooks/useSelectItem";

export const ItemDetail = () => {
  const { state } = useLocation<number>();
  const { selectedItem, onSelectItem } = useSelectItem();
  
  useEffect(() => {
    onSelectItem({itemId: state});
  },[])

  return (
    <>
    <p>{selectedItem?.name}</p>
    </>
  )
}
