import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionWrapped {
  value: string;
  trigger: string | React.ReactElement;
  children?: React.ReactNode;
  className?: string;
}

export default function AccordionWrapped({
  value,
  trigger,
  children,
  className,
}: AccordionWrapped) {
  return (
    <Accordion type="single" collapsible className={className}>
      <AccordionItem value={value}>
        <AccordionTrigger className="uppercase px-5">
          {trigger}
        </AccordionTrigger>
        <AccordionContent className="bg-white pb-0 px-5">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
