import React from "react";
import {
  CardContent,
  Card,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
type IProps = {
  cardTitle?: string;
  cardContent?: string;
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
          sx={{ color: isDisabled ? "primary" : "#8510d8" }}
          fullWidth
          disabled={isDisabled}
          onClick={handleClick}
          size='small'
          endIcon={
            <AddBoxIcon sx={{ color: isDisabled ? "primary" : "#8510d8" }} />
          }
        >
          Adicionar ao carrinho
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cards;
