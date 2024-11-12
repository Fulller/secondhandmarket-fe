import { message } from "antd";

export default function useMessage(apiCode = {}) {
  return {
    info: (key) => message.info(apiCode[key] || key),
    error: (key) => message.error(apiCode[key] || key),
  };
}
