import { useQuery, useMutation } from "@tanstack/react-query";

import { PostUserType } from "(routes)/api/user/route";
import queryKeys from "_api/queryKeys";
import customAxios from "_utils/axios";

export const useGetUserQuery = () =>
  useQuery({
    queryKey: [queryKeys.getUser],
    queryFn: async () => await customAxios.get("/api/user").then((res) => res.data),
  });
export const useCreateUserMutation = () =>
  useMutation({
    mutationFn: async (variables: PostUserType) =>
      await customAxios.post("/api/user", { userName: variables?.userName }).then((res) => res.data),
    onSuccess: (data) => alert(`${data.userName}님 등록되었습니다.`),
    onError: (err: { response: { data: { message: string } } }) => alert(err.response.data.message),
  });
export const useUpdateUserMutation = () =>
  useMutation({
    mutationFn: async () => await customAxios.patch("/api/user").then((res) => res.data),
    onSuccess: () => alert("수정되었습니다."),
  });
export const useDeleteUserMutation = () =>
  useMutation({
    mutationFn: async () => await customAxios.delete("/api/user").then((res) => res.data),
    onSuccess: () => alert("삭제되었습니다."),
  });
