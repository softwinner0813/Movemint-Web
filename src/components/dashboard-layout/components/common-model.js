"use client";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputWithLabel";

export default function CommonModel({
  mainHeading,
  subHeading,
  cancelButtonContent,
  mainButtonContent,
  setIsModalOpen,
  showInputFields,
  inputContent,
  showURLFields,
  isDanger = false,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center px-5 bg-muted/90" style={{ zIndex: 10000 }}>
      <div className="bg-background w-full md:w-[70%] lg:w-[869px] p-10 flex flex-col gap-8 rounded-lg">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:font-2xl font-normal">{mainHeading}</h2>
          <p className="text-[14px] max-w-[432px] font-medium">{subHeading}</p>
        </div>
        {showURLFields && (
          <div className="flex flex-col gap-4">
            <InputWithLabel type="text" label="" value={inputContent} />
          </div>
        )}
        {showInputFields && (
          <div className="flex flex-col gap-4">
            <InputWithLabel type="text" label="" value={inputContent} />
          </div>
        )}
        <div className="flex items-center justify-center gap-[119px]">
          <Button
            variant={isDanger ? "danger" : undefined}
            className="rounded-lg w-[150px] sm:w-[274px]"
            onClick={onConfirm}
          >
            {mainButtonContent}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="rounded-lg w-[150px] sm:w-[274px] border-2 border-foreground"
            onClick={() => setIsModalOpen(false)}
          >
            {cancelButtonContent}
          </Button>
        </div>
      </div>
    </div>
  );
}
