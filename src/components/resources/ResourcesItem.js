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
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import CreditCardIcon from "@material-ui/icons/CreditCard";

import { makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

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
  deleteResourceHandle,
  editResourceBtnHandle,
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
          <Typography variant="h3">
            £{totalAmount ? totalAmount.toFixed(2) : 0}
          </Typography>
        </Box>

        <Typography variant="body1" className={styles.updatedText}>
          {updatedAt}
        </Typography>
      </ListItemText>

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => editResourceBtnHandle(id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteResourceHandle(id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ResourcesItem;
