import type { Preview } from "@storybook/react";
import { useEffect, createElement } from "react";
import { Inter, Geist_Mono } from "next/font/google";
import { create } from "storybook/theming";

import "../src/app/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const docsTheme = create({
  base: "light",
  brandTitle: "Multitude UI",
  brandTarget: "_self",
  appBg: "#f5f7fa",
  appContentBg: "#ffffff",
  appBorderColor: "#e6e9ed",
  appBorderRadius: 8,
  textColor: "#434a54",
  textInverseColor: "#ffffff",
  barBg: "#ffffff",
  barTextColor: "#656d78",
  barSelectedColor: "#4a89dc",
  inputBg: "#ffffff",
  inputBorder: "#d9dee7",
  inputTextColor: "#434a54",
  inputBorderRadius: 6,
});

const availableThemeClasses = [
  "theme-light-blue",
  "theme-dark-blue",
  "theme-mint-green",
  "theme-light-green",
  "theme-purple",
  "theme-pink",
  "theme-orange",
];

const preview: Preview = {
  globalTypes: {
    projectTheme: {
      name: "Project theme",
      description: "Global brand theme from globals.css",
      defaultValue: "theme-dark-blue",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "theme-light-blue", title: "Light Blue" },
          { value: "theme-dark-blue", title: "Dark Blue" },
          { value: "theme-mint-green", title: "Mint Green" },
          { value: "theme-light-green", title: "Light Green" },
          { value: "theme-purple", title: "Purple" },
          { value: "theme-pink", title: "Pink" },
          { value: "theme-orange", title: "Orange" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      useEffect(() => {
        const htmlClasses = [
          inter.variable,
          geistMono.variable,
          "h-full",
          "antialiased",
        ];
        const bodyClasses = ["min-h-full", "flex", "flex-col"];
        const selectedThemeClass = String(
          context.globals.projectTheme || "theme-dark-blue",
        );

        document.documentElement.classList.add(...htmlClasses);
        document.documentElement.classList.remove(...availableThemeClasses);
        document.documentElement.classList.add(selectedThemeClass);
        document.body.classList.add(...bodyClasses);

        return () => {
          document.documentElement.classList.remove(...htmlClasses);
          document.documentElement.classList.remove(...availableThemeClasses);
          document.body.classList.remove(...bodyClasses);
        };
      }, [context.globals.projectTheme]);

      return createElement(
        "div",
        {
          className: `${inter.variable} ${geistMono.variable} min-h-full font-sans`,
        },
        createElement(Story),
      );
    },
  ],
  parameters: {
    layout: "padded",
    options: {
      panelPosition: "right",
      storySort: {
        order: ["Documentation", "Composition"],
      },
    },
    docs: {
      theme: docsTheme,
      toc: true,
    },
    controls: {
      expanded: true,
      sort: "requiredFirst",
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
