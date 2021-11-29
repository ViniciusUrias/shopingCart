import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/system";
// Types
import { IAllPlans } from "../interfaces/Plans";
// Styles

type Props = {
  item: IAllPlans;
  addToCart: (clickedItem: IAllPlans) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Grid
    item
    sx={{
      boxShadow: "1px 1px 5px #8510d8 ",
      padding: 1,
      gap: 2,
      marginBottom: 2,
      borderRadius: 1,
    }}
  >
    <h3>{item.value}</h3>
    <p>Valor: ${item.price}</p>
    <Button
      size='small'
      disableElevation
      variant='contained'
      onClick={() => removeFromCart(item.id)}
    >
      -
    </Button>
  </Grid>
);

export default CartItem;
