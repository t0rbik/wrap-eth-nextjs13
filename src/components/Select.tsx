import { forwardRef, ReactNode, RefAttributes } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import type { SelectProps, SelectItemProps } from '@radix-ui/react-select';
import { Label } from '@radix-ui/react-label';

export const Select = forwardRef<HTMLButtonElement, { children: ReactNode; label: string } & SelectProps>(
  ({ children, label, ...props }, forwardedRef) => {
    return (
      <Label>
        {label}
        <SelectPrimitive.Root {...props}>
          <SelectPrimitive.Trigger ref={forwardedRef}>
            <SelectPrimitive.Value />
            <SelectPrimitive.Icon>
              <ChevronDownIcon />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content>
              <SelectPrimitive.ScrollUpButton>
                <ChevronUpIcon />
              </SelectPrimitive.ScrollUpButton>
              <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollDownButton>
                <ChevronDownIcon />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </Label>
    );
  },
);
Select.displayName = 'Select';

export const SelectItem = forwardRef<
  HTMLDivElement,
  { children: ReactNode } & SelectItemProps & RefAttributes<HTMLDivElement>
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item {...props} ref={forwardedRef}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = 'SelectItem';

const AbstractSelect = { Select, SelectItem };
export default AbstractSelect;
