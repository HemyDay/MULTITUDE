import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
  type CarouselApi,
} from "@/components/ui/carousel";

function LightCarousel({
  className,
  ...props
}: React.ComponentProps<typeof Carousel>) {
  return <Carousel className={className} {...props} />;
}

function LightCarouselContent({
  className,
  ...props
}: React.ComponentProps<typeof CarouselContent>) {
  return <CarouselContent className={className} {...props} />;
}

function LightCarouselItem({
  className,
  ...props
}: React.ComponentProps<typeof CarouselItem>) {
  return <CarouselItem className={className} {...props} />;
}

function LightCarouselPrevious({
  className,
  ...props
}: React.ComponentProps<typeof CarouselPrevious>) {
  return <CarouselPrevious className={className} {...props} />;
}

function LightCarouselNext({
  className,
  ...props
}: React.ComponentProps<typeof CarouselNext>) {
  return <CarouselNext className={className} {...props} />;
}

function useLightCarousel() {
  return useCarousel();
}

export {
  type CarouselApi,
  LightCarousel,
  LightCarouselContent,
  LightCarouselItem,
  LightCarouselNext,
  LightCarouselPrevious,
  useLightCarousel,
};
