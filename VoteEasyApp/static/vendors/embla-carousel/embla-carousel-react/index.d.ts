import { EmblaCarouselType } from '../embla-carousel-vanilla';
import { EmblaOptionsType } from '../embla-carousel-vanilla/options';
declare type ViewportRefType = <ViewportElement extends HTMLElement>(instance: ViewportElement | null) => void;
export declare type UseEmblaCarouselType = [
    ViewportRefType,
    EmblaCarouselType | undefined
];
declare function useEmblaCarousel(options?: EmblaOptionsType): UseEmblaCarouselType;
export { useEmblaCarousel };
