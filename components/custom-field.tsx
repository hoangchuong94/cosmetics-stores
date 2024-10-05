import {
    FieldValues,
    FieldPath,
    UseControllerProps,
    ControllerRenderProps,
} from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CheckboxPopsUp from '@/components/checkbox-pops-up';
import CustomSelect from '@/components/custom-select';
import { Textarea } from '@/components/ui/textarea';
import { useMemo, useCallback } from 'react';

interface GenericFieldProps<TFieldValues extends FieldValues> {
    label: string;
    renderInput: (
        field: ControllerRenderProps<TFieldValues, any>,
    ) => React.ReactNode;
}

export const GenericField = <TFieldValues extends FieldValues>({
    label,
    renderInput,
    ...fieldProps
}: GenericFieldProps<TFieldValues> & UseControllerProps<TFieldValues>) => (
    <FormField
        control={fieldProps.control}
        name={fieldProps.name as FieldPath<TFieldValues>}
        render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>{label} :</FormLabel>
                <FormControl>{renderInput(field)}</FormControl>
                <FormMessage className="text-xs" />
            </FormItem>
        )}
    />
);

// Prevent invalid input for numeric fields
const preventInvalidNumberInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
) => {
    const invalidChars = ['e', 'E', '+', '-'];
    if (invalidChars.includes(e.key)) {
        e.preventDefault();
    }
};

// InputField component using GenericField
interface InputFieldProps<TFieldValues extends FieldValues>
    extends UseControllerProps<TFieldValues> {
    className?: string;
    label: string;
    placeholder: string;
    type?: string;
}

export const InputField = <TFieldValues extends FieldValues>({
    className,
    label,
    placeholder,
    type = 'text',
    ...fieldProps
}: InputFieldProps<TFieldValues>) => (
    <GenericField
        label={label}
        {...fieldProps}
        renderInput={(field) =>
            type === 'text-aria' ? (
                <Textarea
                    placeholder={placeholder}
                    className={className}
                    {...field}
                />
            ) : (
                <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder={placeholder}
                    type={type}
                    className={className}
                />
            )
        }
    />
);

// NumericInputField component using GenericField
interface NumericInputFieldProps<TFieldValues extends FieldValues>
    extends UseControllerProps<TFieldValues> {
    className?: string;
    label: string;
    placeholder: string;
}

export const NumericInputField = <TFieldValues extends FieldValues>({
    className,
    label,
    placeholder,
    ...fieldProps
}: NumericInputFieldProps<TFieldValues>) => (
    <GenericField
        label={label}
        {...fieldProps}
        renderInput={(field) => (
            <Input
                {...field}
                placeholder={placeholder}
                type="number"
                inputMode="numeric"
                className={className}
                value={field.value === 0 ? '' : field.value}
                onKeyDown={preventInvalidNumberInput}
            />
        )}
    />
);

// SelectField component using GenericField
interface SelectFieldProps<TFieldValues extends FieldValues, TItem>
    extends UseControllerProps<TFieldValues> {
    label: string;
    items: TItem[];
    getItemKey: (item: TItem) => string | number;
    renderItem: (item: TItem) => string;
    placeholder?: string;
    disabled?: boolean;
}

export const SelectField = <TFieldValues extends FieldValues, TItem>({
    label,
    items = [],
    getItemKey,
    renderItem,
    placeholder = 'Select an item',
    disabled,
    ...fieldProps
}: SelectFieldProps<TFieldValues, TItem>) => {
    const memoizedItems = useMemo(() => items, [items]);

    const memoizedRenderItem = useCallback(
        (item: TItem) => renderItem(item),
        [renderItem],
    );

    return (
        <GenericField
            label={label}
            {...fieldProps}
            renderInput={(field) => (
                <CustomSelect
                    items={memoizedItems}
                    value={field.value}
                    getItemName={memoizedRenderItem}
                    getKey={getItemKey}
                    onChange={field.onChange}
                    disabled={disabled}
                />
            )}
        />
    );
};

// CheckboxField component using GenericField
interface CheckboxFieldProps<TFieldValues extends FieldValues, TItem>
    extends UseControllerProps<TFieldValues> {
    label: string;
    items: TItem[];
    getItemKey: (item: TItem) => string | number;
    renderItem: (item: TItem) => string;
    disabled?: boolean;
}

export const CheckboxField = <TFieldValues extends FieldValues, TItem>({
    label,
    items,
    getItemKey,
    renderItem,
    disabled,
    ...fieldProps
}: CheckboxFieldProps<TFieldValues, TItem>) => {
    const memoizedItems = useMemo(() => items, [items]);
    const memoizedRenderItem = useCallback(
        (item: TItem) => renderItem(item),
        [renderItem],
    );

    return (
        <GenericField
            label={label}
            {...fieldProps}
            renderInput={(field) => (
                <CheckboxPopsUp
                    items={memoizedItems}
                    value={field.value}
                    onChange={field.onChange}
                    renderItem={memoizedRenderItem}
                    getItemKey={getItemKey}
                    disabled={disabled}
                />
            )}
        />
    );
};