import { Box } from "@mui/material";
import { styled } from "@mui/system";

type FlexBetweenProps = {
  className?: string;
  children: React.ReactNode;
  backgroundColor?: string;
};

const FlexBetween = styled(Box)<FlexBetweenProps>({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "",
});

export default FlexBetween;
