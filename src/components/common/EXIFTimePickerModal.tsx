import { Dialog } from "@headlessui/react";
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

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-[360px] max-w-md rounded bg-white p-4">
          <Dialog.Title className="text-lg font-semibold font-pretendard">
            날짜 시간 선택
          </Dialog.Title>
          <div className="mt-4 flex justify-center">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              dateFormat="yyyy-MM-dd h:mm aa"
              className="border px-4 py-2 w-[330px] rounded-md font-pretendard"
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => {
                if (selectedDate) {
                  onSave(selectedDate.toISOString());
                  onClose();
                }
              }}
              className="bg-blue-500 text-white text-base w-14 h-7 rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] font-pretendard hover:bg-blue-600"
            >
              저장
            </button>
            <button
              onClick={onClose}
              className="border w-14 h-7 rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] text-base font-pretendard hover:bg-gray-100"
            >
              취소
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
