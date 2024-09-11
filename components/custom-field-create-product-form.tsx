// import { FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form';
// import { CustomSelect } from '@/components/custom-select';
// import { Input } from '@/components/ui/input';
// import CheckboxPopsUp from '@/components/checkbox-pops-up';

// interface InputFieldProps<TFieldValues extends FieldValues>
//     extends UseControllerProps<TFieldValues> {
//     label: string;
//     placeholder: string;
//     type?: string;
// }

// interface NumericInputFieldProps<TFieldValues extends FieldValues>
//     extends UseControllerProps<TFieldValues> {
//     label: string;
//     placeholder: string;
// }

// interface CheckboxFieldProps<TFieldValues extends FieldValues, TItem>
//     extends UseControllerProps<TFieldValues> {
//     label: string;
//     items: TItem[];
//     getItemKey: (item: TItem) => string | number;
//     renderItem: (item: TItem) => string;
//     disabled?: boolean;
// }

// interface SelectFieldProps<TFieldValues extends FieldValues, TItem>
//     extends UseControllerProps<TFieldValues> {
//     label: string;
//     items: TItem[];
//     getItemKey: (item: TItem) => string | number;
//     renderItem: (item: TItem) => string;
//     placeholder?: string;
//     disabled?: boolean;
//     onChange: (value: TItem | null) => void;
// }

// export const SelectField = <TFieldValues extends FieldValues, TItem>({
//     label,
//     items,
//     getItemKey,
//     renderItem,
//     placeholder = 'Select an item',
//     disabled,
//     onChange,
//     ...fieldProps
// }: SelectFieldProps<TFieldValues, TItem>) => (
//     <FormField
//         control={fieldProps.control}
//         name={fieldProps.name as FieldPath<TFieldValues>}
//         render={({ field }) => (
//             <FormItem className="flex flex-col">
//                 <FormLabel>{label} :</FormLabel>
//                 <FormControl>
//                     <CustomSelect />
//                 </FormControl>
//                 <FormMessage />
//             </FormItem>
//         )}
//     />
// );

// export const CheckboxField = <TFieldValues extends FieldValues, TItem>({
//     label,
//     items,
//     getItemKey,
//     renderItem,
//     disabled,
//     ...fieldProps
// }: CheckboxFieldProps<TFieldValues, TItem>) => (
//     <FormField
//         control={fieldProps.control}
//         name={fieldProps.name as FieldPath<TFieldValues>}
//         render={({ field }) => (
//             <FormItem className="flex flex-col">
//                 <FormLabel>{label} :</FormLabel>
//                 <FormControl>
//                     <CheckboxPopsUp<TItem>
//                         items={items}
//                         value={field.value}
//                         onChange={field.onChange}
//                         getItemKey={getItemKey}
//                         renderItem={renderItem}
//                         disabled={disabled}
//                     />
//                 </FormControl>
//                 <FormMessage />
//             </FormItem>
//         )}
//     />
// );

// export const InputField = <TFieldValues extends FieldValues>({
//     label,
//     placeholder,
//     type = 'text',
//     ...fieldProps
// }: InputFieldProps<TFieldValues>) => (
//     <FormField
//         control={fieldProps.control}
//         name={fieldProps.name as FieldPath<TFieldValues>}
//         render={({ field }) => (
//             <FormItem>
//                 <FormLabel>{label} :</FormLabel>
//                 <FormControl>
//                     <Input
//                         {...field}
//                         value={field.value ?? ''}
//                         placeholder={placeholder}
//                         type={type}
//                         className="border border-gray-300 bg-white"
//                     />
//                 </FormControl>
//                 <FormMessage />
//             </FormItem>
//         )}
//     />
// );

// export const NumericInputField = <TFieldValues extends FieldValues>({
//     label,
//     placeholder,
//     ...fieldProps
// }: NumericInputFieldProps<TFieldValues>) => (
//     <FormField
//         control={fieldProps.control}
//         name={fieldProps.name as FieldPath<TFieldValues>}
//         render={({ field }) => (
//             <FormItem>
//                 <FormLabel>{label} :</FormLabel>
//                 <FormControl>
//                     <Input
//                         {...field}
//                         placeholder={placeholder}
//                         type="number"
//                         inputMode="numeric"
//                         className="border border-gray-300 bg-white"
//                         value={field.value === 0 ? '' : field.value}
//                         onKeyDown={(e) => {
//                             const invalidChars = ['e', 'E', '+', '-'];
//                             if (invalidChars.includes(e.key)) {
//                                 e.preventDefault();
//                             }
//                         }}
//                     />
//                 </FormControl>
//                 <FormMessage />
//             </FormItem>
//         )}
//     />
// );
