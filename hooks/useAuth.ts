"use client";

import { useEffect, useState } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuth(true);
    }

    setLoading(false);
  }, []);

  return { isAuth, loading };
};
