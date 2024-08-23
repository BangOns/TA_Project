import z from "zod";

export const SchemaFormNilai = z.object({
  nilai: z.coerce
    .number({
      message: "Please, input this number",
    })
    .min(1, {
      message: "Input be correctly",
    }),
  kehadiran: z.coerce
    .number({
      message: "Please, input this number",
    })
    .min(1, {
      message: "Input be correctly",
    })
    .lte(16, {
      message: "Kehadiran tidak boleh lebih dari 16",
    }),
  idPelajaran: z.string().nonempty({ message: "Input be correctly" }),
});

export const SchemaFormAddUser = z.object({
  name: z.string().min(2, {
    message: "fullname must be at least 2 characters.",
  }),
  npm: z
    .string()
    .min(12, {
      message: "fullname must be at least 12 characters.",
    })
    .max(12, {
      message: "fullname must be at least 12 characters.",
    }),

  password: z.string().min(6, {
    message: "Please enter a valid password length 6 characters.",
  }),
  rePassword: z.string().min(6, {
    message: "Please enter a valid password length 6 characters.",
  }),
});

export const SchemaFormEditUser = z.object({
  name: z.string().min(2, {
    message: "fullname must be at least 2 characters.",
  }),
  npm: z
    .string()
    .min(12, {
      message: "fullname must be at least 12 characters.",
    })
    .max(12, {
      message: "fullname must be at least 12 characters.",
    }),

  oldPassword: z.string({
    message: "Please enter a valid password.",
  }),
  newPassword: z
    .string({
      message: "Please enter a valid password.",
    })
    .optional(),
});
