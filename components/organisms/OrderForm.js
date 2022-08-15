import { Paper, Grid, TextField, Button, Typography } from "@mui/material";

const OrderForm = () => {
  return (
    <Paper sx={{ padding: "16px", marginTop: "8px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField placeholder="From" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField placeholder="To" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField placeholder="Date" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField placeholder="Time" fullWidth />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Button
            sx={{
              backgroundColor: "secondary.main",
              minWidth: "140px",
              textTransform: "none",
              padding: "12px",
              "&:hover": {
                backgroundColor: "third.main",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: "background.paper",
              }}
            >
              Submit
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OrderForm;
