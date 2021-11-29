import { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Divider,
  LinearProgress,
} from "@material-ui/core";
import { Box } from "@material-ui/system";

import { IAllPlans } from "./interfaces/Plans";

import Cards from "./components/Card";
import ShopCart from "./components/ShopCart";

import plansService from "./services/api";

const App: React.FC = () => {
  const [internetPlans, setInternetPlans] = useState<IAllPlans[]>();
  const [fixPlans, setFixPlans] = useState<IAllPlans[]>();
  const [tvPlans, setTvPlans] = useState<IAllPlans[]>();
  const [cartItems, setCartItems] = useState([] as IAllPlans[]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const tv = await plansService.get("tvPlans");
      const fix = await plansService.get("fixPlans");
      const internet = await plansService.get("internetPlans");
      setTvPlans(tv);
      setFixPlans(fix);
      setInternetPlans(internet);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);
  const handleAddToCart = useCallback((clickedItem: IAllPlans) => {
    setCartItems(prev => {
      const isItemInCart = prev?.find(
        item => item?.value === clickedItem?.value
      );
      const isOneOfInCard = prev?.find(
        item => item?.type === clickedItem?.type
      );
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

  const handleRemoveFromCart = useCallback((value: string) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item?.value === value) {
          if (item?.value) return ack;
          return [...ack, { ...item }];
        } else {
          return [...ack, item];
        }
      }, [] as IAllPlans[])
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const checkIf = (type: string) => {
    return cartItems.some(e => e?.type === type);
  };

  if (loading) return <LinearProgress />;
  return (
    <Container
      style={{
        backgroundColor: "#f0f0f0",
        height: "100%",
        padding: 12,
      }}
      maxWidth='lg'
    >
      <Box sx={{ marginBottom: 2 }}>
        <div>
          <Typography variant='h5' color='#8510d8'>
            Internet
          </Typography>
          <Typography variant='caption' color='#8f8a8a'>
            Selecione um tipo de internet para continuar
          </Typography>
          <Grid container sx={{ gap: 2, marginBottom: 1 }}>
            {internetPlans?.map(item => (
              <Cards
                isDisabled={checkIf(item?.type)}
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
          <Typography variant='caption' color='#8f8a8a'>
            Selecione o pacote de telefone fixo
          </Typography>
          <Grid container sx={{ gap: 2, marginBottom: 1 }}>
            {fixPlans?.map(item => (
              <Cards
                isDisabled={cartItems.length === 0 || checkIf(item?.type)}
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
          <Typography variant='caption' color='#8f8a8a'>
            Por último, selecione o pacote de TV
          </Typography>
          <Grid container sx={{ gap: 2, marginBottom: 1 }}>
            {tvPlans?.map(item => (
              <Cards
                isDisabled={cartItems.length === 0 || checkIf(item?.type)}
                handleClick={() => handleAddToCart(item)}
                key={item?.id}
                cardTitle={`${item?.value} `}
                cardContent={`R$ ${item?.price}`}
              />
            ))}
          </Grid>
        </div>
      </Box>
      <Divider />
      <ShopCart
        cartItems={cartItems}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
      />
    </Container>
  );
};

export default App;
