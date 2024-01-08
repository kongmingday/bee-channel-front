import { SVGProps } from "react";

export type PageProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

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

export type SimpleParams = {
  pageSize: number
  total: number
}

export type PageParamsExt = {
  pageParams: PageParams
  total: number
}

export type RestResponse<T = any> = {
  msg: string,
  code: string,
  result: T
}
