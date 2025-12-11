import { useId } from 'react';
import { FormItemContext } from './contexts/formItemContext';
import { cn } from '@/lib/utils';

export function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}
