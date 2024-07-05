import { Page, Layout, io } from '@interval/sdk';

export default new Page({
  name: 'Login',
  handler: async () => {
    return new Layout({
      title: 'Log in',
      children: [
        io.display.heading('Login to unlock endpoints access'),
        
      ], menuItems: [
        {
          label: "Login",
          route: "login/logIn",
        },
      ],
    });
  },
});