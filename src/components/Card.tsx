import React from "react";
import {
  CardContent,
  Card,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";

type IProps = {
  cardTitle: string;
  cardContent: string;
  handleClick?: () => any;
  isDisabled?: boolean;
};
const Cards: React.FC<IProps> = ({
  cardTitle,
  cardContent,
  handleClick,
  isDisabled,
}) => {
  return (
    <Card>
      <CardContent sx={{ paddingBottom: "10px" }}>
        <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
          {cardTitle}
        </Typography>
        <Typography sx={{ marginTop: "10px", fontWeight: 500 }}>
          {cardContent}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          disabled={isDisabled}
          onClick={handleClick}
          size='small'
          color='primary'
        >
          Selecionar
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cards;
