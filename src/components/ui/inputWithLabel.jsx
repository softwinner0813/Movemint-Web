import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function InputWithLabel(props) {
  const { label, labelClassName, ...rest } = props;
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={props.id} className={cn("font-bold", labelClassName)}>
        {label}
      </Label>
      <Input {...rest} />
    </div>
  );
}
