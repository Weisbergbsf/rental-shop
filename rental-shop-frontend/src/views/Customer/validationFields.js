import * as Yup from "yup";
// Schema for yup
export const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("O e-mail não é válido.")
      .required("E-mail é obrigatório."),
    name: Yup.string()
      .required("O nome do obrigatório.")
      .min(6, "O nome deve ter pelo menos 3 caracteres.")
  });