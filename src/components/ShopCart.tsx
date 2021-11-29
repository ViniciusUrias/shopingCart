import CartItem from "./CartItem";
import { IAllPlans } from "../interfaces/Plans";
import { Grid } from "@material-ui/core";

type Props = {
  cartItems: IAllPlans[];
  addToCart: (clickedItem: IAllPlans) => void;
  removeFromCart: (id: number) => void;
};

const ShopCart: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
}) => {
  const calculateTotal = (items: IAllPlans[]) =>
    items.reduce((ack, item) => ack + Number(item.price), 0);
  console.log(cartItems);
  return (
    <div>
      <h2>Meu carrinho</h2>
      {cartItems.length === 0 ? <p>Seu carrinho está vazio!</p> : null}
      <Grid container sx={{ gap: 2 }}>
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </Grid>
      <h2>Total: R${calculateTotal(cartItems).toFixed(2)}</h2>
    </div>
  );
};

export default ShopCart;
