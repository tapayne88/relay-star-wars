import React, { FC, useState, ReactNode } from "react";

const Accordion: FC<Props> = ({ header, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen((o) => !o)} style={{ cursor: "pointer" }}>
        {header}
      </div>
      {open && children}
    </>
  );
};

type Props = {
  header: ReactNode;
};

export default Accordion;
