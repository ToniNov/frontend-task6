import { FC, ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  eventKey: string;
};

export const CustomToggle: FC<PropsType> = ({ children, eventKey }) => {
  //const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <span role="button" aria-hidden="true">
      {children}
    </span>
  );
};
