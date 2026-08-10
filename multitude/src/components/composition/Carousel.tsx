import * as React from "react";

import {
  UiCarousel,
  UiCarouselContent,
  UiCarouselItem,
  UiCarouselNext,
  UiCarouselPrevious,
  useUiCarousel,
  type CarouselApi,
} from "@/components/ux/Carousel";

function Carousel({
  className,
  ...props
}: React.ComponentProps<typeof UiCarousel>) {
  return <UiCarousel className={className} {...props} />;
}

function CarouselContent({
  className,
  ...props
}: React.ComponentProps<typeof UiCarouselContent>) {
  return <UiCarouselContent className={className} {...props} />;
}

function CarouselItem({
  className,
  ...props
}: React.ComponentProps<typeof UiCarouselItem>) {
  return <UiCarouselItem className={className} {...props} />;
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<typeof UiCarouselPrevious>) {
  return <UiCarouselPrevious className={className} {...props} />;
}

function CarouselNext({
  className,
  ...props
}: React.ComponentProps<typeof UiCarouselNext>) {
  return <UiCarouselNext className={className} {...props} />;
}

function useCarousel() {
  return useUiCarousel();
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
};
