import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

const request = axios.create({
  baseURL: process.env.BASE_URL!,
});

export type FetchEntityArgs = {
  route: string;
  options?: AxiosRequestConfig;
} & (
  | {
      entityId?: string;
      queryParams?: never;
    }
  | {
      queryParams?: any;
      entityId?: never;
    }
);

export async function fetchEntity({
  route,
  options,
  ...args
}: FetchEntityArgs) {
  let mappedRoute = `${route}`;
  if ("entityId" in args) {
    mappedRoute += `/${args.entityId}`;
  } else if ("queryParams" in args) {
    mappedRoute += `/?${qs.stringify(args.queryParams)}`;
  }
  const response = await request.get(mappedRoute, options);
  return response.data;
}

export type AddEntityArgs = {
  route: string;
  payload: any;
  options?: AxiosRequestConfig;
};

export async function addEntity({ route, payload, options }: AddEntityArgs) {
  const response = await request.post(`${route}`, payload, options);
  return response;
}

export type UpdateEntityArgs = {
  route: string;
  entityId?: string;
  payload: any;
  options?: AxiosRequestConfig;
};

export async function updateEntity({
  route,
  entityId,
  payload,
  options,
}: UpdateEntityArgs) {
  if (entityId) return request.patch(`${route}/${entityId}`, payload, options);
  return request.patch(`${route}`, payload, options);
}

export type RemoveEntityArgs = {
  route: string;
  entityId?: string;
  options?: AxiosRequestConfig;
};

export function removeEntity({ route, entityId, options }: RemoveEntityArgs) {
  if (entityId) return request.delete(`${route}/${entityId}`, options);
  return request.delete(`${route}`, options);
}

export default request;
