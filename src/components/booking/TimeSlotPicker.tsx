
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  status: "available" | "booked";
}

interface TimeSlotPickerProps {
  timeSlots: TimeSlot[];
  selectedSlot: string | null;
  onSelectSlot: (slotId: string) => void;
}

export default function TimeSlotPicker({
  timeSlots,
  selectedSlot,
  onSelectSlot,
}: TimeSlotPickerProps) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">Select a Time Slot</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {timeSlots.map((slot) => {
          const isSelected = selectedSlot === slot.id;
          const isAvailable = slot.status === "available";
          
          return (
            <div
              key={slot.id}
              className={cn(
                "time-slot p-3 rounded-lg flex flex-col items-center justify-center text-center",
                isAvailable && !isSelected && "available",
                isAvailable && isSelected && "selected",
                !isAvailable && "booked"
              )}
              onClick={() => {
                if (isAvailable) {
                  onSelectSlot(slot.id);
                }
              }}
            >
              <span className="font-semibold">
                {format(new Date(`2000-01-01 ${slot.startTime}`), "h:mm a")}
              </span>
              <span className="text-xs">to</span>
              <span className="font-semibold">
                {format(new Date(`2000-01-01 ${slot.endTime}`), "h:mm a")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
