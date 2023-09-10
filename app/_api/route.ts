import axios from "axios";

const getTestMessage = async () => {
  const queryKey = "/api/test";
  const response = await axios.get(queryKey);
  return response.data;
};

export { getTestMessage };
