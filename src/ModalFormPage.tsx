import { useRef } from "react";
import { useModal } from "./provider/ModalProvider";

const ModalFormPage = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { openFormModal } = useModal();

  const handleOpenModal = async () => {
    try {
      const result = await openFormModal();
      if (result) {
        console.log("폼이 제출되었습니다!", result);
        // 제출된 데이터 처리 로직
      } else {
        console.log("모달이 취소되었습니다.");
        // 취소 처리 로직
      }
    } catch (error) {
      console.error("모달 처리 중 오류:", error);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <button
          ref={buttonRef}
          type="button"
          className="open-button"
          onClick={handleOpenModal}
          aria-label="신청 폼 작성하기"
        >
          🚀 신청 폼 작성하기
        </button>
      </div>
    </div>
  );
};

export default ModalFormPage;
