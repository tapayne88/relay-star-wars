import React, { useState, ReactNode } from "react";
import { OperationType } from "relay-runtime";
import { PreloadedQuery } from "react-relay/lib/relay-experimental/EntryPointTypes";

const PreloadAccordion = <T extends OperationType>({
  header,
  prepare,
  children,
}: Props<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => {
          setOpen((o) => !o);
        }}
        style={{ cursor: "pointer" }}
      >
        {header}
      </div>
      {open && children(prepare())}
    </div>
  );
};

type Props<T extends OperationType> = {
  header: ReactNode;
  prepare: () => PreloadedQuery<T>;
  children: (query: PreloadedQuery<T>) => ReactNode;
};

export default PreloadAccordion;
