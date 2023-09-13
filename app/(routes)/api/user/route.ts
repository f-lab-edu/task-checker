import { NextRequest, NextResponse } from "next/server";

interface PostUserType {
  userName: string;
}

const GET = () => {
  const sendData = { message: "Hello World" };
  const statusCode = 200;
  return NextResponse.json(sendData, { status: statusCode });
};
const POST = async (request: NextRequest) => {
  const { userName }: PostUserType = await request.json();
  if (!userName) return NextResponse.json({ message: "이름이 입력되지 않았습니다." }, { status: 400 });

  const sendData = { userName, message: `${userName} POST Success` };
  const statusCode = 200;
  return NextResponse.json(sendData, { status: statusCode });
};
const PATCH = () => {
  const sendData = { message: "PATCH Success" };
  const statusCode = 200;
  return NextResponse.json(sendData, { status: statusCode });
};
const DELETE = () => {
  const sendData = { message: "DELETE Success" };
  const statusCode = 200;
  return NextResponse.json(sendData, { status: statusCode });
};

export { GET, POST, PATCH, DELETE };
export type { PostUserType };
