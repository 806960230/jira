import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParams } from "screens/project-list/util";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[], Error>(["project", param], () =>
    client("projects", { data: cleanObject(param || {}) }),
  );

  // const { run, ...result } = useAsync<Project[]>();
  // const fetchProjects = () =>
  //   client("projects", { data: cleanObject(param || {}) });

  // useEffect(() => {
  //   run(fetchProjects(), { retry: fetchProjects });
  // }, [param]);

  // return result;
};

export const useEditProject = (queryKey: QueryKey) => {
  // const queryKey = ['projects', useProjectsSearchParams()]
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey),
  );
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     }),
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};

export const useDeleteProject = (queryKey: QueryKey) => {
  // const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey),
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  // const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey),
  );
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "POST",
  //     }),
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};
