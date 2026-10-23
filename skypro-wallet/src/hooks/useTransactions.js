import { useCallback, useEffect, useState } from "react";
import { createTransaction, getTransactions } from "../api/transactions";
import { useAuth } from "./useAuth";

export function useTransactions() {
  const { token, signOut } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isIgnored = false;

    getTransactions(token)
      .then((data) => {
        if (!isIgnored) setTransactions(data);
      })
      .catch((err) => {
        if (isIgnored) return;
        if (err.status === 401) {
          signOut();
          return;
        }
        setError(err.message);
      })
      .finally(() => {
        if (!isIgnored) setIsLoading(false);
      });

    return () => {
      isIgnored = true;
    };
  }, [token, signOut]);

  // Ошибку пробрасываем дальше — её покажет форма
  const addTransaction = useCallback(
    async (transaction) => {
      try {
        const updatedList = await createTransaction(token, transaction);
        setTransactions(updatedList);
      } catch (err) {
        if (err.status === 401) signOut();
        throw err;
      }
    },
    [token, signOut],
  );

  return { transactions, isLoading, error, addTransaction };
}