import { useState, useCallback } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = useCallback(({ target }) => {
    const { name, value } = target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onResetForm = useCallback(() => {
    setFormState(initialForm);
  }, [initialForm]);

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};
