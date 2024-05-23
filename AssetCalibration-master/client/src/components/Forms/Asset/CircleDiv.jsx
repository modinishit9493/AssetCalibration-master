import classes from "./AssetAdd.module.css";
const CircleDiv = (props) => {
  if (props.diff <= 5) {
    return <span className={classes.dot} style={{backgroundColor:'red'}}></span>;
  } else if (props.diff >= 6 && props.diff <= 12) {
    return <span className={classes.dot} style={{backgroundColor:'yellow'}}></span>;
  }

  return <span className={classes.dot} style={{backgroundColor:'green'}}></span>;
};

export default CircleDiv;
