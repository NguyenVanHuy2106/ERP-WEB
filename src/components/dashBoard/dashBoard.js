import React, { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function DashBoard({ route, navigate }) {
  let [loading, setLoading] = useState(false);
  const classes = useStyles();

  const loadingPage = async () => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  };
  useEffect(() => {
    loadingPage();
  }, []);
  return (
    <div>
      <div>Dashboard</div>
      {loading ? (
        loading
      ) : (
        <Backdrop className={classes.backdrop} open>
          <RingLoader color="#36d7b7" />
        </Backdrop>
      )}
    </div>
  );
}
export default DashBoard;
