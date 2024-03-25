"use client";

import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const DeleteServerModal = () => {
  const { type, isOpen, onClose, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { server } = data;
  const isModalOpen = type === "deleteServer" && isOpen;

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}/delete`);
      onClose();
      window.location.reload();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center tracking-widest">
            删除服务器
          </DialogTitle>
          <DialogDescription className="tracking-widest text-center text-zinc-500x">
            你确定你要这么做么?
            <br />
            <span className="font-bold text-indigo-500">{server?.name}</span>
            将会被<span className="text-red-500">永久删除</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              variant="ghost"
              className="w-20"
              onClick={onClose}
            >
              取消
            </Button>
            <Button
              disabled={isLoading}
              variant="primary"
              className="w-20"
              onClick={onDelete}
            >
              确认
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
