import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface AccordionWrapped {
    value: string;
    trigger: string | React.ReactElement;
    children?: React.ReactNode;
    className?: string;
    defaultValue?: boolean;
}

export default function AccordionWrapped({
    value,
    trigger,
    children,
    className,
    defaultValue,
}: AccordionWrapped) {
    return (
        <Accordion
            type="single"
            collapsible
            className={className}
            defaultValue={defaultValue ? value : 'undefined'}
        >
            <AccordionItem value={value}>
                <AccordionTrigger className="px-5 uppercase">
                    {trigger}
                </AccordionTrigger>
                <AccordionContent className="bg-white px-5 pb-0">
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
