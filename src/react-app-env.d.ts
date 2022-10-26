declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      className: string;
      key: string;
    }
  >;

  const src: string;
  export default src;
}
declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.json" {
  const value: any;
  export default value;
}
