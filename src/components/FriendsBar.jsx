import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  Divider,
  InputBase,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";

const StyledList = styled(List)(({ theme }) => ({
  flex: "1",
  overflowY: "scroll",
  width: "100%",
  "&::-webkit-scrollbar": {
    width: 0,
    //     bgcolor: theme.palette.primary.main,  Hide scrollbar for WebKit browsers
  },
}));

function FriendsBar() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: { xs: 100, md: 250 },
        bgcolor: theme.palette.secondary.main,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          width: { xs: 100, md: 250 },
          bgcolor: "trasparent",
        }}
      >
        <InputBase
          placeholder="Search ..."
          sx={{
            color: theme.palette.text,
            width: "75%",
            borderRadius: "30px",
            bgcolor: theme.palette.primary.main,

            paddingX: 1,
            marginTop: 2,
          }}
        />
        <Divider sx={{ marginY: 3 }} />
      </Box>

      <StyledList>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/women/91.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/women/9.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/men/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/men/19.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/men/66.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/women/94.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/women/9.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/women/9.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/women/9.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/women/9.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/women/9.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/women/9.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/women/9.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={{ width: "100%", padding: 0 }}>
          <ListItem
            sx={{
              padding:{xs:0,md:4},
              paddingLeft: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/women/9.jpg" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle1,
                color: theme.palette.text,
              }}
              secondaryTypographyProps={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.subtitle2,
                color: theme.palette.subText,
              }}
              primary=" USER NAME"
              secondary="last message"
            />
          </ListItem>
        </ListItemButton>
      </StyledList>
    </Box>
  );
}

export default FriendsBar;
