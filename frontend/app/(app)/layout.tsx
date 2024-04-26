"use client";
import {
  AppBar,
  Button,
  Modal,
  Popover,
  SwipeableDrawer,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AuthGuard } from "./AuthGuard";
import UserAvatar from "./UserAvatar";
import { SendRounded, MonetizationOn } from "@mui/icons-material";
import { BalanceStatus } from "./transactions/BalanceStatus";
import { useState } from "react";
import SendForm from "./SendForm";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const toggleDrawer =
    (newOpen: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen(newOpen);
    };

  return (
    <AuthGuard>
      <div className="h-full">
        <AppBar component="nav">
          <Toolbar className="gap-3">
            <Typography variant="h6" component="div" className="flex-1">
              <span className="max-sm:hidden">Stablecoin</span>
              <MonetizationOn className="sm:hidden" />
            </Typography>
            <div className="flex gap-3 max-sm:hidden">
              <BalanceStatus />
              <Button
                variant="contained"
                endIcon={<SendRounded />}
                onClick={toggleDrawer(true)}
              >
                Send
              </Button>
            </div>

            <UserAvatar />
          </Toolbar>
        </AppBar>
        <Toolbar />
        {children}
        <Popover
          open={!isMobile && open}
          onClose={toggleDrawer(false)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <SendForm />
        </Popover>
        <SwipeableDrawer
          open={isMobile && open}
          onClose={toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
          anchor="bottom"
        >
          <SendForm />
        </SwipeableDrawer>
        <AppBar
          component="nav"
          position="fixed"
          className="sm:hidden"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar className="gap-3 p-3">
            <BalanceStatus />
            <Button
              variant="contained"
              endIcon={<SendRounded />}
              fullWidth
              size="large"
              className="justify-between"
              onClick={toggleDrawer(true)}
            >
              Send
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar className="sm:hidden" />
      </div>
    </AuthGuard>
  );
}
