import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { IAllPlans } from "../interfaces/Plans";

type Props = {
  item: IAllPlans;
  addToCart: (clickedItem: IAllPlans) => void;
  removeFromCart: (value: string) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Grid
    item
    sx={{
      background: "#fff",
      boxShadow: "1px 1px 1px 1px #8510d8",
      padding: 1,
      gap: 2,
      marginBottom: 2,
      borderRadius: 1,
    }}
  >
    {item?.type === "internet" && <p>Plano de internet</p>}
    {item?.type === "fix" && <p>Plano fixo de telefone</p>}
    {item?.type === "tv" && <p>Plano de TV</p>}
    <h3>{item?.value}</h3>
    <p>Valor: ${item?.price}</p>
    <Button
      style={{ color: "#8510d8", border: "1px solid #8510d8" }}
      fullWidth
      disableElevation
      variant='outlined'
      onClick={() => removeFromCart(item?.value)}
    >
      Remover
    </Button>
  </Grid>
);

export default CartItem;
