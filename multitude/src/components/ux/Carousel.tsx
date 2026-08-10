import * as React from "react";

import {
  LightCarousel,
  LightCarouselContent,
  LightCarouselItem,
  LightCarouselNext,
  LightCarouselPrevious,
  useLightCarousel,
  type CarouselApi,
} from "@/components/light/Carousel";

function UiCarousel({
  className,
  ...props
}: React.ComponentProps<typeof LightCarousel>) {
  return <LightCarousel className={className} {...props} />;
}

function UiCarouselContent({
  className,
  ...props
}: React.ComponentProps<typeof LightCarouselContent>) {
  return <LightCarouselContent className={className} {...props} />;
}

function UiCarouselItem({
  className,
  ...props
}: React.ComponentProps<typeof LightCarouselItem>) {
  return <LightCarouselItem className={className} {...props} />;
}

function UiCarouselPrevious({
  className,
  ...props
}: React.ComponentProps<typeof LightCarouselPrevious>) {
  return <LightCarouselPrevious className={className} {...props} />;
}

function UiCarouselNext({
  className,
  ...props
}: React.ComponentProps<typeof LightCarouselNext>) {
  return <LightCarouselNext className={className} {...props} />;
}

function useUiCarousel() {
  return useLightCarousel();
}

export {
  type CarouselApi,
  UiCarousel,
  UiCarouselContent,
  UiCarouselItem,
  UiCarouselNext,
  UiCarouselPrevious,
  useUiCarousel,
};
