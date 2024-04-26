import { AppBar, Button, Fab, Paper, Toolbar, Typography } from "@mui/material";
import { AuthGuard } from "./AuthGuard";
import UserAvatar from "./UserAvatar";
import { SendRounded, MonetizationOn } from "@mui/icons-material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
              <div>
                <h6 className="text-xs dark:text-gray-400 text-gray-600">
                  Balance
                </h6>
                <p className="text-xl">
                  0.00
                  <span className="text-sm dark:text-gray-400 text-gray-600">
                    ETH
                  </span>
                </p>
              </div>
              <Button variant="contained" endIcon={<SendRounded />}>
                Send
              </Button>
            </div>

            <UserAvatar />
          </Toolbar>
        </AppBar>
        <Toolbar />
        {children}
        <AppBar
          component="nav"
          position="fixed"
          className="sm:hidden"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar className="gap-3 p-3">
            <div>
              <h6 className="text-xs dark:text-gray-400 text-gray-600">
                Balance
              </h6>
              <p className="text-xl">
                0.00
                <span className="text-sm dark:text-gray-400 text-gray-600">
                  ETH
                </span>
              </p>
            </div>
            <Button
              variant="contained"
              endIcon={<SendRounded />}
              fullWidth
              size="large"
              className="justify-between"
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
