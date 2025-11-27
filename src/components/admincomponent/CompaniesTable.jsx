

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  if (!companies) {
    return <div className="text-center py-6">Loading...</div>;
  }

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <Table className="min-w-full">
        <TableCaption className="text-sm text-gray-600 p-2">
          Your recent registered companies
        </TableCaption>

        {/* Table Header */}
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-semibold text-gray-800">Logo</TableHead>
            <TableHead className="font-semibold text-gray-800">
              Company Name
            </TableHead>
            <TableHead className="font-semibold text-gray-800">
              Date
            </TableHead>
            <TableHead className="text-right font-semibold text-gray-800">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-4 text-gray-500 text-sm"
              >
                No Companies Added
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 transition-all"
              >
                {/* Logo */}
                <TableCell className="whitespace-nowrap">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage
                      src={company.logo || "/default-logo.png"}
                      alt={`${company.name} logo`}
                    />
                  </Avatar>
                </TableCell>

                {/* Company Name */}
                <TableCell className="font-medium text-gray-700 whitespace-nowrap">
                  {company.name}
                </TableCell>

                {/* Date */}
                <TableCell className="text-gray-600 whitespace-nowrap">
                  {company.createdAt
                    ? company.createdAt.split("T")[0]
                    : "N/A"}
                </TableCell>

                {/* Action */}
                <TableCell className="text-right whitespace-nowrap">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-1 rounded hover:bg-gray-200 transition">
                        <MoreHorizontal className="w-5 h-5 text-gray-700" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="w-36 bg-white shadow-lg rounded-lg border border-gray-200 p-2"
                    >
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 text-gray-700 text-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;