import { AppBar, Toolbar, Typography } from "@mui/material";
import { AuthGuard } from "./AuthGuard";
import UserAvatar from "./UserAvatar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="h-full">
        <AppBar component="nav">
          <Toolbar>
            <Typography variant="h6" component="div" className="flex-1">
              Stablecoin
            </Typography>
            <UserAvatar />
          </Toolbar>
        </AppBar>
        <Toolbar />
        {children}
      </div>
    </AuthGuard>
  );
}
