import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type EXIFTimePickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (isoString: string) => void;
};

export default function EXIFTimePickerModal({
  isOpen,
  onClose,
  onSave,
}: EXIFTimePickerModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleSave = () => {
    if (selectedDate) {
      onSave(selectedDate.toISOString());
      onClose();
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <ModalHeader>날짜 시간 선택</ModalHeader>
      <ModalBody>
        <div className="flex flex-col items-center gap-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd h:mm aa"
            className="border px-4 py-2 rounded-md"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          저장
        </button>
        <button
          onClick={onClose}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          취소
        </button>
      </ModalFooter>
    </Modal>
  );
}
