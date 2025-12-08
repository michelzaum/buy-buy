import { cn } from "@/lib/utils"
import { useFormField } from "./form"
import { Label } from "../label"
import * as LabelPrimitive from "@radix-ui/react-label"

export function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}
