import { NextResponse } from "next/server";

const GET = () => {
  const sendData = { message: "Hello World" };
  const statusCode = 200;
  return NextResponse.json(sendData, { status: statusCode });
};

export { GET };
