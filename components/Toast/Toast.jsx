import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Toast() {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">Please enter a valid city name.</Alert>
    </Stack>
  );
}
