import { useCallback, useEffect, useState } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";
import Cards from "./components/Card";
import plansService from "./services/api";
import { IAllPlans } from "./interfaces/Plans";
import ShopCart from "./components/ShopCart";
function App() {
  const [internetPlans, setInternetPlans] = useState<IAllPlans[]>();
  const [fixPlans, setFixPlans] = useState<IAllPlans[]>();
  const [tvPlans, setTvPlans] = useState<IAllPlans[]>();
  const [cartItems, setCartItems] = useState([] as IAllPlans[]);
  const [disabled, setDisabled] = useState(false);
  const fetchData = async () => {
    const tv = await plansService.get("tvPlans");
    setTvPlans(tv);
    const fix = await plansService.get("fixPlans");
    setFixPlans(fix);
    const internet = await plansService.get("internetPlans");
    setInternetPlans(internet);
  };
  const handleAddToCart = useCallback((clickedItem: IAllPlans) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      const isOneOfInCard = prev.find(item => item.type === clickedItem.type);
      if (isOneOfInCard) {
        alert("Você só pode selecionar um produto de cada tipo");
        return prev;
      }
      if (isItemInCart) {
        return prev;
      }
      return [...prev, { ...clickedItem }];
    });
  }, []);

  const handleRemoveFromCart = useCallback((id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.id) return ack;
          return [...ack, { ...item }];
        } else {
          return [...ack, item];
        }
      }, [] as IAllPlans[])
    );
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container style={{ backgroundColor: "#f0f0f0" }} maxWidth='md'>
      <Box sx={{ height: "100vh" }}>
        <div>
          <Typography variant='h5' color='#8510d8'>
            Internet
          </Typography>
          <Typography variant='caption'>
            Selecione um tipo de internet para continuar
          </Typography>
          <Grid container sx={{ gap: 2 }}>
            {internetPlans?.map(item => (
              <Cards
                isDisabled={cartItems.some(e => e.type === "internet")}
                handleClick={() => handleAddToCart(item)}
                key={item?.id}
                cardTitle={item?.value}
                cardContent={`R$ ${item?.price}`}
              />
            ))}
          </Grid>
        </div>
        <div>
          <Typography variant='h5' color='#8510d8'>
            Fixo
          </Typography>
          <Typography variant='caption'>
            Selecione o pacote de telefone fixo
          </Typography>
          <Grid container sx={{ gap: 2 }}>
            {fixPlans?.map(item => (
              <Cards
                isDisabled={cartItems.length === 0}
                handleClick={() => handleAddToCart(item)}
                key={item?.id}
                cardTitle={`${item?.value}`}
                cardContent={`R$ ${item?.price}`}
              />
            ))}
          </Grid>
        </div>
        <div>
          <Typography variant='h5' color='#8510d8'>
            TV
          </Typography>
          <Typography variant='caption'>
            Por último, selecione o pacote de TV
          </Typography>
          <Grid container sx={{ gap: 2 }}>
            {tvPlans?.map(item => (
              <Cards
                isDisabled={cartItems.length === 0}
                handleClick={() => handleAddToCart(item)}
                key={item?.id}
                cardTitle={`${item?.value} `}
                cardContent={`R$ ${item?.price}`}
              />
            ))}
          </Grid>
        </div>
        <ShopCart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Box>
      {/* <Drawer
        anchor='right'
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      ></Drawer> */}
    </Container>
  );
}

export default App;
