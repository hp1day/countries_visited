declare module "react-simple-maps" {
  import * as React from "react";

  export interface ComposableMapProps extends React.SVGProps<SVGSVGElement> {
    projection?: string | ((...args: any[]) => any);
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
      parallels?: [number, number];
    };
    width?: number;
    height?: number;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;

  export interface ZoomableGroupProps extends React.SVGProps<SVGGElement> {
    zoom?: number;
    maxZoom?: number;
    minZoom?: number;
    center?: [number, number];
    onMoveEnd?: (position: { coordinates: [number, number]; zoom: number }) => void;
    filterZoomEvent?: (event: any) => boolean;
  }

  export const ZoomableGroup: React.FC<ZoomableGroupProps>;

  export interface GeographiesProps {
    geography?: string | Record<string, any> | string[];
    children: (data: { geographies: any[] }) => React.ReactNode;
  }

  export const Geographies: React.FC<GeographiesProps>;

  export interface GeographyProps extends Omit<React.SVGProps<SVGPathElement>, "style"> {
    geography: any;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
  }

  export const Geography: React.FC<GeographyProps>;

  export interface MarkerProps extends React.SVGProps<SVGGElement> {
    coordinates?: [number, number];
  }

  export const Marker: React.FC<MarkerProps>;
}
