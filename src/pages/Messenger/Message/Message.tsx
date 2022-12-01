import { FC } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type MessageType = {
  from: string;
  title: string;
  date: string;
  message: string;
};

export const Message: FC<MessageType> = ({ date, from, message, title }) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: "ghostwhite" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ width: "20%", flexShrink: 0 }}>
            <b>Sender name: </b>
            {from}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            <b>Date:</b> {date}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div>
              <Typography>
                <b>Message title: </b>
                {title}
              </Typography>
            </div>
            <div>
              <Typography>
                <b>Text message: </b>
                {message}
              </Typography>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
