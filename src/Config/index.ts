export interface Configuration {
  userData: { name: boolean; email: boolean; phone: boolean };
  defaultOpen: boolean;
  darkMode: boolean;
  notchMessage: { status: boolean; message: string };
  liveAgent: { status: boolean; type: number; url: string };
  token: string;
  freeTier: boolean;
  widgetLogo?: string;
  disclaimerUrl: string;
  theme?: string;
}

let config: Configuration = {
    userData: {
      name: true,
      email: true,
      phone: true,
    },
    defaultOpen: false,
    darkMode: true,
    notchMessage: {
      status: false,
      message: ``,
    },
    liveAgent: {
      status: true,
      type: 2,
      url: "",
    },
    token:"",
    freeTier: true,
    widgetLogo: "",
    disclaimerUrl: "",
    theme: "",
};

export default config;
