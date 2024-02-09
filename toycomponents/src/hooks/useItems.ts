import { useEffect, useState } from "react";
import itemService, { Item } from "../services/item-service";
import { CanceledError } from "../services/api-client";


const useItems = () =>{
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
  
      const { request, cancel } = itemService.getAll<Item>();
      request
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setIsLoading(false);
        });
  
      return () => cancel();
    }, []);

    return { items, error, isLoading, setItems, setError };
}

export default useItems;
