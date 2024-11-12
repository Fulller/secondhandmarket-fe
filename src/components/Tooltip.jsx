import { Tooltip as TooltipAntd } from "antd";

export default function Tooltip({ children, ...prop }) {
  return (
    <TooltipAntd delay={[500, 0]} {...prop}>
      {children}
    </TooltipAntd>
  );
}
