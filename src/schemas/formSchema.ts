import { z } from "zod";

// 폼 데이터 스키마 정의
export const formSchema = z.object({
  name: z
    .string()
    .min(1, "이름을 입력해주세요.")
    .min(2, "이름은 2글자 이상 입력해주세요.")
    .max(50, "이름은 50글자 이하로 입력해주세요.")
    .trim(),

  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식을 입력해주세요.")
    .max(100, "이메일은 100글자 이하로 입력해주세요.")
    .trim()
    .toLowerCase(),

  position: z
    .string()
    .min(1, "경력을 선택해주세요.")
    .refine((value) => value !== "", "경력을 선택해주세요."),

  github: z
    .string()
    .refine((value) => {
      if (!value || value.trim() === "") return true; // 빈 값은 허용
      return /^https?:\/\/.+/.test(value);
    }, "올바른 URL 형식을 입력해주세요.")
    .transform((value) => value?.trim() || ""),
});

// 타입 추출
export type FormData = z.infer<typeof formSchema>;

// 폼 기본값
export const defaultFormValues: FormData = {
  name: "",
  email: "",
  position: "",
  github: "",
};
