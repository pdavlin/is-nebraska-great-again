import React from "react";
import { getSubtitle } from "../utils/scheduleUtils";

export default function Subtitle({warg}) {
  return <span style={{ color: "var(--app-emphasis)" }}>{getSubtitle(warg)}</span>;
}
