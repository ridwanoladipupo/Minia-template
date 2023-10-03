import React, { useEffect, useMemo } from "react";
import TableContainer from "../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

import { getInvoices as onGetInvoices } from "../../store/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  InvoiceId,
  Date,
  BillingName,
  Amount,
  DownloadPdf
} from "./invoicelistCol";

//redux
import { useSelector, useDispatch } from "react-redux";

const InvoiceList = () => {

  //meta title
  document.title = "Invoice List | Minia - React Admin & Dashboard Template";

  const dispatch = useDispatch();

  const { invoices } = useSelector((state) => ({
    invoices: state.invoices.invoices,
  }));

  console.log('Invoices', invoices)

  useEffect(() => {
    dispatch(onGetInvoices());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" />;
        },
      },
      {
        Header: "Invoice ID",
        accessor: "invoiceId",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return <InvoiceId {...cellProps} />;
        },
      },
      {
        Header: "Date",
        accessor: "date",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return <Date {...cellProps} />;
        },
      },
      {
        Header: "Billing Name",
        accessor: "founder",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return <BillingName {...cellProps} />;
        },
      },
      {
        Header: "Amount",
        accessor: "Amount",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return <Amount {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        disableFilters: true,
        Cell: (invoice) => {
          return (
            <div className={"badge badge-soft-" + invoice.row.original.color + " font-size-12"}>
              {invoice.row.original.status}
            </div>
          )
        },
      },
      {
        Header: "Download Pdf",
        accessor: "downloadpdf",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return <DownloadPdf {...cellProps} />;
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <UncontrolledDropdown>
            <DropdownToggle className="btn btn-link text-muted py-1 font-size-16 shadow-none" tag="a">
              <i className="bx bx-dots-horizontal-rounded"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Print</DropdownItem>
              <DropdownItem>Delete</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={invoices}
                    isGlobalFilter={true}
                    isAddInvoiceList={true}
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InvoiceList;
