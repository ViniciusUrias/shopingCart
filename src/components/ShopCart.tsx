import CartItem from "./CartItem";
import { IAllPlans } from "../interfaces/Plans";
import { Button, Grid } from "@material-ui/core";

type Props = {
  cartItems: IAllPlans[];
  addToCart: (clickedItem: IAllPlans) => void;
  removeFromCart: (value: string) => void;
};

const ShopCart: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
}) => {
  const calculateTotal = (items: IAllPlans[]) =>
    items.reduce((ack, item) => ack + Number(item?.price), 0);
  return (
    <div>
      <h2>Meu carrinho</h2>
      {cartItems?.length === 0 ? <p>Seu carrinho está vazio!</p> : null}
      <Grid container sx={{ gap: 2 }}>
        {cartItems.map(item => (
          <CartItem
            key={item?.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </Grid>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#8510d8",
        }}
      >
        <h2>Total: </h2>
        <h2>R${calculateTotal(cartItems).toFixed(2)}/mês</h2>
      </div>
      <Button
        sx={{ color: "#8510d8", border: "1px solid #8510d8" }}
        variant='outlined'
        onClick={() =>
          alert(
            "Para continuar, o usuário deve contratar o projetor dessa plataforma"
          )
        }
      >
        Continuar
      </Button>
    </div>
  );
};

export default ShopCart;
