import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";


const useStandard = makeStyles((theme: Theme) => ({
  standardMargin: {
      margin: 20
  },
  center: {
      margin: 20,
      transform: "translate(-50%, 0)",
      marginLeft: "50%"
  }  
}))

export default useStandard;