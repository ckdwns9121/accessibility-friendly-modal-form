import { useEffect, useId, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormData, defaultFormValues } from "../schemas/formSchema";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: FormData) => void;
}

export default function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
  const modalTitleId = useId();
  const modalDescriptionId = useId();
  const nameId = useId();
  const emailId = useId();
  const positionId = useId();
  const githubId = useId();
  const errorMessageId = useId();

  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setFocus,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: defaultFormValues,
  });

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // 폼 제출 핸들러
  const onFormSubmit = (data: FormData) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  // 폼 제출 실패 시 첫 번째 오류 필드로 포커스 이동
  const onFormError = () => {
    const firstErrorField = Object.keys(errors)[0] as keyof FormData;
    if (firstErrorField) {
      setFocus(firstErrorField);
    }
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      aria-describedby={modalDescriptionId}
    >
      <div className="modal-content" ref={modalRef} tabIndex={-1}>
        <div className="modal-header">
          <h2 id={modalTitleId} className="modal-title">
            신청 폼
          </h2>
          <p id={modalDescriptionId} className="modal-subtitle">
            이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.
          </p>
        </div>

        <form className="modal-form" onSubmit={handleSubmit(onFormSubmit, onFormError)}>
          {/* 스크린리더를 위한 오류 메시지 영역 */}
          <div id={errorMessageId} className="sr-only" aria-live="polite" aria-atomic="true">
            {Object.keys(errors).length > 0 && (
              <div>폼에 {Object.keys(errors).length}개의 오류가 있습니다. 각 필드를 확인해주세요.</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor={nameId} className="form-label">
              이름/닉네임
            </label>
            <input
              type="text"
              id={nameId}
              className={`form-input ${errors.name ? "error" : ""}`}
              aria-required="true"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? `${nameId}-error` : undefined}
              {...register("name")}
            />
            {errors.name && (
              <div id={`${nameId}-error`} className="error-message" role="alert">
                {errors.name.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor={emailId} className="form-label">
              이메일
            </label>
            <input
              type="email"
              id={emailId}
              className={`form-input ${errors.email ? "error" : ""}`}
              aria-required="true"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? `${emailId}-error` : undefined}
              {...register("email")}
            />
            {errors.email && (
              <div id={`${emailId}-error`} className="error-message" role="alert">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor={positionId} className="form-label">
              FE 경력 연차
            </label>
            <select
              id={positionId}
              className={`form-select ${errors.position ? "error" : ""}`}
              aria-required="true"
              aria-invalid={errors.position ? "true" : "false"}
              aria-describedby={errors.position ? `${positionId}-error` : undefined}
              {...register("position")}
            >
              <option value="">경력을 선택해주세요</option>
              <option value="junior">0-3년</option>
              <option value="senior">4-7년</option>
              <option value="lead">8년이상</option>
            </select>
            {errors.position && (
              <div id={`${positionId}-error`} className="error-message" role="alert">
                {errors.position.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor={githubId} className="form-label">
              Github 링크 (선택)
            </label>
            <input
              type="url"
              id={githubId}
              className={`form-input ${errors.github ? "error" : ""}`}
              placeholder="https://github.com/your-username"
              aria-required="false"
              aria-invalid={errors.github ? "true" : "false"}
              aria-describedby={errors.github ? `${githubId}-error` : undefined}
              {...register("github")}
            />
            {errors.github && (
              <div id={`${githubId}-error`} className="error-message" role="alert">
                {errors.github.message}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
              취소
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
              aria-describedby={Object.keys(errors).length > 0 ? errorMessageId : undefined}
            >
              {isSubmitting ? "제출 중..." : "제출하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
