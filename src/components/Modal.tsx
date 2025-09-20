import { useEffect, useId, useRef } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
  const modalTitleId = useId();
  const modalDescriptionId = useId();
  const nameId = useId();
  const emailId = useId();
  const positionId = useId();
  const githubId = useId();

  const modalRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

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
            아래 정보를 입력해주세요. 모든 필드는 필수 입력사항입니다.
          </p>
        </div>

        <form className="modal-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor={nameId} className="form-label">
              이름/닉네임
            </label>
            <input type="text" id={nameId} name="name" className="form-input" required aria-required="true" />
          </div>

          <div className="form-group">
            <label htmlFor={emailId} className="form-label">
              이메일
            </label>
            <input type="email" id={emailId} name="email" className="form-input" required aria-required="true" />
          </div>

          <div className="form-group">
            <label htmlFor={positionId} className="form-label">
              FE 경력 연차
            </label>
            <select id={positionId} name="position" className="form-select" required aria-required="true">
              <option value="">경력을 선택해주세요</option>
              <option value="junior">0-3년</option>
              <option value="senior">4-7년</option>
              <option value="lead">8년이상</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor={githubId} className="form-label">
              Github 링크 (선택)
            </label>
            <input
              type="url"
              id={githubId}
              name="github"
              className="form-input"
              placeholder="https://github.com/your-username"
              aria-required="false"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn-submit">
              신청하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
