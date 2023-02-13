import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000ox)");
  return (
    <Box>
      <Box
        width="100%"
        style={{ backgroundColor: "theme.palette.background.alt" }}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          SparkUp
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        style={{ backgroundColor: "theme.palette.background.alt" }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to SparkUp, the Social Media for Millennials!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};
export default LoginPage;
