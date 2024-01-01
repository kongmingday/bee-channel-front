"use client";

import { PictureIcon } from "@/components/common/icons";
import { StoreFileHost } from "@/types";
import { getAuthInfo } from "@/utils/common/tokenUtils";
import {
	Button,
	Table, TableHeader, TableColumn, TableBody, TableRow, TableCell
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import DatePicker from "tailwind-datepicker-react"
import dayjs from "dayjs";

const genderItemList = ['female', 'male', 'primary']

export default function Page() {

	const authInfo = getAuthInfo()
	const licenseState = useState<boolean>(false)


	return (
		<div className="w-full flex flex-col gap-8">
			<Table aria-label="Example static collection table" fullWidth>
				<TableHeader>
					<TableColumn align="center">Name</TableColumn>
					<TableColumn align="center">License Code</TableColumn>
					<TableColumn align="center">Status</TableColumn>
					<TableColumn align="center">Grant Date</TableColumn>
					<TableColumn align="center">Auditor</TableColumn>
					<TableColumn align="center">Action</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow key="1">
						<TableCell>{authInfo?.information?.username}</TableCell>
						<TableCell>CEO</TableCell>
						<TableCell>Active</TableCell>
						<TableCell>{new Date().toDateString()}</TableCell>
						<TableCell>Your like</TableCell>
						<TableCell>
							<Button color="primary" >Apply</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
