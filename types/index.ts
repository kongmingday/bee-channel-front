import { SVGProps } from "react";

export const StoreFileHost = "http://192.168.25.128:9000"

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export class PageParams {
  pageNo: number
  pageSize: number

  constructor(pageNo?: number, pageSize?: number) {
    this.pageNo = pageNo || 1
    this.pageSize = pageSize || 8
  }
}

export type RestResponse<T = any> = {
  msg: string,
  code: string,
  result: T
}