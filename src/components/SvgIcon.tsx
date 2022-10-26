import React from "react";

interface Props {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?: string;
  key?: number;
}

const SvgIcon: React.FC<Props> = (props) => {
  const { Icon } = props;
  return <Icon />;
};

export default SvgIcon;
