import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";
import CreditCardIcon from "@material-ui/icons/CreditCard";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrap: {
    borderRadius: "10px",
    backgroundColor: "rgba(247, 207, 215, 0.5)",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  updatedText: {
    color: "#777",
    fontSize: "0.8rem",
    padding: "4px 0 0",
  },
}));
const ResourcesItem = ({
  id,
  name,
  totalAmount,
  updatedAt,
  viewResourcesHandle,
}) => {
  const styles = useStyles();
  return (
    <ListItem
      onClick={() => viewResourcesHandle(id, name)}
      className={styles.wrap}
    >
      <ListItemAvatar>
        <Avatar>
          <CreditCardIcon color="primary" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography variant="h6">{name}</Typography>
        <Box my={1}>
          <Typography variant="h3">£{totalAmount.toFixed(2)}</Typography>
        </Box>

        <Typography variant="body1" className={styles.updatedText}>
          {updatedAt}
        </Typography>
      </ListItemText>

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => alert(`delete ${id}`)}
        >
          {/* <DeleteIcon /> */}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ResourcesItem;
